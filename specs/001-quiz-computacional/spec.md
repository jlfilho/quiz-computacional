# Especificação da Funcionalidade: Quiz Computacional

**Branch da Funcionalidade**: `001-quiz-computacional`

**Criada em**: 2026-09-26

**Status**: Rascunho

**Entrada**: Descrição do usuário: "Desenvolver uma aplicação educacional chamada Quiz
Computacional para estudantes praticarem conhecimentos básicos de Computação por meio de questões
de múltipla escolha."

## Clarificações

### Sessão 2026-09-26

- P: Quando o estudante errar, o feedback deve indicar qual é a alternativa correta? → R: Informar
  que errou e destacar a alternativa correta.
- P: O estudante pode voltar para uma questão anterior durante a tentativa? → R: Navegação apenas
  para a próxima questão; não há retorno.
- P: Antes de confirmar a resposta, o estudante pode trocar a alternativa selecionada? → R: Pode
  trocar a alternativa até confirmar.

## Cenários de Usuário e Testes *(obrigatório)*

### História de Usuário 1 - Responder uma questão com feedback (Prioridade: P1)

Como estudante, quero visualizar uma questão por vez, escolher uma alternativa e confirmar minha
resposta para saber imediatamente se acertei ou errei.

**Por que esta prioridade**: Este é o ciclo central de aprendizagem do quiz e entrega valor mesmo
antes de haver uma tela final de resultados.

**Teste independente**: Pode ser testado iniciando o quiz, respondendo a uma questão e verificando
o feedback exibido antes do avanço para a próxima questão.

**Cenários de aceitação**:

1. **Dado** que o estudante iniciou um novo quiz, **Quando** a primeira questão for apresentada,
   **Então** ele verá apenas essa questão, seu enunciado e exatamente quatro alternativas.
2. **Dado** que uma questão está sendo exibida, **Quando** o estudante selecionar uma alternativa e
   confirmar a resposta, **Então** a aplicação informará se a resposta está correta ou incorreta e,
   se estiver incorreta, destacará a alternativa correta.
3. **Dado** que o estudante selecionou uma alternativa sem confirmá-la, **Quando** ele selecionar
   outra alternativa, **Então** a nova seleção substituirá a anterior até a confirmação.
4. **Dado** que o feedback de uma resposta foi exibido, **Quando** o estudante optar por avançar,
   **Então** a próxima questão será apresentada sem que a resposta anterior possa ser alterada ou
   que seja possível retornar a ela.

---

### História de Usuário 2 - Consultar o resultado final (Prioridade: P2)

Como estudante, quero ver meu desempenho após responder todas as questões para entender o resultado
da minha prática.

**Por que esta prioridade**: O resultado consolida a prática e permite que o estudante interprete
seu desempenho.

**Teste independente**: Pode ser testado concluindo as 10 questões com uma combinação conhecida de
respostas corretas e incorretas e conferindo os três indicadores apresentados.

**Cenários de aceitação**:

1. **Dado** que o estudante confirmou a resposta da décima questão, **Quando** ele concluir o quiz,
   **Então** verá a quantidade de acertos, a quantidade de erros e o percentual de acertos.
2. **Dado** que o estudante acertou 7 das 10 questões, **Quando** o resultado for apresentado,
   **Então** os indicadores mostrarão 7 acertos, 3 erros e 70% de acertos.

---

### História de Usuário 3 - Reiniciar a prática (Prioridade: P3)

Como estudante, quero reiniciar o quiz depois de ver o resultado para praticar novamente sem criar
uma conta.

**Por que esta prioridade**: Permite repetir o exercício, mantendo a primeira versão simples e sem
cadastro.

**Teste independente**: Pode ser testado a partir da tela de resultado, acionando o reinício e
confirmando que uma nova tentativa começa na primeira questão com pontuação zerada.

**Cenários de aceitação**:

1. **Dado** que o resultado final está visível, **Quando** o estudante selecionar reiniciar,
   **Então** uma nova tentativa começará na primeira questão.
2. **Dado** que o estudante reiniciou o quiz, **Quando** a primeira questão for exibida,
   **Então** não haverá respostas, acertos ou erros registrados da tentativa anterior.

### Casos Limite

- O estudante tenta confirmar uma questão sem selecionar uma alternativa.
- O estudante troca a alternativa selecionada antes de confirmar a resposta.
- O estudante tenta avançar antes de confirmar a resposta e receber o feedback.
- O estudante tenta retornar a uma questão já respondida.
- A pontuação precisa ser apresentada corretamente para 0, 1 e 10 acertos.
- Uma questão configurada com número diferente de quatro alternativas, ou sem exatamente uma
  alternativa correta, não pode ser disponibilizada no quiz.
- O estudante reinicia o quiz após qualquer resultado, inclusive 0% ou 100% de acertos.

## Requisitos *(obrigatório)*

### Requisitos Funcionais

- **RF-001**: A aplicação DEVE permitir que um estudante inicie um quiz sem cadastro ou
  autenticação.
- **RF-002**: O quiz inicial DEVE conter exatamente 10 questões de conhecimentos básicos de
  Computação.
- **RF-003**: A aplicação DEVE apresentar uma única questão por vez, incluindo seu enunciado.
- **RF-004**: Cada questão DEVE apresentar exatamente quatro alternativas de resposta.
- **RF-005**: Cada questão DEVE ter exatamente uma alternativa correta.
- **RF-006**: A aplicação DEVE permitir que o estudante selecione uma alternativa e confirme sua
  resposta, podendo alterar a alternativa selecionada até a confirmação.
- **RF-007**: A aplicação NÃO DEVE permitir a confirmação de uma resposta sem alternativa
  selecionada.
- **RF-008**: Após a confirmação, a aplicação DEVE informar se a resposta está correta ou incorreta
  antes de permitir o avanço para a próxima questão e, quando estiver incorreta, destacar a
  alternativa correta.
- **RF-009**: Após a confirmação, a resposta da questão atual NÃO DEVE poder ser alterada.
- **RF-010**: A aplicação DEVE calcular automaticamente os acertos, erros e percentual de acertos da
  tentativa.
- **RF-011**: Após a confirmação da décima questão, a aplicação DEVE apresentar a quantidade de
  acertos, a quantidade de erros e o percentual de acertos.
- **RF-012**: A soma de acertos e erros DEVE ser igual a 10 ao final de uma tentativa concluída.
- **RF-013**: A aplicação DEVE permitir que o estudante reinicie o quiz a partir do resultado final,
  iniciando uma nova tentativa sem manter a pontuação anterior.
- **RF-014**: A aplicação DEVE impedir que questões sem exatamente quatro alternativas ou sem
  exatamente uma alternativa correta sejam usadas no quiz.
- **RF-015**: Durante uma tentativa, a aplicação DEVE permitir somente o avanço sequencial para a
  próxima questão após a confirmação; ela NÃO DEVE permitir retornar a questões anteriores.
- **RF-016**: Se as questões não puderem ser carregadas ou forem inválidas, a aplicação DEVE informar
  que o quiz não pode ser iniciado e orientar o estudante a recarregar a página.

### Entidades Principais

- **Questão**: Item de aprendizagem com enunciado, quatro alternativas e a identificação de uma
  única alternativa correta.
- **Alternativa**: Uma das quatro respostas possíveis de uma questão; pode ser a única alternativa
  correta.
- **Tentativa de quiz**: Conjunto de respostas do estudante para as 10 questões e seus resultados
  calculados.
- **Resposta**: Alternativa selecionada e confirmada pelo estudante para uma questão, com seu
  resultado de correção.

## Critérios de Sucesso *(obrigatório)*

### Resultados Mensuráveis

- **CS-001**: Em um teste de aceitação, um estudante consegue iniciar o quiz e chegar à primeira
  questão em até 30 segundos, sem fornecer dados pessoais.
- **CS-002**: Em uma tentativa completa, o estudante consegue responder e confirmar exatamente 10
  questões, recebendo feedback após cada confirmação e a alternativa correta sempre que errar.
- **CS-003**: Para qualquer combinação de 0 a 10 respostas corretas, os acertos, erros e percentual
  exibidos correspondem exatamente às respostas confirmadas.
- **CS-004**: Em testes de aceitação, 100% das questões disponibilizadas têm quatro alternativas e
  exatamente uma correta.
- **CS-005**: Em um teste de aceitação, o estudante consegue reiniciar uma tentativa concluída e
  iniciar uma nova tentativa sem dados de resultado da anterior.

## Premissas

- A primeira versão atende a um único estudante por tentativa, sem perfis, cadastro, autenticação ou
  armazenamento de histórico.
- O conjunto inicial de 10 questões é disponibilizado pela própria aplicação e permanece o mesmo
  durante uma tentativa.
- O percentual de acertos é calculado sobre as 10 questões e exibido como porcentagem inteira.
- O conteúdo das questões usa linguagem adequada a estudantes com conhecimentos básicos de
  Computação.
- Recursos como cronômetro, ranking, dicas, revisão de respostas e criação de questões ficam fora do
  escopo desta primeira versão.
