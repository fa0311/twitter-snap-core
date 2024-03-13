import { ImageResponse } from "@vercel/og";
import { promises as fs } from "fs";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { RenderBasic } from "../src";

(async () => {
    const client = await new TwitterOpenApi().getGuestClient();
    const api = client.getDefaultApi();
    const tweet = await api.getTweetResultByRestId({
        tweetId: "1722118869178081318",
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
    });

    const png = Buffer.from(await img.arrayBuffer());
    await fs.writeFile("temp/1722118869178081318.png", png);

    const res = await render.videoRender({
        data: tweet.data!,
        image: "temp/1722118869178081318.png",
        output: "temp/1722118869178081318.mp4",
    });

    const removed = res.temp.map((e) => fs.unlink(e));
    await Promise.all(removed);
})();