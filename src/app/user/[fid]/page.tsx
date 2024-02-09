import neynarClient from "@/clients/neynar";
import Cast from "@/components/Cast";
import Image from "next/image";

async function getFeed(fid: string) {
  const feed = await neynarClient.fetchAllCastsCreatedByUser(Number(fid), {});

  return { feed };
}

async function getUser(fid: string) {
  const user = await neynarClient.lookupUserByFid(Number(fid));

  return { user };
}

export default async function User(ctx?: any) {
  const feed = await getFeed(ctx.params.fid);
  const userData = await getUser(ctx.params.fid);
  const user = userData.user.result.user;

  return (
    <div className="md:px-20 px-6 mb-10 flex flex-col items-start justify-start">
      {user && (
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <Image
              src={user.pfp.url}
              alt={user.displayName}
              width={50}
              height={50}
              className="rounded-full"
            />
            <div className="flex flex-col items-start justify-start">
              <h1 className="font-semibold text-white text-2xl">
                {user.displayName}
              </h1>
              <p className="text-[#646D7A]">{user.username}</p>
            </div>
          </div>
          <p>{user.profile.bio.text}</p>
          <div className="flex gap-2">
            <p className="text-[#646D7A]">{user.followerCount} followers</p>
            <p className="text-[#646D7A]">{user.followingCount} following</p>
          </div>
        </div>
      )}
      {feed && (
        <div className="flex flex-col gap-4 pt-6">
          {feed.feed.result.casts.map((cast) => {
            if (cast.text) {
              return (
                <Cast
                  key={cast.hash}
                  // @ts-ignore
                  cast={cast}
                  // @ts-ignore
                  author={user}
                />
              );
            }
          })}
        </div>
      )}
    </div>
  );
}
