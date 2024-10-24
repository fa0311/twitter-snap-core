import { ImageResponse } from "@vercel/og";
import { promises as fs } from "fs";

type ResType = {
  segoeui300: ArrayBuffer;
  segoeui400: ArrayBuffer;
  segoeui500: ArrayBuffer;
  segoeui600: ArrayBuffer;
  segoeui700: ArrayBuffer;
  segoeui800: ArrayBuffer;
  segoeui300i: ArrayBuffer;
  segoeui400i: ArrayBuffer;
  segoeui500i: ArrayBuffer;
  segoeui600i: ArrayBuffer;
  segoeui700i: ArrayBuffer;
  segoeui800i: ArrayBuffer;
  meiryo500: ArrayBuffer;
  meiryo700: ArrayBuffer;
  meiryo500i: ArrayBuffer;
  meiryo700i: ArrayBuffer;
};

export const imageResponse = async (
  element: React.ReactElement,
  width: number = 1200
) => {
  const {
    segoeui400i,
    segoeui400,
    segoeui700i,
    segoeui700,
    meiryo500,
    meiryo700,
    meiryo500i,
    meiryo700i,
  } = await getFont();
  return new ImageResponse(element, {
    width: width,
    height: undefined,
    headers: {
      "accept-encoding": "identity",
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36",
    },
    fonts: [
      {
        data: segoeui400i,
        name: "Segoe UI",
        weight: 500,
        style: "italic",
      },
      {
        data: segoeui400,
        name: "Segoe UI",
        weight: 500,
        style: "normal",
      },
      {
        data: segoeui700i,
        name: "Segoe UI",
        weight: 700,
        style: "italic",
      },
      {
        data: segoeui700,
        name: "Segoe UI",
        weight: 700,
        style: "normal",
      },
      {
        data: meiryo500,
        name: "Meiryo",
        weight: 500,
        style: "normal",
      },
      {
        data: meiryo700,
        name: "Meiryo",
        weight: 700,
        style: "normal",
      },
      {
        data: meiryo500i,
        name: "Meiryo",
        weight: 500,
        style: "italic",
      },
      {
        data: meiryo700i,
        name: "Meiryo",
        weight: 700,
        style: "italic",
      },
    ],
  });
};

export const getFont = async (): Promise<ResType> => {
  const base =
    "https://github.com/fa0311/twitter-snap-core/releases/download/assets-fonts/";

  const list = [
    ["SEGOEUIL.TTF", "segoeui", 300, "normal"],
    ["SEGOEUISL.TTF", "segoeui", 400, "normal"],
    ["SEGOEUI.TTF", "segoeui", 500, "normal"],
    ["SEGUISB.TTF", "segoeui", 600, "normal"],
    ["SEGOEUIB.TTF", "segoeui", 700, "normal"],
    ["SEGUIBL.TTF", "segoeui", 800, "normal"],
    ["SEGUILI.TTF", "segoeui", 300, "italic"],
    ["SEGUISLI.TTF", "segoeui", 400, "italic"],
    ["SEGOEUII.TTF", "segoeui", 500, "italic"],
    ["SEGUISBI.TTF", "segoeui", 600, "italic"],
    ["SEGOEUIZ.TTF", "segoeui", 700, "italic"],
    ["SEGUIBLI.TTF", "segoeui", 800, "italic"],
    ["Meiryo.ttf", "meiryo", 500, "normal"],
    ["Meiryo-Bold.ttf", "meiryo", 700, "normal"],
    ["Meiryo-Italic.ttf", "meiryo", 500, "italic"],
    ["Meiryo-BoldItalic.ttf", "meiryo", 700, "italic"],
  ];

  const fonts = list.map(async ([file, name, weight, style]) => {
    const suffix = style === "normal" ? "" : "i";
    const path = `fonts/${file}`;
    try {
      const buffer = await fs.readFile(path);
      return [`${name}${weight}${suffix}`, buffer] as const;
    } catch (e) {
      const url = `${base}${file}`;
      const res = await fetch(url);
      const buffer = await res.arrayBuffer();
      await fs.writeFile(path, new Uint8Array(buffer));
      return [`${name}${weight}${suffix}`, buffer] as const;
    }
  });
  return Object.fromEntries(await Promise.all(fonts)) as ResType;
};
