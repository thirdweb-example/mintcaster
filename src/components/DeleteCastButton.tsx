"use client";

import useLocalStorage from "@/hooks/use-local-storage-state";
import { UserInfo } from "@/types";
import { useRouter } from "next/navigation";
import { useState, type FC } from "react";
import { toast } from "react-toastify";

interface Props {
  hash: string;
  author: number | string;
}

export const DeleteCastButton: FC<Props> = ({ hash, author }) => {
  const [user] = useLocalStorage<UserInfo>("user");
  const router = useRouter();

  const deleteCast = async () => {
    try {
      const req = await fetch("/api/casts", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          signerUid: user.signerUuid,
          hash: String(hash),
        }),
      });

      const res = await req.json();

      if (req.ok) {
        toast("Cast deleted successfully!", {
          type: "success",
          autoClose: 5000,
          position: "bottom-right",
        });

        router.push(`/profile/${user.fid}`);
      } else {
        toast("Error deleting cast", {
          type: "error",
          autoClose: 5000,
          position: "bottom-right",
        });
      }
    } catch (e) {
      console.error(e);
      toast("Error deleting cast", {
        type: "error",
        autoClose: 5000,
        position: "bottom-right",
      });
    }
  };

  if (!user) return null;

  return (
    <>
      {Number(user.fid) === Number(author) && (
        <button
          onClick={deleteCast}
          style={{
            backgroundColor: "red",
            color: "white",
            marginTop: "1rem",
          }}
        >
          Delete a cast
        </button>
      )}
    </>
  );
};
