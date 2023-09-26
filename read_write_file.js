const http = require('http');
const fs = require('fs');
//assign data read from file here
var ndata;

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        //writing data from file in body
        res.write(`<body>${ndata}</body>`);
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>');
        res.write('</html>');
        return res.end();
    }
    // if address is /message and method is post
    if (url === '/message' && method === 'POST') {
        //creating array named body
        const body = [];
        //to get  request data as chunk and push it to array named body
        req.on('data', (chunk) => {
            // console.log(chunk);
            body.push(chunk);
        });
        return req.on('end', () => {
            //converting entered data to string
            const parsedBody = Buffer.concat(body).toString();
            //To store entered data to message
            const message = parsedBody.split('=')[1];
            //To write entered data to message.txt file
            fs.writeFileSync('message.txt', message);

            res.statusCode = 302;
            res.setHeader('Location', '/');
            //reading data from file and storing data to variable ndata
            fs.readFile('./message.txt', 'utf8', (err, data) => {
                if (err) {
                    console.error(err);
                    return;
                }
                ndata = data;
            });
             return res.end();
        });
    }
});

server.listen(3000);