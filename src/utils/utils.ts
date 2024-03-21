import { MediaExtended } from "twitter-openapi-typescript-generated";

export const getBiggerMedia = (extMedia: MediaExtended[]) => {
  const video = extMedia.filter((e) => e.type !== "photo");
  const sorted = [...video].sort(
    (a, b) =>
      b.videoInfo!.aspectRatio[1] / b.videoInfo!.aspectRatio[0] -
      a.videoInfo!.aspectRatio[1] / a.videoInfo!.aspectRatio[0]
  );
  if (sorted.length === 0) {
    return [undefined, undefined] as const;
  }
  return [video.indexOf(sorted[0]), sorted[0]] as const;
};


export const getResizedMediaByWidth = (
  aspectRatioWidth: number,
  aspectRatioHeight: number,
  width: number,
) => {
  const height = Math.floor(width * aspectRatioHeight / aspectRatioWidth);
  if (height % 2) {
    return { width, height: height - 1 };
  } else {
    return { width, height };
  }
};


