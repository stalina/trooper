//include our modules
var http  = require('http');
var url   = require('url');
var querystring = require('querystring');

console.log('***************************************');
console.log('Starting server @ http://'+process.env.TROOPER_HOST+':'+process.env.TROOPER_PORT+'/');

http.createServer(function (req, res) {
    //wrap calls in a try catch
    //or the node js server will crash upon any code errors
    try {
        console.log('++++++++++++++++++++++++++++++++++++');
        //pipe some details to the node console
        console.log('Incoming Request from: ' + req.connection.remoteAddress + ' for href: ' + url.parse(req.url).href );

        var parts = req.url.split('/');
        if (req.url === "/") {
            showImage(res);
        } else if (req.url === "/die") {
            killTrooper(res);
        } else {
            notFound(res)
        }
    } catch (err) {
        serverError(err, res);
    } finally {
        console.log('++++++++++++++++++++++++++++++++++++');
    }
}).listen(9000, function() {

    //runs when our server is created
    console.log('Server running at http://'+process.env.TROOPER_HOST+':'+process.env.TROOPER_PORT+'/');
    console.log('***************************************');

    launchTrooper();
});

function serverError(err, res){
    console.log(err);
    //handle errors gracefully
    res.writeHead(500);
    res.end('Internal Server Error');
    console.log("Out Going response : 500 - Internal Server Error");
}

function notFound(res){
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end("Not found");
    console.log("Out Going response : 404 - Not found");
}


function killTrooper(res){
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end("I am dead", 'utf-8');
    console.log("Out Going response : 200 - I am dead");
    process.exit(0);
}

function showImage(res){
    res.writeHead(302, {
        'Location': process.env.SHIP_IMG
    });
    res.end();
    console.log("sending : "+ process.env.SHIP_IMG);
}

function launchTrooper(){

    console.log('----------------------------------------');
    console.log('Launching trooper');

    var postData = querystring.stringify({
        'trooperHost' : process.env.TROOPER_HOST,
        'trooperPort' : process.env.TROOPER_PORT,
        'name' : process.env.TROOPER_NAME,
        'image' : process.env.SHIP_IMG
    });

    var options = {
        hostname: process.env.PLANET_HOST,
        port: process.env.PLANET_PORT,
        path: '/trooper/launch',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(postData)
        }
    };

    console.log("Out Going request : ");
    console.log(" To : "+ JSON.stringify(options));
    console.log(" Data : " +JSON.stringify(postData));
    var req = http.request(options, (res) => {
            console.log(`STATUS: ${res.statusCode}`);
            console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
            res.setEncoding('utf8');
            // Continuously update stream with data
            var body = '';
            res.on('data', (chunk) => {
                console.log(`BODY: ${chunk}`);
                body += chunk;
            });
            res.on('end', () => {
                console.log('No more data in response.');
                console.log("Incomming response : from "+process.env.PLANET_URL+"/launch : "+body);
                console.log('----------------------------------------');
            });
        });

        req.on('error', (e) => {
                console.log(`problem with request: ${e.message}`);
        });

    // write data to request body
    req.write(postData);
    req.end();
}