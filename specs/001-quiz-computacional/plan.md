# Plano de Implementação: Quiz Computacional

**Branch**: `001-quiz-computacional` | **Data**: 2026-09-26 | **Spec**: [spec.md](spec.md)

**Entrada**: Especificação da funcionalidade em `specs/001-quiz-computacional/spec.md`

## Resumo

Aplicação web educacional estática para responder 10 questões de Computação, uma por vez, com
feedback imediato, pontuação automática, resultado final e reinício. Usará HTML5 para apresentação,
CSS3 responsivo, JavaScript puro para a lógica e um arquivo JSON local para as questões. Não haverá
frameworks, backend, banco de dados, autenticação ou armazenamento de histórico.

## Contexto Técnico

**Linguagem/Versão**: HTML5, CSS3 e JavaScript ES2022+ (sem framework)

**Dependências principais**: Nenhuma dependência de execução; APIs nativas do navegador (`fetch`,
DOM e módulos JavaScript)

**Armazenamento**: `data/questions.json` somente leitura; não há persistência da tentativa

**Testes**: Testes unitários da lógica pura com `node --test`, quando Node.js LTS estiver disponível;
validação manual guiada no navegador conforme `quickstart.md`

**Plataforma-alvo**: Navegadores modernos em desktop e smartphone, servidos como arquivos estáticos
por HTTP(S)

**Tipo de projeto**: Aplicação web estática de página única

**Metas de desempenho**: Exibir a primeira questão em até 1 segundo após o carregamento do arquivo
local de questões em condições normais; manter seleção, confirmação e avanço imediatos

**Restrições**: Sem frameworks frontend, backend, banco de dados, autenticação, cadastro ou
dependências de execução; o JSON deve ser servido pelo mesmo host estático para carregamento seguro
no navegador

**Escala/Escopo**: Uma página, 10 questões iniciais, uma tentativa em memória por estudante e layout
responsivo para telas de 320 px ou maiores

## Verificação da Constituição

*GATE: aprovado antes da pesquisa e reavaliado após o desenho.*

| Princípio | Evidência do plano | Situação |
|-----------|--------------------|----------|
| Interface simples e adequada | Fluxo sequencial de uma questão por vez, sem recursos extras. | Aprovado |
| Código de fácil manutenção | Separação explícita entre apresentação, dados e lógica de domínio. | Aprovado |
| Quatro alternativas e uma correta | Contrato JSON e validação exigem quatro alternativas e um gabarito. | Aprovado |
| Feedback e pontuação automáticos | Estados e contratos definem confirmação, feedback e resultados. | Aprovado |
| Dependências mínimas | Somente APIs nativas; nenhum framework. | Aprovado |
| Verificabilidade objetiva | Testes unitários e cenários de aceitação documentados. | Aprovado |

**Reavaliação pós-desenho**: Aprovado. Os artefatos de dados e interface mantêm as regras da
constituição sem exceções nem complexidade adicional.

## Estrutura do Projeto

### Documentação desta funcionalidade

```text
specs/001-quiz-computacional/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── questions-json.md
│   └── quiz-ui.md
└── tasks.md                 # Gerado posteriormente por $speckit-tasks
```

### Código-fonte (raiz do repositório)

```text
index.html                   # Estrutura e regiões de apresentação
css/
└── styles.css               # Estilos responsivos
data/
└── questions.json           # Dez questões e gabaritos locais
js/
├── app.js                   # Carregamento, renderização e eventos de interface
└── quiz.js                  # Estado, validações, correção e pontuação sem DOM
tests/
└── quiz.test.js             # Testes da lógica pura
```

**Decisão de estrutura**: `index.html` e `css/styles.css` são a camada de apresentação;
`data/questions.json` é a camada de dados; `js/quiz.js` contém a lógica de domínio independente do
DOM; `js/app.js` orquestra carregamento, renderização e eventos.

## Acompanhamento de Complexidade

Nenhuma violação ou justificativa de complexidade é necessária.
