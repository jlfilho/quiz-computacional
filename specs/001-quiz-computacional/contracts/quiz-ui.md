# Contrato de Interface do Quiz

## Estado `question`

Exibe somente a questão atual, progresso, quatro alternativas selecionáveis e confirmação. A
confirmação sem seleção é bloqueada com orientação clara. A seleção pode mudar até a confirmação.

## Estado `feedback`

Após confirmação, exibe se a resposta está correta ou incorreta. Em caso de erro, destaca a
alternativa correta. As alternativas ficam bloqueadas. O único comando de navegação é avançar; não
há retorno.

## Estado `result`

Após a décima resposta confirmada, exibe acertos, erros e percentual de acertos. Exibe o comando de
reinício, que limpa a tentativa e retorna à primeira questão.

## Responsividade e acessibilidade básica

A página deve manter texto legível, controles acionáveis por toque e conteúdo sem rolagem horizontal
em larguras a partir de 320 px. Alternativas e comandos devem ser utilizáveis por teclado e ter nomes
acessíveis claros.
