# Etapa 5 — Primeira versão funcional com backend

## 1. Fluxo completo de negócio implementado

**Gestão de produtos no estoque: criar → visualizar → alterar → excluir.**

O usuário cadastra uma categoria, cadastra um produto nela (com quantidade, quantidade mínima, preço e localização física no armazém), acompanha o estoque na tela inicial, dá entrada ou baixa na quantidade e, por fim, exclui o produto. Todas as operações passam pela API: o aplicativo não guarda mais dados próprios, o servidor é a fonte única da verdade.

## 2. Passo a passo para executar o fluxo

1. Abra o app. A tela inicial carrega categorias e produtos do servidor e mostra o valor total em estoque, o número de produtos e os itens que precisam de reposição.
2. **Criar categoria:** cadastre uma categoria (ex.: "Eletrônicos").
3. **Criar produto:** na aba de cadastro, preencha código, nome, categoria, quantidade, quantidade mínima, preço e localização (rua, coluna, vão e nível) e confirme.
4. **Visualizar:** o produto aparece na listagem e na tela inicial. Se a quantidade estiver abaixo da mínima, ele entra em "Precisam de atenção".
5. **Alterar:** abra o produto e registre uma entrada ou uma baixa. A quantidade nunca fica abaixo de 0 e a tela é atualizada com o dado salvo no servidor.
6. **Excluir:** remova o produto. Ele some da listagem e do banco de dados.

## 3. Funcionalidades integradas nesta etapa

| Funcionalidade | Frontend | Backend |
|---|---|---|
| Listar categorias | `categoryService.getAll` | `GET /category/list` |
| Criar categoria | `addCategory` | `POST /category/create` |
| Excluir categoria | `categoryService.remove` | `DELETE /category/delete/{id}` |
| Listar produtos | `productService.getAll` | `GET /products/list` |
| Criar produto | `addProduct` | `POST /products/create` |
| Alterar produto / ajustar quantidade | `adjustQuantity` | `POST /products/update/{id}` |
| Excluir produto | `removeProduct` | `DELETE /products/delete/{id}` |
| Buscas (id, categoria, nome, código, últimos 10) | `productService` | `GET /products/{id}`, `/category/{id}`, `/name/{name}`, `/barcode/{code}`, `/list/last-ten` |
| Painel inicial, navegação e telas | Etapas anteriores | — |

## 4. Tratamento de entradas inválidas

**Backend (Bean Validation, com `@Valid` nos controllers):**

- Categoria: `name` e `description` não podem ser vazios (`@NotBlank`).
- Produto: nome, categoria e endereço não podem ser nulos (`@NotNull`); código, quantidade, quantidade mínima e preço não podem ser negativos (`@PositiveOrZero`).
- Requisições inválidas são recusadas com `400 Bad Request`, antes de chegar ao banco.

**Frontend:**

- Os campos numéricos passam por uma função de conversão (`num`) que aceita vírgula decimal e troca texto vazio ou `NaN` por `0`, evitando enviar `null` para campos numéricos do backend.
- O ajuste de quantidade impede estoque negativo (`Math.max(0, ...)`).
- A categoria escolhida precisa existir; caso contrário a operação é interrompida com erro.
- [CONFIRMAR: validações do formulário em `add.tsx`, como campos obrigatórios e formato de preço.]

## 5. Mecanismos de feedback

- Indicador de carregamento (`ActivityIndicator`) enquanto os dados são buscados no servidor.
- Atualização imediata da tela após cada operação, pois o app recarrega os dados do servidor.
- Mensagens de erro quando a API falha ou recusa os dados. [CONFIRMAR: `Alert`/toast usado em cada tela.]
- Indicadores visuais de situação do estoque (status do produto e destaque dos itens que precisam de reposição).
- Logs de erro no console para depuração.

## 6. Principais decisões técnicas

| Decisão | Justificativa |
|---|---|
| **Spring Boot + Spring Data JPA** no backend | Permite montar uma API REST com validação e persistência com pouco código, e é a tecnologia já conhecida pelo aluno. |
| **Servidor como fonte única da verdade** | Os repositórios com armazenamento no aparelho foram substituídos pela API, evitando dados duplicados e divergentes entre app e banco. |
| **Camada `services/`** (`api`, `categoryService`, `productService`) | Isola toda comunicação HTTP em um só lugar e deixa as telas e o contexto independentes de URLs e de `fetch`. |
| **Funções de conversão `toProduct` / `toPayload`** no `ProductsContext` | O app usa `category` como texto e `location.column`; o backend usa objeto `category` e `address.columnName`. A tradução fica em um único ponto. |
| **`refresh()` após cada alteração**, em vez de atualizar o estado manualmente | Código mais simples e telas sempre consistentes com o banco, ao custo de uma requisição extra. |
| **Campo `column` renomeado para `columnName` no backend** | `column` é palavra reservada do SQL e impedia a criação da tabela `product`. |
| **URL da API em variável de ambiente** (`EXPO_PUBLIC_API_URL`) | Facilita trocar entre emulador, celular físico e produção sem alterar código. |
| **Credenciais e `.env` fora do Git** | Segurança: o repositório traz apenas arquivos `.env.example`. |
| **Uso de IA** | Assistente de IA (Claude) foi usado como apoio na integração, na depuração e na documentação; o código foi revisado e testado pelo aluno. |

## 7. Instruções para execução e teste

### Pré-requisitos

- JDK compatível com o `pom.xml` e Maven (ou o `mvnw` do projeto);
- Banco de dados configurado conforme `src/back-end/.env.example`;
- Node.js e npm;
- Expo Go no celular, ou um emulador Android/iOS.

### Backend

```bash
cd src/back-end/EstoqueFacil
# copie o .env.example para .env e preencha as credenciais do banco
./mvnw spring-boot:run
```

A API sobe em `http://localhost:8080`. As tabelas `category` e `product` são criadas automaticamente pelo Hibernate.

### Frontend

```bash
cd src/front-end/EstoqueFacil
npm install
# copie o .env.example para .env e ajuste a URL da API
npx expo start -c
```

Valor de `EXPO_PUBLIC_API_URL` conforme onde o app roda:

| Onde roda | URL |
|---|---|
| Emulador Android | `http://10.0.2.2:8080` |
| Simulador iOS | `http://localhost:8080` |
| Celular físico | `http://IP_DO_PC:8080` (mesma rede Wi-Fi) |

### Testando a API sem o app (Postman)

1. `POST /category/create`
   ```json
   { "name": "Eletrônicos", "description": "Produtos eletrônicos em geral" }
   ```
2. `POST /products/create`
   ```json
   {
     "code": 1001, "name": "Cabo USB-C 1m",
     "quantity": 50, "minimumQuantity": 10, "price": 29.90,
     "category": { "id": 1 },
     "address": { "street": "A", "columnName": "3", "bay": "2", "level": "1" }
   }
   ```
3. `GET /products/list`, depois `POST /products/update/1` e `DELETE /products/delete/1`.
4. Para ver a validação, envie `quantity: -5` ou `name: null` e confira o `400`.

