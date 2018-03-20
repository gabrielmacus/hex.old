var formidable = require('formidable');
var mv = require('mv');
var root = require('app-root-dir').get();
var path = require('path');
var async = require('async');
module.exports=
    {
        upload:function (req,res,next ) {
            var form = new formidable.IncomingForm();

            form.parse(req,function (err,fields,files) {

                if(err)
                {
                    //TODO: handle errors
                    console.error(err);
                }


                var uploadedFiles  = [];
                async.each(files, function(file, callback) {

                    var basename =path.basename(file.path);
                    var extension = path.extname(file.name);
                    mv(file.path,path.join(root,'/public/.tmp/'+basename+extension), function(err) {

                        uploadedFiles.push({url:'/.tmp/'+basename+extension,size:file.size,contentType:file.type,filename:file.name});
                        callback(err);

                    });

                },function (err) {

                    if(err)
                    {
                        //TODO: handle errors
                        console.error(err);
                    }


                    res.json(uploadedFiles);
                });





            })

        }
    }