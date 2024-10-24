import { imageResponse } from "app/utils";
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

  const element = render.render({
    data: tweet.data!,
  });
  const img = await imageResponse(element, 650);
  const png = Buffer.from(await img.arrayBuffer());

  return (
    <div>
      <div
        style={{
          width: 650,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {element}
      </div>

      <img
        style={{ width: 650 }}
        src={`data:image/png;base64,${png.toString("base64")}`}
      />
    </div>
  );
};
