# Proposta da Aplicação — Etapa 01

## 1. Nome da aplicação
**Estoque Fácil**

## 2. Problema que a aplicação pretende resolver
Muitos pequenos e médios comércios controlam o estoque de forma manual ou em
planilhas soltas, o que dificulta saber rapidamente quanto de um produto existe
disponível e, principalmente, **onde ele está fisicamente guardado**. Isso gera
perda de tempo na procura de itens, divergências entre o estoque real e o
registrado, e falta de visibilidade para o lojista tomar decisões (como repor
produtos em falta).

## 3. Público-alvo
Lojistas e pequenos/médios comerciantes que não possuem um sistema de
gerenciamento de estoque inteligente, ou que hoje não têm controle preciso
sobre a quantidade e a localização física dos produtos no estoque.

## 4. Objetivo principal
Oferecer um aplicativo mobile simples e acessível que permita mapear o
estoque de uma loja, agilizando o cadastro e a busca de produtos através da
leitura de código de barras pela câmera do celular, e indicando exatamente
onde cada item está armazenado (rua, coluna, vão e nível).

## 5. Descrição das principais funcionalidades
- **Login** do comerciante/responsável pelo estoque.
- **Cadastro de produtos**, manualmente ou escaneando o código de barras com a
  câmera do celular.
- **Busca de produtos** por nome ou código.
- **Consulta de detalhes do produto**: nome, código, quantidade e endereço no
  estoque (rua, coluna, vão e nível).
- **Listagem geral** dos produtos cadastrados no estoque.

## 6. Telas previstas
| Tela | Descrição |
|---|---|
| **Login** | Autenticação do comerciante antes de acessar o sistema. |
| **Tela Inicial (Menu)** | Ponto de entrada após o login, com acesso às demais funcionalidades. |
| **Cadastro de Produto** | Cadastro manual ou via leitura de código de barras (nome, código, quantidade, endereço). |
| **Busca de Produto** | Campo de busca por nome ou código, exibindo o resultado com todos os dados do produto. |
| **Lista de Produtos** | Listagem geral de todos os produtos cadastrados no estoque. |

## 7. Fluxo básico de navegação
```
Login
  └── Tela Inicial (Menu)
        ├── Cadastro de Produto (com opção de scanner de código de barras)
        ├── Busca de Produto → Resultado/Detalhe do Produto
        └── Lista de Produtos → Detalhe do Produto
```
Após o login, o usuário chega à Tela Inicial, que funciona como um menu de
navegação central. A partir dela, é possível acessar diretamente qualquer uma
das três funcionalidades principais (cadastro, busca e listagem), sempre
podendo retornar ao menu inicial.

## 8. Tecnologia escolhida para o desenvolvimento mobile
**React Native.** Escolhido por ser multiplataforma (Android/iOS a partir de
uma única base de código), por ter acesso nativo a recursos do dispositivo
como câmera (essencial para o scanner de código de barras) e por contar com
um ecossistema maduro de bibliotecas de navegação e integração com APIs REST.

## 9. Tecnologia escolhida para o backend
**Spring Boot.** Escolhido por ser um framework robusto e amplamente
utilizado para construção de APIs REST, com boa integração nativa com bancos
de dados relacionais como o PostgreSQL, além de facilitar a implementação de
autenticação e regras de negócio do lado do servidor.

## 10. Necessidade de comunicação com APIs externas
Não é obrigatória para o funcionamento básico da aplicação, já que o cadastro
de produtos pode ser feito manualmente. No entanto, está prevista como
possível evolução futura a integração com uma **API pública de consulta de
produtos por código de barras** (ex.: Cosmos Bluesoft ou Open Food Facts),
que preencheria automaticamente nome/descrição do produto ao escanear um
código ainda não cadastrado, agilizando o cadastro.

## 11. Forma prevista de armazenamento de dados
- **Banco de dados relacional PostgreSQL**, no backend, como fonte principal
  dos dados de estoque.
- **Persistência local no dispositivo** (ex.: SQLite ou AsyncStorage), prevista
  para etapas futuras, para permitir cache de buscas recentes e uso básico
  offline do aplicativo.

## 12. Repositório Git
Repositório contendo o projeto inicial:
https://github.com/kaeliton09/EstoqueFacil


## 13. Estrutura inicial de diretórios do projeto
```
EstoqueFacil/
│
├── README.md
├── docs/
│   ├── proposta.md
│   ├── arquitetura.md
│   └── evidencias.md
│
├── mobile/                # aplicação React Native
│   ├── src/
│   │   ├── screens/
│   │   │   ├── Login/
│   │   │   ├── Home/
│   │   │   ├── CadastroProduto/
│   │   │   ├── BuscaProduto/
│   │   │   └── ListaProdutos/
│   │   ├── components/
│   │   ├── navigation/
│   │   ├── services/
│   │   └── utils/
│   ├── App.tsx
│   └── package.json
│
├── backend/                # API Spring Boot
│   ├── src/main/java/...
│   ├── src/main/resources/
│   └── pom.xml
│
├── tests/
└── .gitignore
```
