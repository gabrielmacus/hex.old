
var phantomjs = require('phantomjs');

module.exports=
    {
        checkTime:function (post,time) {
            time = (time)?time:new Date();
            var frecuencias = post.frecuency.filter(function (t) {
                //minutes or hours

                var isInDay  =  t.days.indexOf(time.getDay()) > -1;

                if(post.last_publish)
                {
                    var eachTime = (t.time.unit == 'h')?t.time.number * 60 * 60  * 1000:t.time.number * 60 * 1000;
                    var isInTime =  (post.last_publish && (time.getTime() - post.last_publish.getTime())>=eachTime);

                    return (isInDay && isInTime);
                }
                else
                {
                    return isInDay;
                }

            });

            return (frecuencias && frecuencias.length > 0);

        },
        phantomPost:function (post) {
            
        }
    }