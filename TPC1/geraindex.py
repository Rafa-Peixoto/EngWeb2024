import os
import xml.etree.ElementTree as ET

# Função para extrair informações do XML
def extrair_informacoes(xml_file_path):
    tree = ET.parse(xml_file_path)
    root = tree.getroot()

    rua_info = {
        'nome': root.find('.//meta/nome').text,
        'numero': root.find('.//meta/número').text,
        'imagens': []
    }

    # Extrair informações das imagens (assumindo múltiplas imagens por rua)
    for figura in root.findall('.//corpo/figura'):
        imagem_path = figura.find('imagem').get('path')
        legenda = figura.find('legenda').text if figura.find('legenda') is not None else ''
        rua_info['imagens'].append({'path': imagem_path, 'legenda': legenda})

    return rua_info

def processar_pasta(pasta):
    todas_ruas = []
    for ficheiro in os.listdir(pasta):
        if ficheiro.endswith('.xml'):
            caminho_completo = os.path.join(pasta, ficheiro)
            informacao_rua = extrair_informacoes(caminho_completo)
            todas_ruas.append(informacao_rua)
    return todas_ruas

pasta_antigas = r'C:\university\3ano\Engenharia Web\EngWeb2024\TPC1\Ruas\antigas'
pasta_novas = r'C:\university\3ano\Engenharia Web\EngWeb2024\TPC1\Ruas\novas'
pasta_informacao = r'C:\university\3ano\Engenharia Web\EngWeb2024\TPC1\Ruas\informacao'
# Testar a função com o ficheiro fornecido
informacao_ruas = processar_pasta(pasta_informacao) 
print(informacao_ruas)
