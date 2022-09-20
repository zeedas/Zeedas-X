require('dotenv').config();
let http = require('http'),
    express = require('express');

const app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));

app.get('/', function (req, res) {
    res.sendFile('invite.html', {
        root: __dirname + '/views'
    });
});

// catch 404 and forward to error handler
app.use((req, res) => {
    res.status(404);

    if (req.accepts('html')) {
        return res.render('404', {
            url: req.url
        });
    }

    if (req.accepts('json')) {
        return res.send({
            error: 'Not found'
        });
    }

    res.type('txt').send('Not found');
});

module.exports = app;

let server = http.createServer(app);
server.listen(process.env.port || process.env.PORT || 4000, function () {
    console.log('server running on %s', process.env.PORT);
});