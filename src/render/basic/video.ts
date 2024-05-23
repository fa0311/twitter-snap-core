import { FFmpegInfrastructure } from "../../infrastructure/ffmpeg";
import {
  TweetRenderVideo,
  TweetVideoRenderType,
} from "../../render/base/video";
import { getBiggerMedia, getResizedMediaByWidth } from "../../utils/utils";

export type RenderBasicVideoParam = {
  ffmpeg?: FFmpegInfrastructure;
  width: number;
  video?: boolean;
  ffmpegAdditonalOption?: string[];
};

export class RenderBasicVideo extends TweetRenderVideo {
  width: NonNullable<RenderBasicVideoParam["width"]>;
  video: NonNullable<RenderBasicVideoParam["video"]>;
  margin: number = 30;
  padding: number = 12;
  bottomPadding: number = 31;
  ffmpegAdditonalOption: NonNullable<
    RenderBasicVideoParam["ffmpegAdditonalOption"]
  >;

  constructor(props: RenderBasicVideoParam) {
    super(props.ffmpeg);
    this.width = props.width;
    this.video = props.video ?? false;
    this.ffmpegAdditonalOption = props.ffmpegAdditonalOption ?? [];
  }

  render: TweetVideoRenderType = async ({ data, image, output }) => {
    const removeList: string[] = [];

    const o = (() => {
      const dir = output.substring(0, output.lastIndexOf("/")) || ".";
      const name = output.substring(
        output.lastIndexOf("/") + 1,
        output.lastIndexOf(".")
      );
      const ext = output.substring(output.lastIndexOf(".") + 1);
      return { dir, name, ext };
    })();

    const extEntities = data.tweet.legacy!.extendedEntities;
    const extMedia = extEntities?.media ?? [];
    const v = extMedia.filter((e) => e.type !== "photo");
    const video = v.map((e) => {
      return [...e.videoInfo!.variants].sort((a, b) => {
        if (a.bitrate === undefined) return 1;
        if (b.bitrate === undefined) return -1;
        return b.bitrate - a.bitrate;
      })[0];
    });
    const screenName = data.user.legacy!.screenName;
    const id = data.tweet.legacy!.idStr;
    const title = `https://twitter.com/${screenName}/status/${id}`;

    const [index, blank] = getBiggerMedia(extMedia);
    const { width, height } = getResizedMediaByWidth(
      blank!.videoInfo!.aspectRatio[0],
      blank!.videoInfo!.aspectRatio[1],
      this.width - (this.margin + this.padding) * 2
    );

    const res = video.map(async ({ url }, i) => {
      const temp = `${o.dir}/temp-${o.name}-${i}.${o.ext}`;
      const tempAudio = `${o.dir}/temp-audio-${o.name}-${i}.aac`;
      const tempOutput = `${o.dir}/temp-output-${o.name}-${i}.${o.ext}`;

      const command = this.ffmpeg.getFFmpeg();
      command.input(url);
      command.output(temp);
      await this.ffmpeg.runMpeg(command);

      removeList.push(temp);

      const probe = this.ffmpeg.getFFprobe();
      probe.input(temp);

      const data = await this.ffmpeg.runProbe(probe);
      const duration = data.format.duration!;
      const video = data.streams.find((e) => e.codec_type === "video");
      const audio = data.streams.find((e) => e.codec_type === "audio");

      if (!audio) {
        const command = this.ffmpeg.getFFmpeg();
        command.input("anullsrc=channel_layout=mono:sample_rate=44100");
        command.inputFormat("lavfi");
        command.addOption("-t", duration.toString());
        command.output(tempAudio);
        await this.ffmpeg.runMpeg(command);

        const command2 = this.ffmpeg.getFFmpeg();
        command2.input(temp);
        command2.input(tempAudio);
        command2.output(tempOutput);
        await this.ffmpeg.runMpeg(command2);

        removeList.push(tempAudio);
        removeList.push(tempOutput);

        return tempOutput;
      } else if (!video) {
        throw new Error("video not found");
      } else {
        return temp;
      }
    });

    const tempVideo = await Promise.all(res);

    const all = (e: string) => {
      return `${video.map((_, i) => `[${e}${i}]`).join("")}`;
    };

    const overlayWidth = this.margin + this.padding;
    const overlayHeight = `H-${
      height + this.margin + this.padding + this.bottomPadding
    }`;

    const command = this.ffmpeg.getFFmpeg();
    command.input(image);
    tempVideo.forEach((input) => command.input(input));
    
    const normalize = `scale=trunc(ih*dar/2)*2:trunc(ih/2)*2,setsar=1/1`
    const pad = `scale=w=${width}:h=${height}:force_original_aspect_ratio=1,pad=w=${width}:h=${height}:x=(ow-iw)/2:y=(oh-ih)/2:color=white`
    command.complexFilter(
      [
        `[0]scale=trunc(iw/2)*2:trunc(ih/2)*2[i]`,
        video.map((_, i) => `[${i + 1}]anull[a${i}]`),
        video.map((_, i) => `[${i + 1}]${pad},${normalize}[v${i}]`),
        `${all("v")}concat=n=${video.length}:v=1:a=0[video]`,
        `${all("a")}concat=n=${video.length}:v=0:a=1[audio]`,
        `[i][video]overlay=${overlayWidth}:${overlayHeight}[marge]`,
      ].flat()
    );
    command.map("[marge]");
    command.map("[audio]");
    const comment =
      "Snapped by twitter-snap-core https://github.com/fa0311/twitter-snap-core";

    command.addOption("-metadata", `title=${title}`);
    command.addOption("-metadata", `comment=${comment}`);

    for (const option of this.ffmpegAdditonalOption) {
      command.addOption(option);
    }

    command.output(output);
    await this.ffmpeg.runMpeg(command);

    return { temp: removeList };
  };
}
