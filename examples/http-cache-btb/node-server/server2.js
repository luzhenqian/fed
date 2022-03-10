const http = require('http');
const moment = require('moment');

function getRFC2822Date(addSeconds = 10) {
  const RFC2822Format = "ddd, DD MMM YYYY HH:mm:ss [GMT]";
  return moment()
    .utc()
    .add(addSeconds, 's')
    .format(RFC2822Format)  
}

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'expires': getRFC2822Date() })
  res.write('hello world')
  console.log('111')
  res.end()
})

server.listen(5001)
