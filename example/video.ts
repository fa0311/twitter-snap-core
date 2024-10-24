import { promises as fs } from "fs";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { getFont, imageResponse } from "../src/app/utils";
import { RenderOceanBlueColor } from "../src/render/color/color";

const tweetIdList = [
  "1722118869178081318",
  "1770496837046415364",
  "1684781634049163264",
  "1700878617528713271",
];

const res = tweetIdList.map(async (tweetId) => {
  const { segoeui400i, segoeui400, segoeui700i, segoeui700 } = await getFont();

  const client = await new TwitterOpenApi().getGuestClient();
  const api = client.getDefaultApi();
  const tweet = await api.getTweetResultByRestId({
    tweetId: tweetId,
  });
  const render = new RenderOceanBlueColor({
    width: 1200,
    scale: 2,
    video: true,
  });
  const element = render.imageRender({
    data: tweet.data!,
  });
  const img = await imageResponse(element);

  const png = Buffer.from(await img.arrayBuffer());
  await fs.writeFile(`temp/temp-${tweetId}.png`, png);

  const res = await render.videoRender!({
    data: tweet.data!,
    image: `temp/temp-${tweetId}.png`,
    output: `temp/${tweetId}.mp4`,
  });

  const removed = res.temp.map((e) => fs.unlink(e));
  await Promise.all(removed);
});

(async () => {
  await Promise.all(res);
})();
