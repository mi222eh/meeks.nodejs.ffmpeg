const { getMediaInfoFromFile } = require("../dist/executer");

const file = './test/GH010548.mp4';

(async () => {
   
    const ffmpeg = getMediaInfoFromFile(file);
    await ffmpeg.promise.catch((reson) => console.error(reson));
    
    console.log(ffmpeg.getData());
})()