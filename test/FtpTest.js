const chai = require('chai');
const expect = chai.expect;
const FileService = require('../services/FileService');

const path = require('path');

process.env.NODE_ENV="test";
var dotenv = require('dotenv').config({path:"C:\\Users\\Puers\\WebstormProjects\\hex\\env\\test.env"});


describe('FTP test', function(){


    it('Uploads Image',function(done) {
        var file = {url:"/test-files/gorro.jpg"};
        FileService.ftpUpload(file,function (error,result) {

            expect(error).to.equal(undefined);
            expect(result).to.have.property('url');
            done();
        });
    });



    it('Uploads .php file',function(done) {
        var file = {url:"/test-files/invoicePDF.php"};
        FileService.ftpUpload(file,function (error,result) {

            expect(error).to.equal(undefined);
            expect(result).to.have.property('url');
            done();
        });
    });



});