import { ImageResponse } from "@vercel/og";
import { promises as fs } from "fs";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { RenderBasic } from "../src";
import { getFont } from "./utils";


const tweetIdList = [
    "1722118869178081318",
    "1770496837046415364",
];

const res = tweetIdList.map(async (tweetId) => {

    const { segoeui400i, segoeui400, segoeui700i, segoeui700 } = await getFont();


    const client = await new TwitterOpenApi().getGuestClient();
    const api = client.getDefaultApi();
    const tweet = await api.getTweetResultByRestId({
        tweetId: tweetId,
    });
    const render = new RenderBasic({
        width: 600,
        video: true,
    });
    const element = render.imageRender({
        data: tweet.data!,
    });
    const img = new ImageResponse(element, {
        width: 600,
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
        ]
    });

    const png = Buffer.from(await img.arrayBuffer());
    await fs.writeFile(`temp/${tweetId}.png`, png);

    const res = await render.videoRender({
        data: tweet.data!,
        image: `temp/${tweetId}.png`,
        output: `temp/${tweetId}.mp4`,
    });

    const removed = res.temp.map((e) => fs.unlink(e));
    await Promise.all(removed);
});


(async () => {
    await Promise.all(res);
})();