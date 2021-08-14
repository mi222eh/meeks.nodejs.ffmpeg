/// <reference types="node" />
import { ChildProcess } from "node:child_process";
export declare class FFMPEG<T = void> {
    private commands;
    mode: "ffmpeg" | "ffprobe";
    output: string;
    process: ChildProcess;
    promise: Promise<void>;
    constructor();
    stop(): Promise<void>;
    addCommand(command: string[] | string): this;
    execute(): void;
    getData(): T;
}
