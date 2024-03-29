var FtpClient = require('ftp');
var root = require('app-root-dir').get();
var p  =require('path');
const uuidv4 = require('uuid/v4');

module.exports=
    {
        ftpDelete:function (file,callback) {
            var c = new FtpClient();
            c.on('ready',function () {



                c.delete(file.path,function (err) {
                    c.end();
                    if(err)
                    {
                        return callback(err);
                    }

                    return callback();


                })

            });


            c.connect({
                host:process.env.FTP_HOST,
                port:process.env.FTP_PORT,
                secure:process.env.FTP_SECURE,
                user:process.env.FTP_USER,
                password:process.env.FTP_PASSWORD

            });
        },
        ftpUpload:function (file,callback) {

            var path = p.join(root,"/public/"+file.path);
            var basename =  uuidv4()+p.extname(path);


            var now = new Date();
            var datePath="/files/"+now.getFullYear()+"/"+(now.getMonth()+1)+"/"+now.getDate();
            var destPath = p.join(datePath,basename);

            var c = new FtpClient();


            c.on('ready',function () {



                c.mkdir(datePath,true,function (err) {
                    if(err)
                    {
                        return callback(err);
                    }
                    c.put(path,destPath,function (err) {
                        c.end();
                        if(err)
                        {
                            return callback(err);
                        }

                        return callback(err,{path: destPath});


                    })
                });


            });
            c.on('error',function (err) {

                return callback(err);
            })

            c.connect({
                host:process.env.FTP_HOST,
                port:process.env.FTP_PORT,
                secure:process.env.FTP_SECURE,
                user:process.env.FTP_USER,
                password:process.env.FTP_PASSWORD

            });

        }
    }