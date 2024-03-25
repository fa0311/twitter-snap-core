import { ThemeKeyType } from "app/component/twitter/settings";
import { TweetRenderImage } from "render/base/image";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { RenderColorKey } from "../../key";



const themeList = RenderColorKey.map((e) => {
  return [e.theme, new e({ width: 650, video: false })] as const
});

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

  const render = themeList.find((e) => e[0] === theme)![1];

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

