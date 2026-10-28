# Etapa 4 — Persistência local de dados

## 1. Mecanismo de persistência

**AsyncStorage** (`@react-native-async-storage/async-storage`), um armazenamento assíncrono de pares chave/valor mantido no aparelho. Os objetos são convertidos para texto com `JSON.stringify` ao gravar e reconstruídos com `JSON.parse` ao ler.

## 2. Justificativa da escolha

- É o mecanismo de armazenamento local mais direto no ecossistema React Native/Expo e funciona no Expo Go sem configuração nativa.
- O volume de dados de um estoque pequeno (centenas de produtos) cabe com folga nesse formato.
- O acesso aos dados ficou isolado em uma camada própria (`src/storage/`). As telas não conhecem o AsyncStorage, o que permite trocar por SQLite ou pela API do backend em etapas futuras sem reescrever a interface.
- **Alternativa considerada:** `expo-sqlite`. É mais adequado a grandes volumes e consultas complexas, mas exigiria SQL e mais código de acesso, sem ganho relevante para o escopo atual.

## 3. Estrutura dos dados armazenados

| Chave | Conteúdo |
|---|---|
| `@estoquefacil:products` | Lista de produtos |
| `@estoquefacil:categories` | Lista de nomes de categorias |
| `@estoquefacil:seeded` | Marca de que os dados de exemplo já foram gravados (usada apenas se a opção de exemplo estiver ativa) |

Exemplo de um produto em `@estoquefacil:products`:

```json
{
  "id": "1729512345678-k3x9a",
  "name": "Arroz Branco 5kg",
  "code": "7891000100103",
  "category": "Mercearia",
  "quantity": 42,
  "minQuantity": 10,
  "price": 28.9,
  "location": { "street": "A", "column": "1", "bay": "2", "level": "1" }
}
```

Categorias: `["Bebidas", "Mercearia", "Limpeza", "Higiene"]` (as quatro padrão são gravadas na primeira abertura; as criadas pelo usuário são acrescentadas).

## 4. Operações de persistência implementadas

Implementadas em `src/storage/productRepository.ts` e `src/storage/categoryRepository.ts`, e chamadas por `src/context/ProductsContext.tsx`.

| Operação | Função | Disparada por |
|---|---|---|
| Criar e armazenar produto | `productRepository.create` | `addProduct`, ao cadastrar produto |
| Recuperar produtos | `productRepository.getAll` | `useEffect` do provider, ao abrir o app |
| Atualizar produto | `productRepository.update` | `adjustQuantity`, ao dar baixa ou adicionar quantidade |
| Remover produto | `productRepository.remove` | `removeProduct`, ao excluir item |
| Criar categoria | `categoryRepository.create` | `addCategory`, no cadastro de produto |
| Recuperar categorias | `categoryRepository.getAll` | `useEffect` do provider, ao abrir o app |

Detalhes de implementação:

- Cada ação atualiza o estado da tela imediatamente e grava no aparelho em seguida.
- As escritas passam por uma **fila** (`enqueue` em `storage.ts`), evitando que duas ações rápidas seguidas se sobrescrevam.
- Se a leitura falhar ou o conteúdo estiver corrompido, `readJSON` devolve um valor padrão em vez de derrubar o app. Falhas de gravação são registradas no console.
- Ao abrir, o app mostra um indicador de carregamento até os dados serem lidos, evitando exibir listas vazias por engano.
- Por padrão o app **inicia vazio**. Para iniciar com produtos de exemplo na primeira abertura, altere `SEED_ON_FIRST_LAUNCH` para `true` em `ProductsContext.tsx`.

## 5. Telas que utilizam os dados persistidos

| Tela | Arquivo | Uso |
|---|---|---|
| Home | `src/app/(tabs)/index.tsx` | Exibe totais, valor em estoque, unidades por categoria e itens com estoque baixo |
| Itens | `src/app/(tabs)/search.tsx` | Lista, busca e filtra os produtos |
| Cadastrar | `src/app/(tabs)/add.tsx` | Cria produtos e categorias |
| Gerenciar item | `src/app/produto/[id].tsx` | Dá baixa, adiciona quantidade e exclui |

## 6. Instruções para execução e teste

```bash
cd src/front-end/EstoqueFacil
npm install
npx expo start -c
```

Abra no Expo Go ou em um emulador. Em seguida siga o procedimento da seção 7.

## 7. Procedimento para verificar a persistência

1. Na aba **Cadastrar**, crie uma categoria nova (chip "+ Nova categoria") e cadastre um produto usando essa categoria.
2. Na aba **Itens**, toque no produto, use **Dar baixa** (ex.: 2 unidades) e depois **Adicionar** (ex.: 5 unidades). Anote a quantidade final.
3. Cadastre um segundo produto e **exclua-o** pela tela de gerenciamento.
4. **Feche o aplicativo por completo** (remova-o da lista de apps recentes; no Expo Go, feche também o projeto).
5. Reabra o aplicativo e confirme:
   - o primeiro produto continua na lista, com a quantidade anotada no passo 2;
   - a categoria criada continua disponível no cadastro;
   - o produto excluído não reapareceu;
   - a Home reflete os mesmos totais.
6. Para repetir o teste do zero, limpe os dados do aplicativo nas configurações do aparelho.

**Evidências:** _(inserir capturas de tela, se desejar, em `docs/img/`)_

## 8. Alterações em relação às etapas anteriores

Nesta etapa a interface foi redesenhada (novo tema verde, novos componentes e telas) e foram adicionadas a tela de cadastro de usuário, a tela de gerenciamento de item e a criação de categorias. A estrutura anterior de pastas (`components/ui`, `components/product`, `screens/`, `mocks/`) foi substituída por `components/`, `data/`, `storage/`, `context/`, `types/` e `utils/`. Os produtos deixaram de ser dados fixos e passaram a ser gerenciados por um estado compartilhado (`ProductsContext`) com persistência.

## 9. Limitações

- O cadastro de usuário e o login ainda são apenas interface (sem armazenamento de contas nem sessão). Senhas não são guardadas.
- O AsyncStorage não é criptografado; por isso nenhum dado sensível é gravado nele.
- Fotos de produto e leitura de código de barras pela câmera ainda não estão implementadas.


