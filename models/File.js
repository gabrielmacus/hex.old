const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    filename: {type:String, required:true},
    contentType : {type:String,required:true},
    size:{type:Number,required:true},
    path:{type:String,required:true},
    gallery:{type:Schema.Types.ObjectId,ref:'Gallery'}


}, {
    timestamps: true
});
schema.post('validate', function(doc) {



    
});

module.exports= mongoose.model('File',schema);