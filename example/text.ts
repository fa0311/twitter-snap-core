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


(async () => {
    const client = await new TwitterOpenApi().getGuestClient();
    const api = client.getDefaultApi();
    const tweet = await api.getTweetResultByRestId({
        tweetId: "1757846601660575906",
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
        fonts: [
            {
                data: Buffer.from(await fs.readFile("fonts/SEGOEUIB.TTF")),
                name: "segoeui",
                weight: 700,
            },
            {
                data: Buffer.from(await fs.readFile("fonts/SEGOEUI.TTF")),
                name: "segoeui",
                weight: 500,
            },
            {
                data: Buffer.from(await fs.readFile("fonts/SEGOEUII.TTF")),
                name: "segoeui",
                weight: 500,
                style: "italic",
            },
        ]
    });

    const png = Buffer.from(await img.arrayBuffer());
    await fs.writeFile("temp/1757846601660575906.png", png);
})();


(async () => {
    const client = await new TwitterOpenApi().getGuestClient();
    const api = client.getDefaultApi();
    const tweet = await api.getTweetResultByRestId({
        tweetId: "1756047573679550659",
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
        fonts: [
            {
                data: Buffer.from(await fs.readFile("fonts/SEGOEUIB.TTF")),
                name: "segoeui",
                weight: 700,
            },
            {
                data: Buffer.from(await fs.readFile("fonts/SEGOEUI.TTF")),
                name: "segoeui",
                weight: 500,
            },
            {
                data: Buffer.from(await fs.readFile("fonts/SEGOEUII.TTF")),
                name: "segoeui",
                weight: 500,
                style: "italic",
            },
        ]
    });

    const png = Buffer.from(await img.arrayBuffer());
    await fs.writeFile("temp/1756047573679550659.png", png);
})();