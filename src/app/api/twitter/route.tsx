import { RenderBasicImage } from "render/basic/image";
import { TwitterOpenApi } from "twitter-openapi-typescript";

import { ThemeKeyType } from "app/component/twitter/settings";
import { TweetRenderImage } from "render";

const themeList: Record<ThemeKeyType, TweetRenderImage> = {
  "video-false": new RenderBasicImage({ width: 600, video: false }),
  "video-true": new RenderBasicImage({ width: 600, video: true }),
};

const guest = new TwitterOpenApi().getGuestClient();

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
        width: "600px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <render.render data={tweet.data} />
    </div>
  )
}

