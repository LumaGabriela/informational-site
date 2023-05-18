const fs = require('fs')
const http = require('http')


let page404 = fs.readFileSync(`./pages/404.html` ,  {encoding:'utf8', flag:'r'})

let stylepage = fs.readFileSync(`./styles/styles.css` ,  {encoding:'utf8', flag:'r'})

const server = http.createServer( (req, res) => {

    fs.readFile(`./pages${req.url === '/' ? '/index' : req.url}.html` , (err, data) => {

         if (req.url === '/' || req.url === '/index' || req.url === '/contact' || req.url === '/about' ) {
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write(data.toString())
                res.end()
            } 
            else if (req.url === '/styles.css') {
                res.writeHead(200, {'Content-Type': 'text/css'})
                res.write(stylepage)
                res.end()
            } 
            else if (err) {  
                console.log(' Error reading file: ' + req.url)
                res.writeHead(404, {'Content-Type': 'text/html'})
                res.write(page404)
                res.end()
            
            }
    })  
})
    
    
    




server.listen(3000, 'localhost', () => console.log('listening for requests on port 3000'))