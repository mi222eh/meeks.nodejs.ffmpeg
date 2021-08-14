"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMediaInfoFromFile = exports.createCombineProcess = exports.createConvertProcess = void 0;
const ffmpeg_1 = require("./ffmpeg");
function createConvertProcess(src, output) {
    const ffmpeg = new ffmpeg_1.FFMPEG();
    ffmpeg.addCommand(["-i", src, output]).execute();
    return ffmpeg;
}
exports.createConvertProcess = createConvertProcess;
function createCombineProcess(srcList, output) {
    const ffmpeg = new ffmpeg_1.FFMPEG();
    for (const src of srcList) {
        ffmpeg.addCommand(["-i", src]);
    }
    ffmpeg.addCommand(output);
    ffmpeg.execute();
    return ffmpeg;
}
exports.createCombineProcess = createCombineProcess;
function getMediaInfoFromFile(path) {
    const ffmpeg = new ffmpeg_1.FFMPEG();
    ffmpeg.addCommand([
        "-v",
        "quiet",
        "-print_format",
        "json",
        "-show_format",
        "-show_streams",
        path,
    ]);
    ffmpeg.mode = "ffprobe";
    ffmpeg.execute();
    return ffmpeg;
}
exports.getMediaInfoFromFile = getMediaInfoFromFile;
