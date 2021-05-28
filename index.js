const express = require('express');
const app = express();
var cors = require('cors')

app.use(express.json());

app.use(cors())

const fs = require('fs');
const path = require('path');
app.get('/getVideo', (req, res) => {
    res.sendFile('public/sampleVideo.mp4', { root: __dirname });
});


app.get('/getLargeVideo', (req, res) => {
    console.log("GET method");
    const path = `public/sampleVideo.mp4`;
    const stat = fs.statSync(path);
    const fileSize = stat.size; //Total file Size
    const range = req.headers.range;
    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1]
            ? parseInt(parts[1], 10)
            : fileSize-1;
        const chunksize = (end-start) + 1;
        const file = fs.createReadStream(path, {start, end});
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(206, head); //Partial-content
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head); //Full content
        fs.createReadStream(path).pipe(res);
    }
});

app.listen(3002, () =>{
    console.log("App Started on 3002");
})