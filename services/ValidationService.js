var validator = require('validator');

const UtilsService = require('../services/UtilsService');
module.exports=
    {

        process:function (errors,req,res,next) {

            if(!errors || Object.keys(errors).length == 0)
            {
                return next();
            }
            var error = {name:'ValidationError',details:errors};

            UtilsService.ErrorHandler(error,req,res,next);
        },
        Person:function (req,res,next) {

            var errors = {};

            var length = {min:2,max:100};
            var lengthMessage = {message:'lengthBetween',data:length}


             if(!validator.isLength(UtilsService.get('name',req.body),length))
             {
                 errors['name'] = [];
                 errors['name'].push(lengthMessage);
             }

            if(!validator.isLength(UtilsService.get('surname',req.body),length))
            {   errors['surname'] = [];
                errors['surname'].push(lengthMessage);
            }




            module.exports.process(errors,req,res,next);
        }

    }