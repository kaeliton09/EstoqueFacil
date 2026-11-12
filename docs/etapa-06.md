# Etapa 6 — Integração com API ou serviço externo

## 1. Serviço utilizado

**Open Products Facts**, com **Open Food Facts** como segunda fonte.

São bases de dados abertas e colaborativas de produtos, identificados pelo código de barras. O Open Products Facts cobre produtos em geral e o Open Food Facts cobre alimentos e bebidas; as duas usam a mesma API, com o mesmo formato de resposta.

- Site: <https://world.openproductsfacts.org> e <https://world.openfoodfacts.org>
- Acesso: público, **sem chave de API, token ou cadastro** para consulta.

**Por que esse serviço:** o Estoque Fácil cadastra produtos que têm código de barras. Consultar o código evita digitar o nome de cada produto e aproxima o app da proposta original (identificação por código de barras).

**Operações da etapa:**

- **Consulta de dados:** `GET` no serviço externo para buscar os dados do produto pelo código.
- **Envio de dados:** com os dados conferidos, o app envia o produto para o backend próprio (`POST /products/create`, Etapa 5).

## 2. Endereços (base URL)

| Serviço | Base URL |
|---|---|
| Open Products Facts (1ª tentativa) | `https://world.openproductsfacts.org` |
| Open Food Facts (2ª tentativa, se não encontrar) | `https://world.openfoodfacts.org` |

As URLs ficam como constantes em `src/services/openProductsFactsService.ts`.

## 3. Endpoint utilizado

| Método | Rota | Finalidade |
|---|---|---|
| `GET` | `/api/v2/product/{codigo}.json` | Consultar um produto pelo código de barras |

Parâmetro de query usado: `fields`, que limita a resposta aos campos necessários.

Exemplo de chamada:

```
GET https://world.openproductsfacts.org/api/v2/product/737628064502.json?fields=code,product_name,generic_name,brands,categories,image_front_url
```

Cabeçalhos enviados:

| Cabeçalho | Valor | Motivo |
|---|---|---|
| `Accept` | `application/json` | Pede a resposta em JSON |
| `User-Agent` | `EstoqueFacil/1.0 (projeto academico)` | Identifica o aplicativo ao serviço |

## 4. Dados enviados e recebidos

### Enviados

A consulta é um `GET`: não há corpo. O único dado enviado é o código de barras, na URL, depois de validado no app (somente dígitos, entre 8 e 14).

### Recebidos: produto encontrado

```json
{
  "code": "<codigo consultado>",
  "status": 1,
  "status_verbose": "<texto descritivo>",
  "product": {
    "product_name": "<nome do produto>",
    "generic_name": "<nome genérico, quando existir>",
    "brands": "<Marca A, Marca B>",
    "categories": "<Categoria 1, Categoria 2>",
    "image_front_url": "<url da imagem frontal, quando existir>"
  }
}
```

[CONFIRMAR: substitua o exemplo acima por uma resposta real, abrindo a URL no navegador com o código `737628064502`.]

### Recebidos: produto não encontrado

A API responde com `status: 0` (e costuma usar o código HTTP 404). O app trata os dois sinais como "não encontrado".

### Conversão para o formato do app

O serviço (`findByBarcode`) transforma a resposta em:

```ts
type ExternalProduct = {
  barcode: string;    // código consultado
  name: string;       // product_name (ou generic_name)
  brand: string;      // primeira marca de "brands"
  category: string;   // primeira categoria de "categories" (apenas informativa)
  imageUrl?: string;
};
```

O formulário usa o nome (no formato `Nome - Marca`). A categoria devolvida pela API **não** é aplicada, pois não corresponde às categorias cadastradas no backend; o usuário escolhe a categoria.

### Dados trocados com o backend próprio

Depois da consulta, o cadastro segue o contrato da Etapa 5. Mudança desta etapa: o `code` passou a ser **texto**.

```json
{
  "code": "737628064502",
  "name": "Nome - Marca",
  "quantity": 10,
  "minimumQuantity": 2,
  "price": 12.5,
  "category": { "id": 1 },
  "address": { "street": "A", "columnName": "1", "bay": "2", "level": "1" }
}
```

## 5. Fluxo de comunicação

1. O usuário digita o código na aba **Cadastrar** e toca em **Buscar dados do produto**.
2. `useBarcodeLookup.search()` muda o estado para `loading`.
3. `findByBarcode()` valida o código e chama o Open Products Facts, com limite de 10 segundos.
4. Se o produto **não existir** nessa base, o hook tenta o Open Food Facts. Qualquer outro erro (rede, timeout, resposta inválida) interrompe a busca.
5. O hook atualiza o estado (`success`, `empty` ou `error`) e a tela mostra o resultado.
6. Em caso de sucesso, o nome é preenchido; o usuário confere, escolhe a categoria, completa o formulário e cadastra.
7. O app envia o produto ao backend (`POST /products/create`), que valida e grava no banco, e recarrega a lista.

```text
Tela → hook (estados) → service (HTTP) → Open Products Facts → (não achou) → Open Food Facts
  └→ usuário confere e confirma → ProductsContext → API própria (Spring Boot) → banco de dados
```

## 6. Tratamento dos estados

| Estado | Quando ocorre | Como o app responde |
|---|---|---|
| **Carregamento** | Consulta em andamento | Indicador no botão, texto "Buscando..." e botão desabilitado |
| **Sucesso** | Produto encontrado | Nome preenchido e mensagem "Produto encontrado". Se a base não tiver nome, avisa para preencher manualmente |
| **Ausência de dados** | Código não existe nas duas bases | "Produto não encontrado. Preencha os dados manualmente." O cadastro manual continua disponível |
| **Erro** | Sem internet, timeout, falha do servidor ou código inválido | Mensagem explicando o problema (conexão ou "código deve ter entre 8 e 14 dígitos") |

Detalhes de implementação:

- Os estados são representados por um tipo único (`LookupState`) no hook `useBarcodeLookup`.
- O resultado da busca é descartado quando o usuário altera o código.
- As mensagens usam `accessibilityLiveRegion`, para serem anunciadas por leitores de tela.
- No cadastro, o botão mostra o carregamento e impede envio duplo; se o servidor falhar, o formulário **não** é limpo e o usuário é avisado.

## 7. Configuração do serviço

- **Não há credenciais:** a leitura do serviço é pública e nada de sensível entra no repositório.
- O aparelho ou emulador precisa de **acesso à internet**.
- Para trocar o serviço ou a ordem de consulta, edite `OPEN_PRODUCTS_FACTS`, `OPEN_FOOD_FACTS` e `SOURCES` (em `useBarcodeLookup.ts`).
- A URL do backend próprio continua em `EXPO_PUBLIC_API_URL` (`.env`, fora do Git; veja `.env.example`).

### Atualização do banco

O campo `code` do produto mudou de `int` para texto. O Hibernate (`ddl-auto=update`) **não altera colunas existentes**. Em um banco já criado, rode uma vez (PostgreSQL):

```sql
ALTER TABLE product ALTER COLUMN code TYPE varchar(20) USING code::varchar;
```

Em desenvolvimento também é possível apagar a tabela `product`; ela é recriada ao iniciar o backend. Em um banco novo nada precisa ser feito.

## 8. Instruções para executar e testar

1. Suba o backend (`./mvnw spring-boot:run` em `src/back-end/EstoqueFacil`) e o app (`npx expo start -c` em `src/front-end/EstoqueFacil`), como no README.
2. **Testar a API fora do app:** abra no navegador
   `https://world.openproductsfacts.org/api/v2/product/737628064502.json`
3. **Testar no app:**

| Para ver | Faça |
|---|---|
| Sucesso | Digite `737628064502` e toque em **Buscar dados do produto** |
| Sucesso (Open Food Facts) | Digite `3017624010701`, que não está na base de produtos gerais e cai na segunda fonte |
| Ausência de dados | Digite um código inventado, como `1234567890123` |
| Erro de rede | Ligue o modo avião e busque |
| Código inválido | Digite menos de 8 dígitos |
| Envio | Complete o formulário, cadastre e confira o produto na aba **Itens** |

[CONFIRMAR: ajuste a tabela se algum código de teste se comportar de outra forma no seu teste.]

## 9. Principais decisões técnicas

| Decisão | Justificativa |
|---|---|
| Chamar o serviço direto do app | A leitura não exige chave; passar pelo backend só adicionaria latência. Se um serviço com token for usado no futuro, a chamada deve passar pelo backend. |
| Open Products Facts + Open Food Facts | A base de produtos gerais é menor; a de alimentos aumenta a chance de achar o produto sem mudar o formato dos dados. |
| Camada própria (`service` + `hook`) | A tela não conhece URLs nem `fetch`, e os quatro estados ficam num só lugar. |
| Timeout de 10 s com `AbortController` | O `fetch` do React Native não tem timeout; sem ele a tela poderia ficar carregando indefinidamente. |
| `fields` na consulta | Reduz o tamanho da resposta, importante em rede móvel. |
| Não aplicar a categoria da API | Não corresponde às categorias do backend, e aplicar causaria erro ao cadastrar. |
| Usuário confirma os dados | As bases são colaborativas e podem ter erros; a consulta preenche, mas não cadastra sozinha. |
| `code` como `String` | EAN-13 não cabe em `int` e zeros à esquerda se perdem em número. |
| Bloqueio de código duplicado no backend (`409`) | Mantém a integridade dos dados mesmo se o app falhar na verificação. |
| Uso de IA | O assistente Claude apoiou a integração, a depuração e a documentação; o código foi revisado e testado pelo aluno. |

## 10. Limitações

- Cobertura incompleta, principalmente para produtos não alimentícios e marcas locais.
- Apenas nome e marca são aproveitados; categoria, quantidade, preço e localização são manuais.
- A consulta exige internet e depende da disponibilidade do serviço público.
- A leitura do código pela câmera não foi implementada; o código é digitado.
