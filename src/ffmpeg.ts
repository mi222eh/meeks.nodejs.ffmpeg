import Process from "child_process";

import { ChildProcess } from "node:child_process";
import terminate from "terminate";
import node_process from "process";
import is_windows from "is-windows";
import { KillProcess } from "meeks.nodejs.process.terminator";
import { MediaFile } from "./types/Mediafile";

export class FFMPEG<T = void> {
    private commands: string[] = [];
    mode: "ffmpeg" | "ffprobe" = "ffmpeg";
    output = "";
    errorOutput = "";
    process: ChildProcess;
    promise: Promise<void>;
    constructor() {}
    stop() {
        return KillProcess(this.process.pid);
    }
    addCommand(command: string[] | string) {
        if (typeof command === "string") {
            command = [command];
        }
        command.forEach((x) => this.commands.push(x));
        return this;
    }
    execute() {
        const commandArgsString = [...this.commands].join(" ");
        const commandFile = this.mode;
        const command = `${commandFile} ${commandArgsString}`;
        console.log("executing command");
        console.log(command);
        this.process = Process.spawn(command, {
            shell: true,
        });
        this.process.stdout.on("data", (chunk) => {
            this.output += chunk.toString();
        });
        this.process.stderr.on("data", (data) => {
            this.errorOutput += data.toString();
            console.error(data.toString());
        });

        this.process.on("error", (error) => {
            this.errorOutput = error.message;
        });
        this.promise = new Promise<void>((resolve, reject) => {
            this.process.on("close", (code, signal) => {
                console.log("CLOSES");
                console.log(code, signal);
                if (code === 0) {
                    resolve(void 0);
                } else {
                    reject(
                        new Error(
                            `Exited with code: ${code}
                    ${this.errorOutput}`
                        )
                    );
                }
            });
        });
    }
    getData() {
        return JSON.parse(this.output) as T;
    }
}
