const executer = require('../dist/executer.js');
const process = require('process');
const processTerminator = require('meeks.nodejs.process.terminator');

(async () => {
    const destFile = './testFiles/combined.mp4';
    const ffmpegprocess = executer.createCombineProcess(['./testFiles/249.webm', './testFiles/299.mp4'], destFile);
    
    setTimeout(() => {
        processTerminator.KillProcess(ffmpegprocess.process.pid).then(() => {
            console.log('Killed? ');
        });
    }, 5000)
})()