import useLocalStorage from "@/hooks/use-local-storage-state";
import { UserInfo } from "@/types";
import { useEffect, type FC, useState } from "react";
import Cast from "./Cast";
import { CastSkeleton } from "./CastSkeleton";
import { CastWithInteractions } from "@neynar/nodejs-sdk/build/neynar-api/v2";

export const MyCasts: FC = () => {
  const [user] = useLocalStorage<UserInfo>("user");
  const [casts, setCasts] = useState<CastWithInteractions[]>();

  useEffect(() => {
    if (!user?.fid) return;

    const fetchMyCasts = async () => {
      const req = await fetch(`/api/casts?fid=${user?.fid}`);
      const data = await req.json();
      setCasts(data.casts);
    };

    fetchMyCasts();
  }, [user?.fid]);

  return (
    <div className="flex flex-col gap-4 pt-6">
      {casts ? (
        <>
          {casts.map((cast) => {
            if (cast.text) {
              return (
                <Cast key={cast.thread_hash} cast={cast} author={cast.author} />
              );
            }
          })}
        </>
      ) : (
        <>
          {Array.from({ length: 6 }).map((_, i) => (
            <CastSkeleton />
          ))}
        </>
      )}
    </div>
  );
};
