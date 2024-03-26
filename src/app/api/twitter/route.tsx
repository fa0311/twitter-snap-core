import { TweetRenderImage } from "render/base/image";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { imageThemeList, ImageThemeNameType } from "../../key";



const themeList = Object.entries(imageThemeList).map(([k, e]) => {
  return [k, new e({ width: 650, video: false })] as const
});

const guest = new TwitterOpenApi().getGuestClient();

TweetRenderImage.window = true;

type Props = {
  tweetId: string;
  theme: ImageThemeNameType;
};

export const TwitterJSX = async ({ tweetId, theme }: Props) => {
  const client = await guest;
  const tweet = await client.getDefaultApi().getTweetResultByRestId({
    tweetId: tweetId,
  });

  const render = (themeList.find((e) => e[0] === theme) ?? themeList[0])[1];

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

