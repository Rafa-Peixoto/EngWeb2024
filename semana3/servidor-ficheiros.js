var http = require('http')
var fs = require('fs')
var url = require('url')
var axios = require('axios')

http.createServer(function (req, res) {
    var regex = /^\/a[0-9]{1,3}$/
    var q = url.parse( req.url, true)
    if(regex.test(q.pathname)){
        axios.get('http://localhost:3000/alunos/a' + q.pathname.substring(2))
            .then(resp => {
                data = resp.data;
                console.log(JSON.stringify(data))
                res.writeHead(200, {'Content-Type': 'text/html'})
                res.write("<pre>" + JSON.stringify(data) + "</pre>")
                res.end()
            })
            .catch(error => {
                console.log(error);
            });  
    }
    else if(q.pathname == '/w3.css'){
        fs.readFile('w3.css', function(erro, dados) {
            res.writeHead(200, {'Content-Type': 'text/css'})
            res.write(dados)
            res.end()
        })
    }
    else{
        res.writeHead(400, {'Content-Type': 'text/html; charset=utf-8'})
        res.write('<p>Erro: pedido nÃ£o suportado.</p>')
        res.write('<pre>' + q.pathname + '</pre>')
        res.end()
    }
    console.log(q.pathname)
}).listen(7777)