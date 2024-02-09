"use client";

import useLocalStorage from "@/hooks/use-local-storage-state";
import { UserInfo } from "@/types";
import {
  Cast,
  CastWithInteractions,
} from "@neynar/nodejs-sdk/build/neynar-api/v2";
import Image from "next/image";
import Link from "next/link";
import { ReactElement, useState } from "react";
import { DeleteCastButton } from "./DeleteCastButton";
import { MintCastButton } from "./MintCastButton";

export default function Cast({
  cast,
  author,
}: {
  cast: CastWithInteractions | undefined;
  author?: Cast["author"];
}): ReactElement {
  const [hovering, setHovering] = useState(true);
  const [user] = useLocalStorage<UserInfo>("user");

  // @ts-ignore
  const pfp = cast?.author.pfp_url || author?.pfp.url;

  return (
    <div
      className="border-[#272B30] border-[1px] rounded-md p-6 hover:shadow-lg transition-all duration-200 hover:border-blue-400 relative h-fit pb-20"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div className="flex items-center">
        <Link
          href={`/user/${cast?.author.fid}`}
          className="flex gap-2 items-center"
        >
          {pfp && (
            <Image
              src={pfp}
              alt={
                cast?.author.display_name ||
                author?.display_name ||
                cast?.author.username ||
                ""
              }
              width={36}
              height={36}
              className="rounded-full"
            />
          )}
          <p className="font-semibold text-white text-lg">
            {cast?.author.display_name ||
              cast?.author.username ||
              author?.display_name ||
              author?.username}
          </p>
        </Link>

        {String(author?.fid) === String(user?.fid) && (
          <DeleteCastButton hash={cast?.hash!} author={author?.fid!} />
        )}
      </div>
      <p className="text-[#646D7A] mt-8">{String(cast?.text)}</p>
      <div
        className={`flex gap-4 justify-end absolute bottom-6 right-6 ml-auto mt-auto ${
          hovering ? "" : "md:hidden"
        }`}
      >
        <MintCastButton hash={cast?.hash!} />
      </div>
    </div>
  );
}
