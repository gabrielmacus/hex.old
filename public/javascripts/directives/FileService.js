var FtpClient = require('ftp');
var root = require('app-root-dir').get();
var p  =require('path');
module.exports=
    {
        ftpUpload:function (file,callback) {

            var path = p.join(root,+"/public/"+file.url);
            var basename = p.basename(path);

            var c = new FtpClient();


            c.on('ready',function () {

                c.put(path,basename,function (err) {

                    if(err)
                    {
                    return callback(err);
                    }
                    c.end();
                    return callback();


                })

            });

            c.connect({
                host:process.env.FTP_HOST,
                port:process.env.FTP_PORT,
                secure:process.env.FTP_SECURE,
                user:proces.env.FTP_USER,
                password:process.env.FTP_PASSWORD

            });

        }
    }