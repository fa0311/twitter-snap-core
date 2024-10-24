import fs from "fs/promises";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { imageResponse } from "../src/app/utils";
import { RenderOceanBlueColor } from "../src/render/color/color";

const tweetIdList = [
  "1518623997054918657",
  "1757846601660575906",
  "1756047573679550659",
  "1720181935685992797",
  "1720694816835801584",
  "1349129669258448897",
  "1849059996312690720",
  "1770752661299610028",
  "1790169073122419164",
  "1847979858388988217",
  "1770053822255431954",
];

(async () => {
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

    const img = await imageResponse(element);
    const png = Buffer.from(await img.arrayBuffer());
    await fs.writeFile(`temp/${tweetId}.png`, png);
  });
  await Promise.all(res);
})();
