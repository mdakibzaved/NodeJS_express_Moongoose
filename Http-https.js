const http = require('http');

// Creating A Server
const server = http.createServer((req,res)=>{
    res.end("Hello Backend ")
})
server.listen(3000)

// Clr + `    -> Terminal Open
// Ctlr + C   -> terminal Close

