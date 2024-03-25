import { ImageResponse } from "@vercel/og";
import fs from "fs/promises";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { RenderColorBase } from "../src/render/color/color";
import { getFont } from "./utils";


const matrix = (() => {
    return [
        ['linear-gradient(-45deg, #1180f3 0%, #2ca7f3 50%, #58ffe4 100%)'] as const,
        ['linear-gradient(135deg, #ffced6 0%, #ffdeba 50%, #b5f4b5 100%)'] as const,
        ['linear-gradient(45deg, #ffd5dc 0%, #aa55aa 100%)'] as const,
        ['linear-gradient(90deg, #ff5555 0%, #ffc355 100%)'] as const,
        ['linear-gradient(-45deg, #1180f3 0%, #cb8bec 100%)'] as const,
    ];
})().flatMap((c) => {
    return [
        [...c, 'none'] as const,
        [...c, 'dark'] as const,
        [...c, 'light'] as const,
    ];
}).flatMap((c) => {
    return [
        [...c, false] as const,
        [...c, true] as const,
    ];
});



const tweetId = "1772311389857571157";


(async () => {

    const { segoeui400i, segoeui400, segoeui700i, segoeui700 } = await getFont();

    const res = matrix.map(async (matrix, i) => {
        const client = await new TwitterOpenApi().getGuestClient();

        const api = client.getDefaultApi();
        const tweet = await api.getTweetResultByRestId({
            tweetId: tweetId,
        });
        const render = new RenderColorBase({
            width: 600,
            gradient: matrix[0],
            shadow: matrix[1],
            dark: matrix[2],
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
        await fs.mkdir("temp/theme", { recursive: true });
        await fs.writeFile(`temp/theme/${i}-${tweetId}.png`, png);
    });
    await Promise.all(res);
})();