import { default as ffmpeg, default as ffprobe } from "fluent-ffmpeg";
export type GetFFmpegType = () => ffmpeg.FfmpegCommand;
export type DumpCommandType = (
  prefix: string,
  command: ffmpeg.FfmpegCommand
) => void;
export type RunFFmpegType = (command: ffmpeg.FfmpegCommand) => Promise<unknown>;
export type RunFFprobeType = (
  command: ffprobe.FfmpegCommand
) => Promise<ffmpeg.FfprobeData>;

export class FFmpegInfrastructure {
  ffmpegPath: string;
  ffprobePath: string;

  static ffmpegDefaultPath = "ffmpeg";
  static ffprobeDefaultPath = "ffprobe";

  constructor(args?: { ffmpegPath?: string; ffprobePath?: string }) {
    this.ffmpegPath =
      args?.ffmpegPath ?? FFmpegInfrastructure.ffmpegDefaultPath;
    this.ffprobePath =
      args?.ffprobePath ?? FFmpegInfrastructure.ffprobeDefaultPath;
  }

  bypass(command: ffmpeg.FfmpegCommand) {
    const bk = command.availableFormats;
    command.availableFormats = (cb: (err: any, data: any) => void) => {
      bk.bind(command)((err, data) => {
        const lavfi = {
          canDemux: true,
          canMux: true,
          description: "Lavfi",
        };
        cb(err, { ...data, lavfi });
      });
    };
  }

  getFFmpeg: GetFFmpegType = () => {
    return ffmpeg().setFfmpegPath(this.ffmpegPath);
  };
  getFFprobe: GetFFmpegType = () => {
    return ffprobe().setFfprobePath(this.ffprobePath);
  };

  dumpCommand: DumpCommandType = (prefix, command) => {
    const suffix = command
      ._getArguments()
      .map((e) => `"${e}"`)
      .join(" ");
    const c = `${prefix} ${suffix}`;
    console.log(c);
  };

  runMpeg: RunFFmpegType = (command) => {
    this.bypass(command);
    this.dumpCommand("ffmpeg", command);
    return new Promise((resolve, reject) => {
      command.on("end", resolve);
      command.on("error", reject);
      command.run();
    });
  };

  runProbe: RunFFprobeType = (command) => {
    this.bypass(command);
    this.dumpCommand("ffprobe", command);
    return new Promise((resolve, reject) => {
      command.ffprobe((err, data) => {
        if (err) reject(err);
        resolve(data);
      });
    });
  };
}
