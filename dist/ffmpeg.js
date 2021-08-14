"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FFMPEG = void 0;
const tslib_1 = require("tslib");
const child_process_1 = tslib_1.__importDefault(require("child_process"));
const meeks_nodejs_process_terminator_1 = require("meeks.nodejs.process.terminator");
class FFMPEG {
    constructor() {
        this.commands = [];
        this.mode = "ffmpeg";
        this.output = "";
        this.errorOutput = "";
    }
    stop() {
        return meeks_nodejs_process_terminator_1.KillProcess(this.process.pid);
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
        const commandFile = this.mode;
        const command = `${commandFile} ${commandArgsString}`;
        console.log("executing command");
        console.log(command);
        this.process = child_process_1.default.spawn(command, {
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
        this.promise = new Promise((resolve, reject) => {
            this.process.on("close", (code, signal) => {
                console.log("CLOSES");
                console.log(code, signal);
                if (code === 0) {
                    resolve(void 0);
                }
                else {
                    reject(new Error(`Exited with code: ${code}
                    ${this.errorOutput}`));
                }
            });
        });
    }
    getData() {
        return JSON.parse(this.output);
    }
}
exports.FFMPEG = FFMPEG;
