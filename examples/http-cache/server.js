const express = require('express');
const moment = require('moment');

const app = express()

function getRFC2822Date(addSeconds = 10) {
  const RFC2822Format = "ddd, DD MMM YYYY HH:mm:ss [GMT]";
  return moment()
    .utc()
    .add(addSeconds, 's')
    .format(RFC2822Format)  
}

app.get('/expires', (req, res) => {
  app.set('etag', false)
  res.setHeader(
    'Expires',
    getRFC2822Date()
  )
  res.send(`
  <script>
  function getData() { fetch('http://localhost:8800/expires')}
  </script>
  <div>
  Expires!
  <button onclick="getData()">re get</button>
  </div>`)
})

app.get('/pragma', (req, res) => {
  app.set('etag', false)
  res.setHeader(
    'Expires',
    getRFC2822Date()
  )
  res.setHeader('Pragma', 'no-cache')
  res.send(`
  <script>
  function getData() { fetch('http://localhost:8800/pragma')}
  </script>
  <div>
  Pragma!
  <button onclick="getData()">re get</button>
  </div>`)
})

app.get('/cache-control/max-age', (req, res) => {
  app.set('etag', false)
  res.setHeader('Cache-Control', 'max-age=10')
  res.send(`
  <script>
  function getData() { fetch('http://localhost:8800/cache-control/max-age')}
  </script>
  <div>
  Cache-Control max-age!
  <button onclick="getData()">re get</button>
  </div>`)
})

app.get('/cache-control/no-store', (req, res) => {
  app.set('etag', false)
  res.setHeader('Cache-Control', 'no-cache')
  res.send(`
  <script>
  function getData() { fetch('http://localhost:8800/cache-control/no-store')}
  </script>
  <div>
  Cache-Control no-store!
  <button onclick="getData()">re get</button>
  </div>`)
})

let lastModified = getRFC2822Date(20)
// 模拟每 5 秒钟更新一次资源。
setInterval(() => lastModified = getRFC2822Date(20), 5 * 1000)
app.get('/last-modified', (req, res) => {
  app.set('etag', false)
  res.set('Last-Modified', lastModified)
  res.send(`
  <script>
  function getData() { fetch('http://localhost:8800/last-modified')}
  </script>
  <div>
  Last-Modified
  <button onclick="getData()">re get</button>
  </div>`)
})

app.get('/etag', (req, res) => {
  app.set('etag', true)
  res.send(`
  <script>
  function getData() { fetch('http://localhost:8800/etag')}
  </script>
  <div>
  ETag
  <button onclick="getData()">re get</button>
  </div>`)
})

app.listen('8800', ()=> {
  console.log('server listening on http://localhost:8800')
})
