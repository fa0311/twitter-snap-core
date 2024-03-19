import { ImageResponse } from "@vercel/og";
import fs from "fs/promises";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { RenderBasic } from "../src";


const tweetIdList = ["1518623997054918657", "1757846601660575906", "1756047573679550659"];


const res = tweetIdList.map(async (tweetId) => {
    const client = await new TwitterOpenApi().getGuestClient();

    const api = client.getDefaultApi();
    const tweet = await api.getTweetResultByRestId({
        tweetId: tweetId,
    });
    const render = new RenderBasic({
        width: 600,
    });
    const element = render.imageRender({
        data: tweet.data!,
    });


    const segoeui300 = Buffer.from(await fs.readFile("fonts/SEGOEUIL.TTF"));
    const segoeui400 = Buffer.from(await fs.readFile("fonts/SEGOEUISL.TTF"));
    const segoeui500 = Buffer.from(await fs.readFile("fonts/SEGOEUI.TTF"));
    const segoeui600 = Buffer.from(await fs.readFile("fonts/SEGUISB.TTF"));
    const segoeui700 = Buffer.from(await fs.readFile("fonts/SEGOEUIB.TTF"));
    const segoeui800 = Buffer.from(await fs.readFile("fonts/SEGUIBL.TTF"));

    const segoeui300i = Buffer.from(await fs.readFile("fonts/SEGUILI.TTF"));
    const segoeui400i = Buffer.from(await fs.readFile("fonts/SEGUISLI.TTF"));
    const segoeui500i = Buffer.from(await fs.readFile("fonts/SEGOEUII.TTF"));
    const segoeui600i = Buffer.from(await fs.readFile("fonts/SEGUISBI.TTF"));
    const segoeui700i = Buffer.from(await fs.readFile("fonts/SEGOEUIZ.TTF"));
    const segoeui800i = Buffer.from(await fs.readFile("fonts/SEGUIBLI.TTF"));



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
});

(async () => {
    await Promise.all(res);
})();