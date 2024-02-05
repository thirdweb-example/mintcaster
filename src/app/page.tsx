import neynarClient from "@/clients/neynar";
import { FeedType, FilterType } from "@neynar/nodejs-sdk";
import { Casts } from "@/components/Casts";

export const revalidate = 3600;

export default async function Home() {
  const feed = await getFeed();

  return <div>{feed && <Casts feed={feed.feed.casts} />}</div>;
}

async function getFeed() {
  const feed = await neynarClient.fetchFeed(FeedType.Filter, {
    filterType: FilterType.GlobalTrending,
    withReplies: false,
  });

  return { feed };
}
