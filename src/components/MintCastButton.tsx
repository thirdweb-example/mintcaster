"use client";

import { useApp } from "@/Context/AppContext";
import { useState, type FC } from "react";
import { toast } from "react-toastify";
import SignIn from "./SignIn";
import { Button } from "./ui/button";

interface MintCastButtonProps {
  hash: string;
}

export const MintCastButton: FC<MintCastButtonProps> = ({ hash }) => {
  const { userData } = useApp();
  const [loading, setLoading] = useState(false);

  const mintCast = async () => {
    setLoading(true);
    try {
      const req = await fetch("/api/mint-cast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: userData?.verifications[0],
          hash,
        }),
      });

      if (req.ok) {
        toast("Cast minted successfully!", {
          type: "success",
          autoClose: 5000,
          position: "bottom-right",
        });
      }

      if (!req.ok) {
        toast("Error minting cast", {
          type: "error",
          autoClose: 5000,
          position: "bottom-right",
        });
      }
    } catch (err) {
      toast("Error minting cast", {
        type: "error",
        autoClose: 5000,
        position: "bottom-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {userData ? (
        <Button onClick={mintCast} disabled={loading} variant="outline">
          {loading ? "loading" : "Mint Cast"}
        </Button>
      ) : (
        <SignIn />
      )}
    </>
  );
};
