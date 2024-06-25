import { TwitterOpenApi } from "twitter-openapi-typescript";
import { TweetRenderImage } from "../../../render/base/image";
import { imageThemeList, ImageThemeNameType } from "../../key";

const themeList = Object.entries(imageThemeList).map(([k, e]) => {
  const cls = new e({
    width: 650,
    scale: 1,
    video: false,
  });
  return [k, cls] as const;
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
        width: 650,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <render.render data={tweet.data} />
    </div>
  );
};
