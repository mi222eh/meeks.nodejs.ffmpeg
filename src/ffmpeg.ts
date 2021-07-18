import Process from "child_process";

import { ChildProcess } from "node:child_process";
import terminate from "terminate";
import node_process from "process";
import is_windows from "is-windows";
import processTerminator from "meeks.nodejs.process.terminator";

export class FFMPEG {
    private commands: string[] = [];
    process: ChildProcess;
    promise: Promise<void>;
    constructor() {}
    stop() {
        return processTerminator.KillProcess(this.process.pid);
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
        const commandFile = "ffmpeg";
        const command = `${commandFile} ${commandArgsString}`;
        console.log("executing command");
        console.log(command);
        this.process = Process.spawn(command, {
            shell: true,
        });
        this.process.stderr.on("data", (data) => {
            console.error(data.toString());
        });

        this.promise = new Promise((resolve, reject) => {
            this.process.on("close", (code, signal) => {
                console.log("CLOSES");
                console.log(code, signal);
                if (code === 0) {
                    resolve();
                } else {
                    reject(code);
                }
            });
        });
    }
}
