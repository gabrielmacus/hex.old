const chai = require('chai');
const expect = chai.expect;
const FileService = require('../services/FileService');

const path = require('path');

process.env.NODE_ENV="test";
var dotenv = require('dotenv').config({path:"C:\\Users\\Gabriel\\WebstormProjects\\hex\\env\\test.env"});


describe('FTP test', function(){


    it('Uploads Image',function(done) {
        var file = {path:"/test-files/gorro.jpg"};
        FileService.ftpUpload(file,function (error,result) {


            expect(error).to.equal(undefined);
            expect(result).to.have.property('path');
            var p = result.path;
            expect(path.extname(p)).to.equal(".jpg");
            done();
        });
    });



    it('Uploads .php file',function(done) {
        var file = {path:"/test-files/invoicePDF.php"};
        FileService.ftpUpload(file,function (error,result) {

            expect(error).to.equal(undefined);
            expect(result).to.have.property('path');
            var p = result.path;
            expect(path.extname(p)).to.equal(".php");

            done();
        });
    });



});