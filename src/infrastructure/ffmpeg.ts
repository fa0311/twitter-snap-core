import { default as ffmpeg, default as ffprobe } from "fluent-ffmpeg";
export type GetFFmpegType = () => ffmpeg.FfmpegCommand;
export type DumpFFmpegType = (command: ffmpeg.FfmpegCommand) => void;
export type RunFFmpegType = (command: ffmpeg.FfmpegCommand) => Promise<unknown>;
export type RunFFprobeType = (command: ffprobe.FfmpegCommand) => Promise<ffmpeg.FfprobeData>;


export class FFmpegInfrastructure {
    getFFmpeg: GetFFmpegType = () => {
        return ffmpeg();
    }
    getFFprobe: GetFFmpegType = () => {
        return ffprobe();
    }

    dumpFFmpeg: DumpFFmpegType = (command) => {
        const c = `ffmpeg ${command._getArguments().map((e) => `"${e}"`).join(" ")}`
        console.log(c);
    };

    runMpeg: RunFFmpegType = (command) => {
        this.dumpFFmpeg(command);
        return new Promise((resolve, reject) => {
            command.on("end", resolve);
            command.on("error", reject);
            command.run();
        });
    };

    runProbe: RunFFprobeType = (command) => {
        this.dumpFFmpeg(command);
        return new Promise((resolve, reject) => {
            command.ffprobe((err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });
    };
}
