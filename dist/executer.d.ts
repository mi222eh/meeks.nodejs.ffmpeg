import { FFMPEG } from "./ffmpeg";
import { MediaFile } from "./types/Mediafile";
export declare function createConvertProcess(src: string, output: string): FFMPEG<void>;
export declare function createCombineProcess(srcList: string[], output: string): FFMPEG<void>;
export declare function getMediaInfoFromFile(path: string): FFMPEG<MediaFile>;
