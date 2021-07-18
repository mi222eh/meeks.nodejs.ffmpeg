"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFMPEG = void 0;
const tslib_1 = require("tslib");
const child_process_1 = tslib_1.__importDefault(require("child_process"));
const meeks_nodejs_process_terminator_1 = tslib_1.__importDefault(require("meeks.nodejs.process.terminator"));
class FFMPEG {
    constructor() {
        this.commands = [];
    }
    stop() {
        return meeks_nodejs_process_terminator_1.default.KillProcess(this.process.pid);
    }
    addCommand(command) {
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
        this.process = child_process_1.default.spawn(command, {
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
                }
                else {
                    reject(code);
                }
            });
        });
    }
}
exports.FFMPEG = FFMPEG;
