import json, os

def chaveOrd(emd):
    return emd["dataEMD"]


f = open(r"C:\university\3ano\Engenharia Web\EngWeb2024\semana1\emdSite\emd.json")
bd = json.load(f)
f.close()

bd.sort(reverse=True, key = chaveOrd)

preHTML = """
<!DOCTYPE html>
<html>
    <head>
        <title>Lista de Exame Médico Desportivo:</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="w3.css">
        <meta charset="utf-8"/>
    </head>
<body>

    <div class="w3-card-4">

        <header class="w3-container w3-purple">
          <h3>Lsita de Exames Médicos Desportivos: </h3>
        </header>
        
        <div class="w3-container">
           <ul class="w3-ul w3-card-4" style="width:50%">
"""

posHTML = """
            </ul>
        </div>
        
        <footer class="w3-container w3-purple">
            <h5>Generated by EMDApp::EngWeb2024::A100754</h5>
        </footer>
        
    </div>

</body>
</html> 
"""

conteudo = ""

for e in bd:
    primeiro_nome = e['nome'].get('primeiro', '')  # Get the first name, defaulting to an empty string if missing
    ultimo_nome = e['nome'].get('último', '')  # Get the last name, defaulting to an empty string if missing
    conteudo += f"""
                    <li>
                        <a href="emd{e['index']}.html">
                            {e['dataEMD']}: {primeiro_nome} {ultimo_nome}
                        </a>
                    </li>
                """

pagHTML = preHTML + conteudo + posHTML

f = open(r'C:\university\3ano\Engenharia Web\EngWeb2024\semana1\emdSite\index.html', 'w')
f.write(pagHTML)
f.close()

#print(len(bd))
#print(os.getcwd())

