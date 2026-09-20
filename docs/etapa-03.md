# Etapa 03 — Navegação, UX e Acessibilidade

## 1. Objetivo

A Etapa 03 teve como objetivo aprimorar a navegação da aplicação **Estoque Fácil**, implementar mecanismos de feedback visual e aplicar medidas de acessibilidade aos principais componentes da interface.

Nesta etapa também foi realizada uma revisão da estrutura de navegação, mantendo apenas os mecanismos necessários para o fluxo atual da aplicação.

---

## 2. Estrutura de navegação

A aplicação utiliza o **Expo Router** como mecanismo de navegação, seguindo uma estrutura baseada em arquivos.

A estrutura principal de navegação é:

```text
src/app/
├── _layout.tsx
├── index.tsx
├── login.tsx
└── (tabs)/
    ├── _layout.tsx
    ├── index.tsx
    ├── search.tsx
    └── add.tsx
```

O arquivo `src/app/_layout.tsx` define a navegação principal utilizando `Stack`.

A rota inicial (`index.tsx`) direciona o usuário para a tela de **Login**.

Após o login, a aplicação direciona o usuário para o grupo de abas (`tabs`).

A navegação principal pode ser representada da seguinte forma:

```text
                    Aplicação
                       │
                       ▼
                     Login
                       │
                       ▼
                  Área principal
                       │
          ┌────────────┼────────────┐
          ▼            ▼            ▼
        Home          Itens      Cadastrar
```


---

## 3. Telas e mecanismos de acesso

### 3.1 Login

A tela de Login é acessada inicialmente pela aplicação.

**Arquivo:** `src/app/login.tsx`

A tela contém:

- campo de e-mail;
- campo de senha;
- botão de login.

O fluxo atualmente é apenas de demonstração, não havendo autenticação real com backend.

Após o preenchimento dos campos, o usuário pode acessar a área principal da aplicação.

### 3.2 Home / Dashboard

A tela Home é a primeira tela da área principal.

**Arquivo:** `src/app/(tabs)/index.tsx`

Seu acesso ocorre por meio da aba **Home** da navegação inferior.

A tela apresenta informações resumidas do estoque, incluindo:

- valor total em estoque;
- quantidade de itens cadastrados;
- quantidade de itens com estoque baixo;
- seção de produtos.

Os dados utilizados atualmente são mockados.

### 3.3 Itens / Busca

A tela de consulta de produtos é acessada pela aba **Itens**.

**Arquivo:** `src/app/(tabs)/search.tsx`

A tela possui:

- campo de busca;
- filtros;
- lista de produtos;
- informações de código e quantidade em estoque.

Os dados ainda são estáticos, pois a integração com banco de dados e backend será realizada posteriormente.

### 3.4 Cadastro de Produto

A tela de cadastro é acessada pela aba **Cadastrar**.

**Arquivo:** `src/app/(tabs)/add.tsx`

A tela possui campos relacionados às informações do produto, localização, imagem e ação de cadastro.

O cadastro ainda não possui persistência de dados.

---

## 4. Mecanismos de navegação

Foi utilizada uma barra de navegação inferior por meio do componente `Tabs` do Expo Router.

As abas disponíveis são:

| Aba       | Função                          |
| --------- | ------------------------------- |
| Home      | Visualizar o resumo do estoque  |
| Itens     | Buscar e consultar produtos     |
| Cadastrar | Cadastrar um novo produto       |

Cada aba possui um ícone e um título identificando sua função.

A navegação inferior permanece disponível para facilitar a troca entre as principais áreas da aplicação.

### 4.1 Remoção do Menu

O item **Menu** presente anteriormente foi removido.

A decisão foi tomada porque, neste momento do desenvolvimento, ele não possuía funcionalidades relevantes que justificassem uma área própria.

A remoção também reduz a quantidade de elementos de navegação e mantém a interface focada nas funcionalidades que já estão disponíveis.

Caso sejam implementadas posteriormente funcionalidades como configurações, perfil, preferências ou outras opções administrativas, um menu poderá ser reintroduzido.

---

## 5. Feedback visual

Foram implementados estados visuais para melhorar a percepção das interações do usuário.

### 5.1 Botões

Os botões possuem estados para:

- estado normal;
- estado pressionado;
- estado desabilitado;
- estado de carregamento, quando aplicável.

O estado pressionado fornece uma resposta visual imediata após a interação.

### 5.2 Campos de entrada

Os campos de entrada possuem diferentes estados:

- normal;
- focado;
- erro;
- desabilitado.

O estado de foco permite identificar visualmente qual campo está sendo utilizado.

O estado de erro utiliza indicação visual e mensagem textual.

### 5.3 Filtros

Os botões de filtro possuem estados de:

- normal;
- pressionado;
- selecionado.

Isso permite identificar visualmente quando um filtro está ativo.

---

## 6. Decisões de UX

As principais decisões de UX desta etapa foram:

### 6.1 Navegação simplificada

A navegação principal foi reduzida às funcionalidades atualmente disponíveis:

- Home;
- Itens;
- Cadastrar.

O Menu foi removido temporariamente para evitar uma área de navegação sem funcionalidades relevantes.

### 6.2 Componentes reutilizáveis

Foram mantidos componentes reutilizáveis para elementos recorrentes da interface, como:

- `PrimaryButton`;
- `InputField`;
- `FilterButton`;
- `SearchInput`;
- `BackButton`;
- `ProductListItem`.

Isso permite manter comportamento e aparência consistentes entre as telas.

### 6.3 Áreas de interação

Os componentes interativos foram dimensionados considerando a facilidade de toque em dispositivos móveis.

Botões e campos possuem áreas de interação adequadas para reduzir erros de toque.

### 6.4 Hierarquia visual

A tipografia e os espaçamentos foram centralizados no sistema de tema da aplicação.

São utilizados diferentes níveis tipográficos para títulos, subtítulos, textos de conteúdo e informações auxiliares.

---

## 7. Medidas de acessibilidade

Foram adicionados mecanismos de acessibilidade aos principais componentes.

### 7.1 Botões

Os botões utilizam:

```tsx
accessibilityRole="button"
```

Também são utilizados, quando necessário:

- `accessibilityLabel`;
- `accessibilityState`.

Isso permite que leitores de tela identifiquem a função e o estado dos componentes.

### 7.2 Campos de entrada

Os campos possuem:

- identificação por label;
- `accessibilityLabel`;
- indicação de estado desabilitado;
- identificação de erro;
- mensagem textual de erro;
- estado visual de foco.

### 7.3 Filtros

Os filtros possuem:

- identificação como botão;
- `accessibilityLabel`;
- estado selecionado;
- estado pressionado.

### 7.4 Botão voltar

O componente `BackButton` possui identificação específica para leitores de tela e uma indicação da ação executada.

O ícone utilizado para representar a ação não precisa ser interpretado separadamente quando a informação já é fornecida pelo botão.

### 7.5 Legibilidade

Foi mantida uma hierarquia tipográfica utilizando o sistema de tema da aplicação.

Além disso, foram evitadas situações em que somente uma mudança de cor seja responsável por comunicar uma informação importante, sendo utilizadas mensagens textuais quando necessário.

---

## 8. Execução

Para executar o projeto:

```bash
cd src/frontend/EstoqueFacil
npm install
npx expo start
```

Após iniciar o Expo, a aplicação pode ser executada:

- pelo Expo Go;
- em um emulador Android;
- no navegador, quando suportado.

Para limpar o cache:

```bash
npx expo start -c
```

---

## 9. Teste da navegação

O fluxo principal pode ser testado seguindo os passos:

1. Iniciar a aplicação.
2. Verificar o direcionamento para a tela de Login.
3. Preencher e-mail e senha.
4. Pressionar o botão de Login.
5. Verificar o acesso à Home.
6. Utilizar a aba Itens.
7. Verificar a tela de busca.
8. Utilizar os filtros disponíveis.
9. Utilizar a aba Cadastrar.
10. Verificar a tela de cadastro.
11. Testar os campos de entrada.
12. Testar os estados visuais dos componentes.

Também deve ser realizada uma verificação de acessibilidade utilizando o leitor de tela disponível no dispositivo/emulador.

No Android, pode ser utilizado o **TalkBack** para verificar se os elementos interativos possuem identificação e descrição adequadas.

---

## 10. Limitações

A navegação implementada nesta etapa ainda não representa uma autenticação real.

Ainda não foram implementados:

- autenticação com backend;
- persistência de dados;
- integração com PostgreSQL;
- comunicação com API;
- leitura de código de barras;
- funcionalidades avançadas de gerenciamento de conta;
- funcionalidades que justificariam um Menu próprio.

Esses recursos poderão ser implementados nas próximas etapas.

---

## 11. Resultado da etapa

Ao final da Etapa 03, a aplicação possui uma estrutura de navegação funcional com Login e navegação por abas, mecanismos de feedback visual nos principais componentes e medidas iniciais de acessibilidade.

A interface permanece preparada para a implementação posterior da lógica de negócio e integração com o backend.