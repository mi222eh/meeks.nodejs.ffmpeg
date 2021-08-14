import Process from "child_process";

import { ChildProcess } from "node:child_process";
import { FFMPEG } from "./ffmpeg";
import { MediaFile } from "./types/Mediafile";

export function createConvertProcess(src: string, output: string) {
    const ffmpeg = new FFMPEG();
    ffmpeg.addCommand(["-i", src, output]).execute();
    return ffmpeg;
}

export function createCombineProcess(srcList: string[], output: string) {
    const ffmpeg = new FFMPEG();
    for (const src of srcList) {
        ffmpeg.addCommand(["-i", src]);
    }
    ffmpeg.addCommand(output);
    ffmpeg.execute();
    return ffmpeg;
}

export function getMediaInfoFromFile(path: string) {
    const ffmpeg = new FFMPEG<MediaFile>();

    ffmpeg.addCommand([
        "-hide_banner",
        "-loglevel",
        "fatal",
        "-show_error",
        "-show_format",
        "-show_streams",
        "-show_programs",
        "-show_chapters",
        "-show_private_data",
        "-print_format",
        "json",
        path,
    ]);
    ffmpeg.mode = "ffprobe";

    ffmpeg.execute();
    return ffmpeg;
}
