import json

def get_period_id(periodo, periodos):
    """Obtém o ID de um período dado, criando um novo se necessário."""
    if periodo not in periodos:
        periodos[periodo] = {
            'id': f"P{len(periodos) + 1}",
            'nome': periodo,
            'compositores': []
        }
    return periodos[periodo]['id']

def main():
    # Ler o arquivo JSON original com a codificação correta
    with open('compositores.json', 'r', encoding='utf-8') as file:
        data = json.load(file)

    # Criar um dicionário para agrupar os compositores por período
    periodos_dict = {}
    for compositor in data['compositores']:
        periodo_nome = compositor['periodo']
        periodo_id = get_period_id(periodo_nome, periodos_dict)
        periodos_dict[periodo_nome]['compositores'].append({
            'id': compositor['id'],
            'nome': compositor['nome']
        })
        # Atualizar a entrada de período no compositor
        compositor['periodo'] = {'id': periodo_id, 'nome': periodo_nome}

    # Converter o dicionário em uma lista para o novo JSON
    periodos_list = list(periodos_dict.values())

    # Criar o novo dicionário para ser salvo no arquivo, preservando a estrutura original e adicionando a nova
    new_data = data
    new_data['periodos'] = periodos_list  # Adiciona a nova lista de períodos

    # Escrever o novo arquivo JSON
    with open('compositores2.json', 'w', encoding='utf-8') as file:
        json.dump(new_data, file, indent=4, ensure_ascii=False)

    print("Novo arquivo 'compositores2.json' atualizado com sucesso.")

if __name__ == '__main__':
    main()
