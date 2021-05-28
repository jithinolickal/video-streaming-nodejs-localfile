# video-streaming-nodejs-localfile
This app will send video from backend to frontend and can be played without buffering. Video is saved as a local file.

## Setup
1.Install dependencies : `npm install`
2.Paste a `.mp4` video to `public` folder, rename it as `sampleVideo`
2.Run server : `node index.js`
3.Open `index.html` file
---
Frontend hits an api endpoint `/getLargeVideo`
> `/getVideo` is for tiny video files - less code

