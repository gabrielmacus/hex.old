app.service('filetype', function() {
    this.get = function (mime) {
        switch (true)
        {
            case (mime.indexOf("image/")>-1):
                return 'image';

                break;

            case (mime.indexOf("video/")>-1):
                return 'video';
                break;

            case (mime.indexOf('audio/') > -1):

                return 'audio';

                break;
            default:
                return 'binary';
                break;
        }
    }
});