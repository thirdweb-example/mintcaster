"use client";

import { useApp } from "@/Context/AppContext";
import useLocalStorage from "@/hooks/use-local-storage-state";
import type { FC } from "react";
import { useCallback, useEffect } from "react";

const SignIn: FC = () => {
  const [_, setUser] = useLocalStorage("user");
  const { setSignerUuid, setFid } = useApp();
  const client_id = process.env.NEXT_PUBLIC_NEYNAR_CLIENT_ID;

  useEffect(() => {
    let script = document.getElementById(
      "siwn-script"
    ) as HTMLScriptElement | null;

    if (!script) {
      script = document.createElement("script");
      script.id = "siwn-script";
      document.body.appendChild(script);
    }

    script.src = "https://neynarxyz.github.io/siwn/raw/1.2.0/index.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      // if (document.body && script) {
      //   document.body.removeChild(script);
      // }

      let button = document.getElementById("siwn-button");
      if (button && button.parentElement) {
        button.parentElement.removeChild(button);
      }
    };
  }, []);

  if (!client_id) {
    throw new Error("NEXT_PUBLIC_NEYNAR_CLIENT_ID is not defined in .env");
  }

  useEffect(() => {
    window.onSignInSuccess = (data) => {
      setUser({
        signerUuid: data.signer_uuid,
        fid: data.fid,
      });
      setSignerUuid(data.signer_uuid);
      setFid(data.fid);
    };

    return () => {
      delete window.onSignInSuccess;
    };
  }, []);

  const getButton = useCallback(() => {
    return (
      <div
        className="neynar_signin mt-6"
        data-client_id={client_id}
        data-success-callback="onSignInSuccess"
      />
    );
  }, []);

  return <>{getButton()}</>;
};
export default SignIn;
