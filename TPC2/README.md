# TPC2: Processar o dataset Mapa Virtual

## Autor:
- A100754
- Rafael Vale da Costa Peixoto

## Resumo:

1. Criar uma página para cada cidade: c1.html, c2.html, ...
2. Página principal:
    - Lista alfabética de cidades. Cada cidade é um link da forma
        ```code
        <li> <a href="http://localhost:7777/c3">Braga</a> </li>
        ```

### Serviço em Node:
- '/' -> Página Principal
- '/cX' -> Página da Cidade cX

### Página da Cidade
- Nome, ID, Distrito, População, ...
- Ligações