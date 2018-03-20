var chai = require('chai');
var expect = chai.expect;
var FacebookPostService = require('../services/FacebookPostService')
describe('FacebookPosttest', function() {

    var date = new Date(2018,2,19,22,53,0);

    var post = {frecuency:[{time: {
                    number:2,
                    unit:"m"
                }, days:[1,2]}]};
    it('Mondays and tuesdays every 2 minutes at date '+date.toString()+", publish not previously executed", function(done) {
        //expect(FacebookPostService.checkTime(post,date)).to.equal(true);
        console.log(FacebookPostService.checkTime(post,date));
        done();

    });


    var last_publish = new Date(2018, 2, 19, 20, 0, 0);
    date = new Date(2018, 2, 19, 22, 0, 0);
    post = {
        last_publish: last_publish,
        frecuency: [{
            time: {
                number: 2,
                unit: "m"
            },
            days: [1, 2, 6]
        }]
    };
    it('Mondays,tuesdays and saturdays, every 2 hours at date ' + date.toString() + ", publish previously executed at " + last_publish.toString(), function (done) {

        expect(FacebookPostService.checkTime(post, date)).to.equal(true);
        done();

    });




});