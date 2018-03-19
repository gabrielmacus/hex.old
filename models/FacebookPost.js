
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var publishOption = new Schema({

    days:[{type:String,enum:['monday','tuesday','wednesday','thursday','friday','saturday','sunday']}],
    frequency:{type:String}


});


var schema = new Schema({
    title: {type:String},
    description:{type:String},
    price:{type:String},
    publish_each:[publishOption],
    type:{type:String,enum:['sale'],required:true,default:'sale'},
    createdBy:{type:Schema.Types.ObjectId,ref:'User',required:true}

}, {
    timestamps: true
});

module.exports= mongoose.model('Person',schema);