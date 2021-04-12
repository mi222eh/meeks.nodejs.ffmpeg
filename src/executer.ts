import Process from 'child_process'

import { ChildProcess } from "node:child_process";
import { FFMPEG } from './ffmpeg';

export function createConvertProcess(src:string, output:string){
    const ffmpeg = new FFMPEG();
    ffmpeg.addCommand(['-i', src, output]).execute()
    return ffmpeg;
}


export function createCombineProcess(srcList:string[], output:string){
    const ffmpeg = new FFMPEG();
    for (const src of srcList) {
        ffmpeg.addCommand(['-i', src])
    }
    ffmpeg.addCommand(output);
    ffmpeg.execute()
    return ffmpeg;
}
