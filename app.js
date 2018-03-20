
require('app-root-dir').set(__dirname);

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var lessMiddleware = require('less-middleware');
console.log(process.env.NODE_ENV);
var dotenv = require('dotenv').config({path:path.join(__dirname,"env/"+process.env.NODE_ENV+".env")});
var passport = require('passport');
var i18n = require("i18n");


//Routes
var index = require('./routes/index');
var rest = require('./routes/rest');
var auth = require('./routes/auth');
var development = require('./routes/development');
var media = require('./routes/media');

var app = express();


i18n.configure({
    locales:['es'],
    defaultLocale: 'es',
    directory: __dirname + '/locales'
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());


app.use('/media',media);
app.use('/', index);
app.use('/api', rest);
app.use('/auth',auth);
app.use('/development',development);




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//Cron jobs

var cron = require('node-cron');
var FacebookPost = require('./models/FacebookPost');
var FacebookPostService = require('./services/FacebookPostService');
cron.schedule('* * * * * *', function(){

    var now = new Date();
    var idsToUpdate = [];
    FacebookPost.find({}).exec(function (err,posts) {

        if(err)
        {
            console.error(err);
        }


        posts.forEach(function (p) {

            if(FacebookPostService.checkTime(p,now))
            {
                idsToUpdate.push(p._id);

                console.log("Executing "+p._id)
            }

        });

        if(idsToUpdate.length > 0)
        {
            FacebookPost.update({_id:{'$in':idsToUpdate}},{'$set':{'last_publish':now}}).exec(function (err,r) {

                if(err)
                {
                    console.error(err);
                }
                console.log(r);
            });

        }
    });

});


module.exports = app;
