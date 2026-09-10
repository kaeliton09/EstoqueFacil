<!-- docs/etapa-02.md -->

# EstoqueFácil — Etapa 02

*Tecnologia de Construção de Software II*

## 1. Objetivo da Etapa

A Etapa 02 do projeto **EstoqueFácil** teve como objetivo desenvolver a primeira versão visual e navegável da aplicação mobile de gerenciamento de estoque.

Nesta etapa, o foco foi a construção da camada de interface, organização dos componentes e navegação entre as telas. Não foram implementadas persistência de dados, autenticação real ou comunicação com backend. Os dados apresentados são mockados e utilizados apenas para representar o funcionamento visual da aplicação.

A aplicação foi desenvolvida utilizando:

- React Native;
- Expo;
- TypeScript;
- Expo Router;
- React Navigation Bottom Tabs;
- Expo Vector Icons;
- Poppins como fonte principal;
- Biblioteca de gráficos compatível com React Native para a visualização dos dados do Dashboard.

---

## 2. Telas Implementadas

Foram implementadas quatro telas principais para atender aos requisitos da Etapa 02.

### 2.1 Tela de Login

A tela de Login é a tela inicial da aplicação.

Ela permite que o usuário informe:

- E-mail;
- Senha.

Também foram implementados:

- Ilustração relacionada ao contexto de estoque;
- Campo de senha com opção de mostrar ou ocultar o conteúdo;
- Link "Esqueceu a senha?";
- Botão "Entrar";
- Divisor visual com a palavra "ou";
- Opção visual para cadastro de usuário.

Nesta etapa, não existe autenticação real. Após o preenchimento dos campos obrigatórios, o usuário é direcionado para a área principal da aplicação.

A tela utiliza a paleta visual do projeto, com destaque para o verde `#6E8C03`, campos arredondados e botões em formato de pílula.

### 2.2 Dashboard

A tela de Dashboard representa a página inicial após o login.

Seu objetivo é apresentar uma visão geral das informações mais importantes do estoque.

Foram implementados cards com dados mockados, incluindo:

- Quantidade de itens cadastrados;
- Quantidade de itens abaixo do estoque mínimo;
- Valor total estimado do estoque.

Também foi implementado um gráfico para representar visualmente a movimentação ou distribuição de produtos por categoria ao longo dos meses.

O Dashboard possui rolagem vertical para permitir que o conteúdo seja visualizado adequadamente em dispositivos com diferentes alturas de tela.

### 2.3 Cadastro de Produto

A tela de Cadastro de Produto permite representar visualmente o processo de inclusão de um novo produto no estoque.

Os campos implementados são:

- Nome do produto;
- Categoria;
- Quantidade em estoque;
- Quantidade mínima;
- Preço unitário;
- Descrição ou observações.

A categoria é selecionada por meio de opções visuais em formato de chips.

Também foram implementados:

- Validação visual dos campos obrigatórios;
- Botão para salvar o produto;
- Botão para cancelar a operação;
- Retorno para a tela anterior após a conclusão da ação.

Nesta etapa, o produto não é armazenado permanentemente. O processo de cadastro serve apenas para representar a estrutura visual e o fluxo de navegação da aplicação.

### 2.4 Consulta de Produtos

A tela de Consulta de Produtos permite visualizar os produtos cadastrados em uma lista utilizando dados mockados.

Foram implementados:

- Campo de busca;
- Filtro por categoria;
- Lista de produtos utilizando `FlatList`;
- Exibição do nome do produto;
- Exibição da categoria;
- Exibição da quantidade disponível;
- Destaque visual para produtos com quantidade abaixo do estoque mínimo.

Os dados são mantidos localmente em memória apenas para fins de demonstração da interface.

Não existe comunicação com API ou banco de dados nesta etapa.

---

## 3. Principais Componentes Utilizados

A aplicação foi organizada utilizando componentes reutilizáveis para evitar repetição de código e manter uma identidade visual consistente entre as telas.

### 3.1 InputField

Componente reutilizável utilizado para os campos de entrada de dados.

Ele é utilizado nas telas de Login, Cadastro de Produto e Consulta de Produtos.

O componente pode receber diferentes configurações, como:

- Label;
- Placeholder;
- Valor;
- Função para alteração do valor;
- Tipo de teclado;
- Campo seguro para senha;
- Ícone à esquerda;
- Ícone à direita;
- Suporte a múltiplas linhas.

Isso permite utilizar o mesmo componente em diferentes contextos da aplicação.

### 3.2 PrimaryButton

Componente reutilizável para os principais botões da aplicação.

Ele segue o padrão visual definido para o EstoqueFácil:

- Fundo verde principal;
- Texto branco;
- Bordas totalmente arredondadas;
- Boa área de toque para dispositivos móveis.

É utilizado, por exemplo, nos botões:

- Entrar;
- Salvar produto.

### 3.3 StatCard

Componente utilizado no Dashboard para apresentar informações resumidas sobre o estoque.

Cada card apresenta:

- Um valor principal em destaque;
- Uma descrição do indicador;
- Cores diferentes de acordo com a importância visual da informação.

Exemplos de informações apresentadas:

- Itens cadastrados;
- Itens abaixo do mínimo;
- Valor total do estoque.

### 3.4 ProductListItem

Componente reutilizável responsável pela apresentação individual de cada produto na lista.

Ele apresenta informações como:

- Nome;
- Categoria;
- Quantidade disponível.

Também possui um destaque visual para indicar produtos cuja quantidade está abaixo do estoque mínimo.

### 3.5 BottomNavBar

A navegação principal da aplicação é realizada por meio de abas localizadas na parte inferior da tela.

A barra de navegação permite acessar:

- Home / Dashboard;
- Cadastro de Produtos;
- Consulta de Produtos.

Os ícones foram utilizados para facilitar a identificação visual de cada seção da aplicação.

A navegação foi integrada ao Expo Router, utilizando uma estrutura baseada em tabs.

---

## 4. Componentes Reutilizáveis

Os principais componentes reutilizáveis desenvolvidos nesta etapa foram:

| Componente | Função |
|---|---|
| `InputField` | Criação de campos de entrada reutilizáveis |
| `PrimaryButton` | Criação de botões principais padronizados |
| `StatCard` | Exibição de estatísticas no Dashboard |
| `ProductListItem` | Exibição individual dos produtos na lista |
| `BottomNavBar` | Navegação principal entre as funcionalidades |

A utilização de componentes reutilizáveis permite:

- Reduzir duplicação de código;
- Facilitar manutenção;
- Manter consistência visual;
- Simplificar futuras alterações;
- Melhorar a organização do projeto.

---

## 5. Elementos de Entrada de Dados

Nesta etapa foram utilizados diferentes elementos de entrada de dados para representar as principais interações do usuário com a aplicação.

### 5.1 Tela de Login

A tela possui:

- Campo de texto para e-mail;
- Campo seguro para senha;
- Botão para mostrar ou ocultar a senha.

### 5.2 Tela de Cadastro de Produto

Foram utilizados:

- Campo para nome do produto;
- Seleção de categoria;
- Campo numérico para quantidade;
- Campo numérico para quantidade mínima;
- Campo para preço unitário;
- Campo de texto para descrição e observações.

As categorias foram apresentadas utilizando opções selecionáveis em formato de chips.

### 5.3 Tela de Consulta de Produtos

Foram utilizados:

- Campo de busca;
- Filtro por categoria.

Esses elementos permitem representar a futura funcionalidade de pesquisa e filtragem dos produtos.

---

## 6. Estratégias de Adaptação para Diferentes Tamanhos de Tela

A interface foi desenvolvida considerando diferentes tamanhos de dispositivos móveis.

### 6.1 Flexbox

A maior parte da organização dos elementos utiliza Flexbox.

Foram utilizadas propriedades como:

- `flex`;
- `flexDirection`;
- `alignItems`;
- `justifyContent`;
- `flexWrap`.

Isso permite que os elementos se adaptem melhor ao espaço disponível.

### 6.2 Larguras Relativas

Sempre que possível, foram utilizadas larguras relativas, como:

```tsx
width: '100%'
```

Essa estratégia evita que os componentes dependam exclusivamente de valores fixos de largura.

### 6.3 ScrollView

As telas com maior quantidade de conteúdo utilizam ScrollView.

Isso permite que telas menores continuem exibindo todo o conteúdo por meio da rolagem vertical.

O ScrollView é utilizado especialmente em telas como:

- Login;
- Dashboard;
- Cadastro de Produto.

### 6.4 FlatList

A lista de produtos utiliza FlatList.

Esse componente é mais adequado para exibir listas de dados, especialmente quando a quantidade de itens pode aumentar no futuro.

Além disso, a utilização de FlatList contribui para uma melhor organização da tela de consulta de produtos.

### 6.5 Safe Areas e Teclado

A estrutura da aplicação considera áreas seguras dos dispositivos e o comportamento do teclado.

Na tela de Login e na tela de Cadastro de Produto, foi utilizado KeyboardAvoidingView para melhorar a experiência ao preencher os campos.

Essa estratégia evita que os campos sejam ocultados pelo teclado, especialmente em dispositivos menores.

### 6.6 useWindowDimensions

A tela de Login utiliza useWindowDimensions para identificar características relacionadas ao tamanho disponível da tela.

Isso permite realizar pequenos ajustes de espaçamento para dispositivos com larguras menores, tornando o layout mais adaptável.

---

## 7. Navegação da Aplicação

A navegação foi implementada utilizando o Expo Router.

A estrutura principal da aplicação é composta por uma tela inicial de Login e um grupo de abas para as funcionalidades principais.

O fluxo de navegação é:

```
Login
  |
  | Entrar
  v
Dashboard
  |
  +---- Home
  |
  +---- Cadastro de Produtos
  |
  +---- Consulta de Produtos
```

A tela de Login fica separada da navegação principal.

Após o usuário preencher os dados necessários e pressionar o botão de entrada, a aplicação direciona o usuário para a área principal.

Nesta etapa, não existe controle real de autenticação.

---

## 8. Instruções para Execução da Aplicação

### 8.1 Instalação das dependências

Primeiramente, é necessário acessar a pasta do projeto:

```bash
cd src/frontend/EstoqueFacil
```

Em seguida, instalar as dependências:

```bash
npm install
```

Caso as fontes e ícones ainda não estejam instalados, utilizar:

```bash
npx expo install @expo-google-fonts/poppins expo-font @expo/vector-icons
```

### 8.2 Executar a aplicação

Para iniciar o projeto:

```bash
npx expo start
```

Após iniciar o Expo, a aplicação pode ser executada utilizando:

- Expo Go em um dispositivo Android;
- Emulador Android;
- Navegador, quando suportado.

Para executar no Android Emulator, com o Expo em execução, pode-se pressionar `a`.

Para abrir no navegador, pode-se pressionar `w`.

### 8.3 Limpeza de cache

Caso ocorram problemas após alterações nos arquivos, o Expo pode ser iniciado limpando o cache:

```bash
npx expo start -c
```

---

## 9. Principais Decisões de Interface

### 9.1 Paleta de Cores

A identidade visual do EstoqueFácil foi baseada principalmente na cor `#6E8C03`, utilizada como verde principal da aplicação.

Também foram utilizadas:

- Preto para elementos de destaque;
- Branco para superfícies e textos contrastantes;
- Tons claros de cinza para fundos;
- Variações do verde para elementos gráficos.

A centralização das cores no arquivo de tema permite reutilização e facilita futuras alterações na identidade visual.

### 9.2 Tipografia

Foi utilizada a fonte Poppins.

Os pesos utilizados incluem versões como:

- Regular;
- Medium;
- SemiBold;
- Bold;
- ExtraBold.

A fonte foi escolhida por possuir aparência moderna, boa legibilidade e compatibilidade com a proposta visual da aplicação.

Os títulos possuem maior peso e utilizam o verde principal como cor de destaque.

### 9.3 Bordas Arredondadas

Os componentes foram desenvolvidos utilizando bordas bastante arredondadas.

Essa decisão foi aplicada principalmente em:

- Cards;
- Campos de texto;
- Botões;
- Chips;
- Elementos da interface.

Os cards possuem raio maior, seguindo uma aparência moderna e organizada. Os botões principais utilizam formato semelhante a uma pílula.

### 9.4 Espaçamento e Organização

Foi priorizado o uso de espaços em branco entre os elementos.

Essa decisão contribui para:

- Melhor legibilidade;
- Menor poluição visual;
- Facilidade de identificação dos elementos;
- Organização das informações;
- Melhor experiência em telas pequenas.

### 9.5 Navegação

Foi utilizado o Expo Router para organizar a navegação da aplicação.

A escolha foi feita por sua integração com projetos Expo e por permitir uma estrutura baseada em arquivos.

A navegação principal utiliza abas inferiores para facilitar o acesso às três principais funcionalidades:

- Dashboard;
- Cadastro;
- Consulta.

### 9.6 Ícones

Os ícones foram implementados utilizando `@expo/vector-icons`.

Foram utilizados ícones relacionados às funcionalidades, como:

- Casa para o Dashboard;
- Adição ou caixa para Cadastro;
- Busca ou lista para Consulta de Produtos;
- E-mail e cadeado na tela de Login.

A utilização de ícones melhora a identificação visual das funcionalidades e reduz a necessidade de texto excessivo.

### 9.7 Gráfico do Dashboard

O Dashboard utiliza dados mockados para representar visualmente informações relacionadas ao estoque.

O gráfico utiliza variações do verde principal para diferenciar as séries de dados.

A escolha de manter a identidade visual do gráfico alinhada à paleta da aplicação contribui para uma interface mais consistente.

---

## 10. Dados Mockados e Limitações da Etapa

A Etapa 02 possui foco exclusivo na camada visual e estrutural da aplicação.

Portanto, ainda não foram implementados:

- Banco de dados;
- Persistência de produtos;
- API;
- Backend;
- Autenticação real;
- Cadastro real de usuários;
- Recuperação real de senha;
- Comunicação com servidor.

Os dados apresentados no Dashboard e na Consulta de Produtos são dados mockados, definidos localmente na aplicação.

O botão de cadastro realiza apenas uma validação visual dos campos e simula o fluxo de conclusão da operação.

Essas funcionalidades poderão ser integradas em etapas posteriores do desenvolvimento.

---

## 11. Estrutura Geral da Etapa

A organização do projeto segue uma separação entre telas, componentes e configurações visuais.

Exemplo da estrutura:

```
src/
├── app/
│   ├── _layout.tsx
│   ├── index.tsx
│   └── (tabs)/
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── cadastro.tsx
│       └── produtos.tsx
│
├── assets/
│   └── login-illustration.png
│
├── components/
│   ├── BottomNavBar.tsx
│   ├── InputField.tsx
│   ├── PrimaryButton.tsx
│   ├── ProductListItem.tsx
│   └── StatCard.tsx
│
├── screens/
│   ├── LoginScreen.tsx
│   ├── DashboardScreen.tsx
│   ├── ProductFormScreen.tsx
│   └── ProductListScreen.tsx
│
└── theme/
    ├── colors.ts
    └── typography.ts
```

Essa organização separa responsabilidades e facilita a evolução do projeto nas próximas etapas.

---

## 12. Conclusão

A Etapa 02 permitiu estabelecer a base visual e navegável do EstoqueFácil.

Foram implementadas quatro telas principais:

- Login;
- Dashboard;
- Cadastro de Produto;
- Consulta de Produtos.

Também foram desenvolvidos componentes reutilizáveis para manter a consistência visual e facilitar a manutenção do código.

A aplicação possui uma estrutura preparada para receber, em etapas futuras, funcionalidades como persistência de dados, integração com backend, autenticação de usuários e gerenciamento real do estoque.