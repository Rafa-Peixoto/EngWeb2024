
exports.pagInicial = function() {
    var htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Compositores e Periodos</title>
            <link rel="stylesheet" type="text/css" href="w3.css">
        </head>
        <body>
            <h1>Compositores e Periodos</h1>
            <ul>
                <li><a href="/compositores">Compositores</a></li>
                <li><a href="/periodos">Periodos</a></li>
            </ul>
        </body>
        </html>
    `;
    return htmlContent;
}
exports.getCompositor = function getCompositor(compositor){
    var pagHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Detalhes do Compositor</title>
            <link rel="stylesheet" type="text/css" href="w3.css">
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Detalhes do Compositor</h1>
                    <a href="javascript:history.back()">Voltar</a>
                </header>
                <div class="w3-container">
                    <h2>${compositor.nome}</h2>
                    <p>Período: ${compositor.periodo.nome}</p>
                    <p>Bio: ${compositor.bio}</p>
                    <p>Ano de Nascimento: ${compositor.dataNasc}</p>
                    <p>Ano de Falecimento: ${compositor.dataObito}</p>
                </div>
                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024::A100754</h5>
                </footer>
            </div>
        </body>
        </html>`;
    return pagHTML;
}


exports.getCompositores = function getCompositores(compositores) {
    var pagHTML = `
<!DOCTYPE html>
<html>
<head>
    <title>Lista de Compositores</title>
    <link rel="stylesheet" type="text/css" href="w3.css">
</head>
<body>
    <div class="w3-card-4">
        <header class="w3-container w3-purple">
            <h1>Lista de Compositores</h1>
            <a href="javascript:history.back()">Voltar</a>
        </header>
        <div class="w3-container">
            <table class="w3-table w3-striped">
                <tr>
                    <th>Identificador</th>
                    <th>Nome</th>
                    <th>Periodo</th>
                </tr>`;
    compositores.forEach(c => {
        pagHTML += `
                <tr>
                    <td><a href='/compositores/${c.id}'>${c.id}</a></td>
                    <td>${c.nome}</td>
                    <td>${c.periodo.nome}</td>
                    <td>
                        <form action="/compositores/delete/${c.id}" method="post">
                            <button type="submit">Delete</button>
                        </form>
                    </td>
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

exports.getPeriodos = function getPeriodos(periodos){
    var pagHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Lista de Periodos</title>
            <link rel="stylesheet" type="text/css" href="w3.css">
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Lista de Periodos</h1>
                    <a href="javascript:history.back()">Voltar</a>
                </header>
                <div class="w3-container">
                    <table class="w3-table w3-striped">
                        <tr>
                            <th>Identificador</th>
                            <th>Nome</th>
                        </tr>`;
    periodos.forEach(p => {
        pagHTML += `
                        <tr>
                            <td><a href='/periodos/${p.id}'>${p.id}</a></td>
                            <td>${p.nome}</td>
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

exports.getPeriodo = function getPeriodo(periodo){
    var pagHTML = `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Detalhes do Periodo</title>
            <link rel="stylesheet" type="text/css" href="w3.css">
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-purple">
                    <h1>Detalhes do Periodo</h1>
                    <a href="javascript:history.back()">Voltar</a>
                </header>
                <div class="w3-container">
                    <h2>${periodo.nome}</h2>
                    <p>Compositores:</p>
                    <ul>`;
    periodo.compositores.forEach(c => {
        pagHTML += `
                        <li><a href='/compositores/${c.id}'>${c.nome}</a></li>`;
    });
    pagHTML += `
                    </ul>
                </div>
                <footer class="w3-container w3-purple">
                    <h5>Generated by EngWeb2024::A100754</h5>
                </footer>
            </div>
        </body>
        </html>`;
    return pagHTML;
}

exports.errorPage = function(errorMessage){
    return `
    <html>
    <head>
        <title>Error page</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Error page</h1>
            </header>
            <div class="w3-container">
                <p>${errorMessage}</p>
            </div>
            <footer class="w3-container w3-teal">
                <address>Gerado por A100754::EngWeb2024  - [<a href="javascript:history.back()">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}