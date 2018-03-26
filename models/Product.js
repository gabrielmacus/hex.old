const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const File =require('./File');
var schema = new Schema({
    title: {type:String, required:true},
    images: [ {image:{type:Schema.Types.ObjectId,ref:'File'},text:String}],
    createdBy:{type:Schema.Types.ObjectId,ref:'User',required:true}
}, {
    timestamps: true
});

var autoPopulate= function(next) {
    this.populate('images.image');
    next();
};
schema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate);


    module.exports= db.model('Product',schema);