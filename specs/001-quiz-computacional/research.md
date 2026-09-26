# Pesquisa Técnica: Quiz Computacional

## Carregamento das questões locais

**Decisão**: Manter as questões em `data/questions.json` e carregá-las com `fetch` a partir do mesmo
servidor HTTP(S) estático que entrega a página.

**Justificativa**: É a forma nativa e compatível de consumir JSON no navegador. Abrir a página pelo
protocolo `file://` pode bloquear o `fetch`; um servidor estático não cria backend de aplicação,
banco de dados nem autenticação.

**Alternativas consideradas**:

- Embutir as questões no JavaScript: rejeitada, pois viola o requisito de arquivo JSON local.
- Usar JSONP ou formato executável: rejeitada, pois deixa de ser JSON válido e adiciona risco.
- Implementar uma API: rejeitada, pois amplia o escopo e viola a restrição de não ter backend.

## Organização da aplicação

**Decisão**: Separar apresentação (`index.html` e `css/`), dados (`data/`) e lógica (`js/quiz.js`),
deixando `js/app.js` como adaptador entre interface e lógica.

**Justificativa**: A pontuação e os estados podem ser testados sem navegador, enquanto a interface
permanece simples e focada em renderizar os estados recebidos.

**Alternativas consideradas**:

- Concentrar o código em um script: rejeitada, pois dificulta manutenção e testes.
- Adotar framework frontend: rejeitada, pois não é necessário e contraria as restrições.

## Testes e validação

**Decisão**: Testar lógica pura com o executor nativo `node --test`, quando disponível, e validar o
fluxo completo no navegador pelo roteiro de `quickstart.md`.

**Justificativa**: Quatro alternativas, um gabarito, correção, pontuação e reinício são regras
objetivamente verificáveis sem dependências de teste.

**Alternativas consideradas**:

- Biblioteca de testes: rejeitada para manter o projeto mínimo.
- Apenas teste manual: rejeitada, pois regras de pontuação e validação devem ser automatizadas.
