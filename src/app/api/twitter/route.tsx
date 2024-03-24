import { TwitterOpenApi } from "twitter-openapi-typescript";

import { ThemeKeyType } from "app/component/twitter/settings";
import { TweetRenderImage } from "render/base/image";
import {
  RenderBrightSpaceColorImage,
  RenderDarkTwilightSkyColorImage,
  RenderDarkVoidColorImage,
  RenderDawnBlossomColorImage,
  RenderFierySunsetColorImage,
  RenderOceanBlueColorImage,
  RenderSunsetGardenColorImage,
  RenderTwilightMoonColorImage,
  RenderTwilightSkyColorImage,
} from "render/color/image";
import { RenderMakeItAQuoteImage } from "render/makeItAQuote/image";

const themeList: Record<ThemeKeyType, TweetRenderImage> = {
  "ocean-blue": new RenderOceanBlueColorImage({ width: 650, video: false }),
  "sunset-garden": new RenderSunsetGardenColorImage({ width: 650, video: false }),
  "dawn-blossom": new RenderDawnBlossomColorImage({ width: 650, video: false }),
  "fiery-sunset": new RenderFierySunsetColorImage({ width: 650, video: false }),
  "twilight-sky": new RenderTwilightSkyColorImage({ width: 650, video: false }),
  "dark-void": new RenderDarkVoidColorImage({ width: 650, video: false }),
  "bright-space": new RenderBrightSpaceColorImage({ width: 650, video: false }),
  "dark-twilight-sky": new RenderDarkTwilightSkyColorImage({ width: 650, video: false }),
  "dark-twilight-moon": new RenderTwilightMoonColorImage({ width: 650, video: false }),
  "video-true": new RenderOceanBlueColorImage({ width: 650, video: true }),
  "make-it-a-quote": new RenderMakeItAQuoteImage({ width: 650 }),
};

const guest = new TwitterOpenApi().getGuestClient();

TweetRenderImage.window = true;

type Props = {
  tweetId: string;
  theme: ThemeKeyType;
};

export const TwitterJSX = async ({ tweetId, theme }: Props) => {
  const client = await guest;
  const tweet = await client.getDefaultApi().getTweetResultByRestId({
    tweetId: tweetId,
  });

  const render = themeList[theme];

  if (tweet.data === undefined) {
    return <div>tweet.data is undefined</div>;
  }
  return (
    <div
      style={{
        width: "650px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <render.render data={tweet.data} />
    </div>
  )
}

