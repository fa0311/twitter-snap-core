import { ImageResponse } from "@vercel/og";
import fs from "fs/promises";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { RenderBasic } from "../src";


(async () => {
    const client = await new TwitterOpenApi().getGuestClient();
    const api = client.getDefaultApi();
    const tweet = await api.getTweetResultByRestId({
        tweetId: "1518623997054918657",
    });
    const render = new RenderBasic({
        width: 600,
    });
    const element = render.imageRender({
        data: tweet.data!,
    });
    const img = new ImageResponse(element, {
        width: 600,
        height: undefined,
    });

    const png = Buffer.from(await img.arrayBuffer());
    await fs.writeFile("temp/1518623997054918657.png", png);
})();