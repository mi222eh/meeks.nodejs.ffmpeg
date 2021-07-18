/// <reference types="node" />
import { ChildProcess } from "node:child_process";
export declare class FFMPEG {
    private commands;
    process: ChildProcess;
    promise: Promise<void>;
    constructor();
    stop(): Promise<void>;
    addCommand(command: string[] | string): this;
    execute(): void;
}
