const NodeMediaServer = require('node-media-server');
const path = require('path');

const config = {
    rtmp: {
        port: 1935,
        chunk_size: 60000,
        gop_cache: true,
        ping: 60,
        ping_timeout: 30
    },
    http: {
        port: 8000,
        //mediaroot:path.join(require('app-root-dir').get(),"media"),
        allow_origin: '*'
    },
    trans: {
        ffmpeg: path.join(require('app-root-dir').get(),"ffmpeg/bin/ffmpeg.exe"),
        tasks: [
            {
                app: 'live',
                ac: 'aac',
                hls: true,
                hlsFlags: '[hls_time=2:hls_list_size=3:hls_flags=delete_segments]',
                dash: true,
                dashFlags: '[f=dash:window_size=3:extra_window_size=5]'
            }
        ]
    }
};
//supergirl.e01.s03.mp4
var nms = new NodeMediaServer(config);

nms.run();