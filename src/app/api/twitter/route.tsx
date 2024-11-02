import { imageResponse } from "app/utils";
import { TwitterOpenApi } from "twitter-openapi-typescript";
import { TweetRenderImage } from "../../../render/base/image";
import { imageThemeList, ImageThemeNameType } from "../../key";

import { promises as fs } from "node:fs";

const themeList = Object.entries(imageThemeList).map(([k, e]) => {
  const cls = new e({
    width: 650,
    scale: 1,
    video: false,
  });
  return [k, cls] as const;
});

type Cookie = {
  domain: string;
  name: string;
  value: string;
};

export const twitterSnapCookies = async (path: string) => {
  const twitterDomains = ["twitter.com", "x.com"] as const;
  const allowDomains = twitterDomains.map((e) => `.${e}`);

  const data = await fs.readFile(path, "utf8");
  const twitter = new TwitterOpenApi();

  const cookies = await (async () => {
    const parsed = JSON.parse(data);
    if (Array.isArray(parsed)) {
      const cookies = parsed as Cookie[];
      return Object.fromEntries(
        cookies
          .filter((e) => allowDomains.includes(e.domain))
          .map((e) => [e.name, e.value])
      );
    }
    if (typeof parsed === "object") {
      return parsed as { [key: string]: string };
    }
    throw new Error("Invalid cookies");
  })();
  return cookies;
};

const getTweet = async () => {
  if (await fs.stat("cookies.json").catch(() => false)) {
    const cookies = await twitterSnapCookies("cookies.json");
    const twitter = new TwitterOpenApi();
    const api = (await twitter.getClientFromCookies(cookies)).getTweetApi();
    return async (e: string) => {
      return (await api.getTweetDetail({ focalTweetId: e })).data.data[0];
    };
  } else {
    const twitter = new TwitterOpenApi();
    const client = await twitter.getGuestClient();
    const api = client.getDefaultApi();
    return async (e: string) => {
      return (await api.getTweetResultByRestId({ tweetId: e })).data;
    };
  }
};

TweetRenderImage.window = true;

type Props = {
  tweetId: string;
  theme: ImageThemeNameType;
  img: boolean;
};

export const TwitterJSX = async ({ tweetId, theme, img }: Props) => {
  const tweet = await (await getTweet())(tweetId);

  const render = (themeList.find((e) => e[0] === theme) ?? themeList[0])[1];

  if (tweet === undefined) {
    return <div>tweet.data is undefined</div>;
  }

  const element = render.render({
    data: tweet,
  });

  const og = (async () => {
    if (img) {
      const img = await imageResponse(element, 650);
      const png = Buffer.from(await img.arrayBuffer());
      return (
        <img
          style={{ width: 650 }}
          src={`data:image/png;base64,${png.toString("base64")}`}
        />
      );
    }
  })();

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
      {og}
    </div>
  );
};
