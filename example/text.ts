import { ImageResponse } from "@vercel/og";
import fs from "fs/promises";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { RenderOceanBlueColor } from "../src/render/color/color";
import { getFont } from "./utils";

const tweetIdList = [
  "1518623997054918657",
  "1757846601660575906",
  "1756047573679550659",
  "1720181935685992797",
  "1720694816835801584",
  "1349129669258448897",
  "1770752661299610028",
  "1770053822255431954",
];

(async () => {
  const { segoeui400i, segoeui400, segoeui700i, segoeui700 } = await getFont();

  const res = tweetIdList.map(async (tweetId) => {
    const client = await new TwitterOpenApi().getGuestClient();

    const api = client.getDefaultApi();
    const tweet = await api.getTweetResultByRestId({
      tweetId: tweetId,
    });
    const render = new RenderOceanBlueColor({
      width: 1200,
      scale: 2,
    });
    const element = render.imageRender({
      data: tweet.data!,
    });

    const img = new ImageResponse(element, {
      width: 1200,
      height: undefined,
      fonts: [
        {
          data: segoeui400i,
          name: "segoeui",
          weight: 500,
          style: "italic",
        },
        {
          data: segoeui400,
          name: "segoeui",
          weight: 500,
          style: "normal",
        },
        {
          data: segoeui700i,
          name: "segoeui",
          weight: 700,
          style: "italic",
        },
        {
          data: segoeui700,
          name: "segoeui",
          weight: 700,
          style: "normal",
        },
      ],
    });
    const png = Buffer.from(await img.arrayBuffer());
    await fs.writeFile(`temp/${tweetId}.png`, png);
  });
  await Promise.all(res);
})();
