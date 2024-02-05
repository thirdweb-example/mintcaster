"use client";

import useLocalStorage from "@/hooks/use-local-storage-state";
import { UserInfo } from "@/types";
import { verifyUser } from "@/utils/helpers";
import { User } from "@neynar/nodejs-sdk/build/neynar-api/v1";
import { ErrorRes } from "@neynar/nodejs-sdk/build/neynar-api/v2";
import axios, { AxiosError } from "axios";
import {
  FC,
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

type SetState<T> = React.Dispatch<React.SetStateAction<T>>;

interface Props {
  children: ReactNode;
}

interface AppContextInterface {
  userData: User | null;
  setUserData: SetState<User | null>;
  signerUuid: string | null;
  setSignerUuid: SetState<string | null>;
  fid: string | null;
  setFid: SetState<string | null>;
}

const AppContext = createContext<AppContextInterface | null>(null);

export const AppProvider: FC<Props> = ({ children }) => {
  const [signerUuid, setSignerUuid] = useState<string | null>(null);
  const [userData, setUserData] = useState<User | null>(null);
  const [fid, setFid] = useState<string | null>(null);
  const [user, setUser, removeUser] = useLocalStorage<UserInfo | null>(
    "user",
    null
  );

  const lookupUser = useCallback(async () => {
    if (user && user.fid) {
      try {
        const { data } = await axios.get<{ user: User }>(
          `/api/user/${user.fid}`
        );
        setUserData(data.user);
        setFid(user.fid);
      } catch (err) {
        const axiosError = err as AxiosError<ErrorRes>;
        toast(axiosError.response?.data.message || "An error occurred", {
          type: "error",
          theme: "dark",
          autoClose: 3000,
          position: "bottom-right",
          pauseOnHover: true,
        });
      }
    }
  }, [user]);

  useEffect(() => {
    lookupUser();
  }, [lookupUser]);

  const isUserLoggedIn = useCallback(async () => {
    if (signerUuid && fid) {
      const verifiedUser = await verifyUser(signerUuid, fid);
      if (verifiedUser) {
        setUser({ signerUuid, fid });
      } else {
        removeUser();
      }
    }
  }, [user, signerUuid, fid, setUser, removeUser]);

  useEffect(() => {
    isUserLoggedIn();
  }, [isUserLoggedIn]);

  const value: AppContextInterface | null = useMemo(
    () => ({
      userData,
      setUserData,
      signerUuid,
      setSignerUuid,
      fid,
      setFid,
    }),
    [userData, setUserData, signerUuid, fid]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = (): AppContextInterface => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("AppContext must be used within AppProvider");
  }
  return context;
};
