var http = require('http');
var url = require('url');
var fs = require('fs');
var axios = require('axios');

// Função para gerar a página HTML da lista de filmes
function getFilmes(filmes) {
    var pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Lista de Filmes</title>
    <link rel="stylesheet" type="text/css" href="w3.css">
</head>
<body>
    <div class="w3-card-4">
        <header class="w3-container w3-purple">
            <h1>Lista de Filmes</h1>
            <a href="javascript:history.back()">Voltar</a>
        </header>
        <div class="w3-container">
            <table class="w3-table w3-striped">
                <tr>
                    <th>Identificador</th>
                    <th>Nome</th>
                    <th>Ano</th>
                </tr>`;
    filmes.forEach(f => {
        pagHTML += `
                <tr>
                    <td><a href='/filmes/${f.id}'>${f.id}</a></td>
                    <td>${f.title}</td>
                    <td>${f.year}</td>
                </tr>`;
    });
    pagHTML += `
            </table>
        </div>
        <footer class="w3-container w3-purple">
            <h5>Generated by EngWeb2024::A100754</h5>
        </footer>
    </div>
</body>
</html>`;
    return pagHTML;
}

// Função para gerar a página HTML de um filme específico
function getFilme(filme) {
    var pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Filme ${filme.title}</title>
    <link rel="stylesheet" type="text/css" href="w3.css">
</head>
<body>
    <div class="w3-card-4">
        <header class="w3-container w3-purple">
            <h1>${filme.title}</h1>
            <a href="javascript:history.back()">Voltar</a>
        </header>
        <div class="w3-container">
            <p><b>ID:</b> ${filme.id}</p>
            <p><b>Ano:</b> ${filme.year}</p>
            <p><b>Elenco:</b></p>
            <ul>`;
    if (filme.cast.length != 0) {
        pagHTML += '<p><b>Elenco: </b>'
        pagHTML += '<ul>'
        for (var cast in filme.cast) {
            pagHTML += `<li><a href='/atores/${filme.cast[cast]}'>${filme.cast[cast]}</a></li>`;
        }
        pagHTML += '</ul>'
    }
    pagHTML += `</ul>
            <p><b>Gêneros:</b></p>
            <ul>`;
    filme.genres.forEach(genre => {
        pagHTML += `<li>${genre}</li>`;
    });
    pagHTML += `</ul>
        </div>
        <footer class="w3-container w3-purple">
            <h5>Generated by EngWeb2024::A100754</h5>
        </footer>
    </div>
</body>
</html>`;
    return pagHTML;
}

// Função para gerar a página HTML de um ator específico
function getAtor(ator) {
    pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>Ator ${ator.name}</title>
        <link rel="stylesheet" type="text/css" href="../w3.css">
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-purple">
                <h1>${ator.name}</h1>
                <a href="javascript:history.back()">Voltar</a>
            </header>

            <div class="w3-container">`
            
    pagHTML += `<p><b>ID: </b>${ator.id}</p>`
    pagHTML += `<p><b>Nome: </b>${ator.name}</p>`
    if (ator.movies.length != 0) {
        pagHTML += '<p><b>Filmes: </b>'
        pagHTML += '<ul>'
        for (var movie in ator.movies) {
            pagHTML += `<li><a href='/filmes/${ator.movies[movie]}'>${ator.movies[movie]}</a></li>`;
        }
        pagHTML += '</ul>'
    }

    pagHTML += `
            </div>

            <footer class="w3-container w3-purple">
                <h5>Generated by EngWeb2024::A100754</h5>
            </footer>
        </div>
    </body>
</html>`
    return pagHTML;
}


function getAtores(atores) {
    pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <title>Lista de Atores</title>
        <link rel="stylesheet" type="text/css" href="../w3.css">
    </head>

    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-purple">
                <h1>Lista de Atores</h1>
                <a href="javascript:history.back()">Voltar</a>
            </header>

            <div class="w3-container">
                <table class="w3-table w3-stripped">
                    <tr>
                        <th>Identificador</th>
                        <th>Nome</th>
                    </tr>`

    atores.forEach(a => {
        pagHTML += `
<tr>
    <td><a href='/atores/${a.id}'>${a.id}</a></td>
    <td>${a.name}</td>
</tr>`
    })

    pagHTML += `
    </table>
    </div>

    <footer class="w3-container w3-purple">
        <h5>Generated by EngWeb2024::A100754</h5>
    </footer>
</div>
</body>
</html>`

    return pagHTML;
}

// Função para servir arquivos estáticos
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

// Criar servidor e definir rotas
http.createServer(function(req, res) {
    var q = url.parse(req.url, true).pathname.slice(1)
    var regexFilmesID = /^filmes\/[a-z0-9]{24}$/
    var regexGenerosID = /^generos\/\d+$/
    var regexAtoresID = /^atores\/\d+$/

    var regexFilmesName = /^filmes\/.+$/
    var regexGenerosName = /^generos\/.+$/
    var regexAtoresName = /^atores\/.+$/
    console.log(q)

    if (q === '') {
        serveFile('site/index.html', 'text/html; charset=utf-8', res)
    } else if (q === 'w3.css') {
        serveFile('w3.css', 'text/css', res);
    } else if (q === 'filmes') {
        axios.get('http://localhost:3000/filmes')
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getFilmes(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção de Filmes: ' + error);
            });
    } else if (regexFilmesID.test(q)) {
        axios.get('http://localhost:3000/' + q)
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getFilme(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção do filme: ' + error);
            });
    } else if (q === 'generos') {
        axios.get('http://localhost:3000/generos')
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getGeneros(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção de Géneros: ' + error);
            });
    } else if (regexGenerosID.test(q)) {

        axios.get('http://localhost:3000/' + q)
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getGenero(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção do Género: ' + error);
            });
    } else if (q === 'atores') {
        axios.get('http://localhost:3000/atores')
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getAtores(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção de Atores: ' + error);
            });
    } else if (regexAtoresID.test(q)) {
        axios.get('http://localhost:3000/' + q)
            .then(response => {
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getAtor(response.data));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção do Ator: ' + error);
            });
    } else if (regexFilmesName.test(q)) {
        axios.get('http://localhost:3000/filmes')
            .then(response => {
                var filmes = response.data
                q = q.replace(/%20/g, ' ');
                var filme = filmes.find(f => f.title === q.slice(7))
                if (filme === undefined) {
                    serveFile('site/404.html', 'text/html; charset=utf-8', res)
                    return
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getFilme(filme));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção do filme: ' + error);
            });
    } else if (regexGenerosName.test(q)) {
        axios.get('http://localhost:3000/generos')
            .then(response => {
                var generos = response.data
                q = q.replace(/%20/g, ' ');
                var genero = generos.find(g => g.name === q.slice(8))
                if (genero === undefined) {
                    serveFile('site/404.html', 'text/html; charset=utf-8', res)
                    return
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getGenero(genero));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção do Género: ' + error);
            });
    } else if (regexAtoresName.test(q)) {
        axios.get('http://localhost:3000/atores')
            .then(response => {
                var atores = response.data
                q = q.replace(/%20/g, ' ');
                var ator = atores.find(a => a.name === q.slice(7))
                if (ator === undefined) {
                    serveFile('site/404.html', 'text/html; charset=utf-8', res)
                    return
                }
                res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                res.write(getAtor(ator));
                res.end();
            })
            .catch(function (error) {
                console.log('Erro na obtenção do Ator: ' + error);
            });
    } else {
        serveFile('site/404.html', 'text/html; charset=utf-8', res)
    }
}).listen(7777);

console.log("Server running at http://localhost:7777/");
