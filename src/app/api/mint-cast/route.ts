import neynarClient from "@/clients/neynar";
import getSvg from "@/utils/_svg";
import { Engine } from "@thirdweb-dev/engine";
import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const { TW_ENGINE_URL, TW_ACCESS_TOKEN, TW_BACKEND_WALLET } = process.env;

  try {
    if (!TW_ENGINE_URL || !TW_ACCESS_TOKEN || !TW_BACKEND_WALLET) {
      throw new Error("Missing environment variables");
    }

    const thirdwebSDK = new ThirdwebSDK("mumbai", {
      secretKey: process.env.TW_SECRET_KEY,
    });

    const { hash, address } = body;

    if (!hash || !address) {
      throw new Error("Missing hash or address");
    }

    const {
      result: { cast },
    } = await neynarClient.lookUpCastByHash(hash);

    const svg = getSvg(String(cast.text), String(cast.author.fid));

    const ipfs = await thirdwebSDK.storage.upload(svg);

    const engine = new Engine({
      url: TW_ENGINE_URL,
      accessToken: TW_ACCESS_TOKEN,
    });

    const { result } = await engine.erc1155.mintTo(
      "mumbai",
      process.env.NFT_CONTRACT_ADDRESS!,
      process.env.TW_BACKEND_WALLET!,
      {
        receiver: address,
        metadataWithSupply: {
          metadata: {
            name: "MintCast",
            description: "MintCast",
            image: ipfs,
            external_url: `https://mintcast.vercel.app/cast/${hash}`,
            // @ts-ignore
            attributes: [
              {
                trait_type: "Type",
                value: "MintCast",
              },
              {
                trait_type: "Author",
                value: cast.author.fid,
              },
              {
                trait_type: "Hash",
                value: hash,
              },
            ],
          },
          supply: "1",
        },
      }
    );

    return NextResponse.json(
      { message: "Minted successfully", result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
