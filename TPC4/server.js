var templates = require('./templates.js') 
var http = require('http');
var url = require('url');
var fs = require('fs');
var axios = require('axios');



function serveFile(filePath, contentType, res) {
    fs.readFile(filePath, function(err, data) {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.write('<h1>404 Not Found</h1>');
            res.end();
        } else {
            res.writeHead(200, {'Content-Type': contentType});
            res.write(data);
            res.end();
        }
    });
}

http.createServer(function(req, res) {
    var q = url.parse(req.url, true).pathname.slice(1)
    var regexCompositoresID = /^compositores\/C[0-9]+$/
    var regexPeriodosID = /^periodos\/\P[0-9]+$/

    var regexCompositoresName = /^compositores\/.+$/
    var regexPeriodosName = /^periodos\/.+$/
    console.log(q)

    if (q === '') {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write(templates.pagInicial());
        res.end();
    } else if (q === 'w3.css') {
        serveFile('w3.css', 'text/css', res);
    } else if (q == 'compositores') {
        axios.get('http://localhost:3000/compositores')
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(templates.getCompositores(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção de Compositores: ' + error);
            });
    } else if (q == 'periodos') {
        axios.get('http://localhost:3000/periodos')
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(templates.getPeriodos(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção de Periodos: ' + error);
            });
    } else if (regexCompositoresID.test(q)) {
        var id = q.split('/')[1]
        axios.get('http://localhost:3000/compositores/' + id)
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(templates.getCompositor(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção de Compositor: ' + error);
            });
    } else if (regexPeriodosID.test(q)) {
        var id = q.split('/')[1]
        axios.get('http://localhost:3000/periodos/' + id)
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(templates.getPeriodo(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção de Periodo: ' + error);
            });
    }else if (req.method === 'POST' && req.url.startsWith('/compositor/delete/')) {
        let id = req.url.split('/')[2];
        axios.delete(`http://localhost:3000/compositores/${id}`)
            .then(response => {
                res.writeHead(302, { 'Location': '/compositores' }); // Redireciona de volta à lista de compositores
                res.end();
            })
            .catch(function (error) {
                console.log('Error deleting composer: ' + error);
                res.writeHead(500, {'Content-Type': 'text/html'});
                res.write('<h1>Internal Server Error</h1>');
                res.end();
            });
    }else {
        serveFile('site/404.html', 'text/html; charset=utf-8', res)
    }
}).listen(7777);

console.log("Server running at http://localhost:7777/");

