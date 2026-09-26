# Tarefas: Quiz Computacional

**Entrada**: Artefatos de desenho em `specs/001-quiz-computacional/`

**Pré-requisitos**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, contratos e `quickstart.md`

**Testes**: Testes unitários são obrigatórios para a lógica pura do quiz, conforme o plano e a
constituição. Os cenários completos no navegador seguem `quickstart.md`.

**Organização**: As tarefas são agrupadas por história de usuário para viabilizar entregas incrementais.

## Fase 1: Preparação

**Propósito**: Criar a estrutura mínima e concluir a revisão de requisitos antes da implementação.

- [X] T001 Revisar e registrar achados de qualidade de requisitos em `specs/001-quiz-computacional/checklists/quiz-requisitos.md` sem alterar marcadores de propriedade do revisor
- [X] T002 Criar os diretórios e arquivos vazios definidos no plano: `index.html`, `css/styles.css`, `data/questions.json`, `js/app.js`, `js/quiz.js` e `tests/quiz.test.js`
- [X] T003 [P] Criar a estrutura base acessível da página, incluindo viewport e regiões de título, quiz e mensagens, em `index.html`
- [X] T004 [P] Definir estilos-base, tipografia legível e variáveis visuais mínimas em `css/styles.css`

---

## Fase 2: Fundamentos Bloqueadores

**Propósito**: Disponibilizar dados válidos e a lógica independente de interface exigida por todas as histórias.

- [X] T005 Criar 10 questões de conhecimentos básicos de Computação em `data/questions.json`, cada uma com `id` único, enunciado não vazio, exatamente quatro alternativas não vazias e `correctIndex` inteiro entre 0 e 3
- [X] T006 Escrever testes de validação do conjunto de questões em `tests/quiz.test.js`, cobrindo exatamente 10 questões, quatro alternativas, `id` único e um `correctIndex` válido por questão
- [X] T007 Implementar validação do conjunto carregado em `js/quiz.js`, recusando qualquer questão que não tenha quatro alternativas ou um único gabarito válido
- [X] T008 Escrever testes de criação de tentativa e transições de estado em `tests/quiz.test.js`, cobrindo os estados `question`, `feedback` e `result`
- [X] T009 Implementar em `js/quiz.js` a criação de tentativa em memória com `currentQuestionIndex`, `selectedIndex`, respostas confirmadas, contadores e estado inicial `question`

**Checkpoint**: Dados inválidos não iniciam o quiz e a lógica pura possui uma tentativa inicial testável.

---

## Fase 3: História de Usuário 1 — Responder uma questão com feedback (Prioridade: P1) 🎯 MVP

**Objetivo**: O estudante visualiza uma questão, muda a seleção se desejar, confirma e recebe
feedback antes de avançar sem retorno.

**Teste independente**: Iniciar o quiz, responder uma questão correta e uma incorreta, verificar o
feedback e avançar somente após confirmar.

- [X] T010 [P] [US1] Escrever testes de seleção, troca antes da confirmação, bloqueio sem seleção e confirmação imutável em `tests/quiz.test.js`
- [X] T011 [US1] Implementar em `js/quiz.js` seleção e troca de alternativa no estado `question`, bloqueando confirmação sem `selectedIndex`
- [X] T012 [US1] Implementar em `js/quiz.js` a confirmação que calcula `isCorrect`, registra uma resposta, bloqueia alterações e muda o estado para `feedback`
- [X] T013 [P] [US1] Adicionar contêineres semânticos para progresso, enunciado, quatro alternativas, confirmação, feedback e avanço em `index.html`
- [X] T014 [P] [US1] Estilizar alternativas selecionadas, estados bloqueados e feedback correto/incorreto com destaque da resposta correta em `css/styles.css`
- [X] T015 [US1] Implementar em `js/app.js` o carregamento HTTP e validação de `data/questions.json`; em caso de falha, informar que o quiz não pode iniciar e orientar a recarregar a página
- [X] T016 [US1] Implementar em `js/app.js` a renderização do estado `question`, eventos de seleção e confirmação, e feedback que destaca o gabarito quando a resposta estiver incorreta
- [X] T017 [US1] Implementar em `js/app.js` o comando de avanço após `feedback`, sem comando de retorno e sem permitir alteração de resposta já confirmada

**Checkpoint**: A história P1 funciona com uma questão por vez, quatro alternativas, feedback
imediato e navegação somente para frente.

---

## Fase 4: História de Usuário 2 — Consultar o resultado final (Prioridade: P2)

**Objetivo**: Após a décima resposta, o estudante vê acertos, erros e percentual corretos.

**Teste independente**: Concluir tentativas com 0, 1, 7 e 10 acertos e conferir que acertos + erros
é igual a 10 e o percentual corresponde às respostas.

- [X] T018 [P] [US2] Escrever testes de pontuação para 0, 1, 7 e 10 acertos em `tests/quiz.test.js`
- [X] T019 [US2] Implementar em `js/quiz.js` contagens, percentual inteiro e transição de `feedback` para `result` após a décima resposta confirmada
- [X] T020 [P] [US2] Adicionar região semântica para acertos, erros e percentual na tela de resultado em `index.html`
- [X] T021 [P] [US2] Estilizar a tela de resultado e seus indicadores de desempenho em `css/styles.css`
- [X] T022 [US2] Implementar em `js/app.js` a renderização do estado `result` com os três indicadores calculados

**Checkpoint**: A história P2 exibe resultados objetivos e corretos ao fim das 10 questões.

---

## Fase 5: História de Usuário 3 — Reiniciar a prática (Prioridade: P3)

**Objetivo**: O estudante inicia uma nova tentativa a partir do resultado, sem conservar respostas ou pontuação.

**Teste independente**: Concluir uma tentativa, reiniciar e verificar o índice 0, contadores zerados e
nenhuma resposta confirmada.

- [X] T023 [P] [US3] Escrever testes de reinício que limpam respostas, acertos, erros, seleção e retornam ao índice 0 em `tests/quiz.test.js`
- [X] T024 [US3] Implementar em `js/quiz.js` a transição `result` para uma nova tentativa no estado `question`, com todos os dados da tentativa anterior limpos
- [X] T025 [P] [US3] Adicionar o comando de reinício com nome acessível na região de resultado em `index.html`
- [X] T026 [P] [US3] Estilizar o comando de reinício com área de toque adequada em `css/styles.css`
- [X] T027 [US3] Implementar em `js/app.js` o evento de reinício e a renderização da primeira questão da nova tentativa

**Checkpoint**: A história P3 reinicia o quiz sem autenticação, persistência ou dados residuais.

---

## Fase 6: Polimento e Verificação Transversal

**Propósito**: Garantir responsividade, acessibilidade e validação final dos requisitos.

- [X] T028 [P] Melhorar estilos responsivos para larguras a partir de 320 px, sem rolagem horizontal, em `css/styles.css`
- [X] T029 [P] Revisar estrutura semântica, ordem de foco e nomes acessíveis de controles em `index.html`
- [X] T030 Executar e ajustar os testes unitários de `tests/quiz.test.js` com `node --test tests/quiz.test.js`
- [X] T031 Executar todos os cenários de aceitação do navegador descritos em `specs/001-quiz-computacional/quickstart.md`
- [X] T032 Atualizar observações de validação e pendências encontradas em `specs/001-quiz-computacional/quickstart.md`

---

## Dependências e Ordem de Execução

### Dependências por fase

- **Preparação (Fase 1)**: pode iniciar imediatamente.
- **Fundamentos (Fase 2)**: depende de T002 e bloqueia as histórias de usuário.
- **US1 (Fase 3)**: depende de T005–T009; é o MVP.
- **US2 (Fase 4)**: depende da confirmação de resposta da US1 e da lógica de pontuação.
- **US3 (Fase 5)**: depende da tela de resultado da US2.
- **Polimento (Fase 6)**: depende das histórias desejadas concluídas.

### Ordem das histórias

`Fundamentos → US1 (P1) → US2 (P2) → US3 (P3) → Polimento`

## Oportunidades de Paralelismo

- T003 e T004 podem ocorrer em paralelo após a criação da estrutura.
- T006 e T008 são sequenciais, pois ambos alteram `tests/quiz.test.js`.
- Em cada história, as tarefas marcadas com `[P]` trabalham em arquivos separados do núcleo da
  lógica e podem ser executadas em paralelo após suas dependências.
- T028 e T029 podem ser realizados em paralelo após as funcionalidades principais.

## Estratégia de Implementação

### MVP primeiro

1. Concluir Fases 1 e 2.
2. Concluir US1 e validar o checkpoint da Fase 3.
3. Demonstrar o ciclo de pergunta, confirmação, feedback e avanço antes de adicionar resultados.

### Entrega incremental

1. Acrescentar US2 para concluir o resultado e validar a pontuação.
2. Acrescentar US3 para permitir uma nova tentativa.
3. Concluir a responsividade, acessibilidade e os cenários do quickstart.

## Observações

- Todas as tarefas seguem o formato obrigatório de checkbox, ID, marcador opcional de paralelismo,
  rótulo de história quando aplicável e caminho de arquivo.
- A aplicação continua sem framework, backend, banco de dados ou autenticação.
