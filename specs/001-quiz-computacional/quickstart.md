# Guia de Validação: Quiz Computacional

## Pré-requisitos

- Navegador moderno em desktop ou smartphone.
- Um servidor HTTP estático para servir a raiz do projeto. Não use `file://`, pois navegadores podem
  bloquear o carregamento de `data/questions.json` nesse modo.
- Opcionalmente, Node.js LTS para executar os testes da lógica.

## Executar localmente

1. Sirva a raiz do projeto com qualquer servidor estático simples.
2. Abra a URL HTTP local exibida pelo servidor em um navegador e inicie um cronômetro ao confirmar a
   abertura da página.
3. Confirme que a primeira questão é exibida com exatamente quatro alternativas em até 30 segundos.

## Validar a lógica

Se Node.js LTS estiver disponível, execute:

```powershell
node --test tests/quiz.test.js
```

Os testes devem verificar validação de questões, confirmação, bloqueio após confirmação, contagens,
percentual, avanço sequencial e reinício.

## Cenário de aceitação completo

1. Inicie o quiz e confirme que não há cadastro ou autenticação.
2. Escolha uma alternativa, troque-a antes de confirmar e confirme que a última seleção é usada.
3. Confirme uma resposta correta e verifique o feedback antes de avançar.
4. Confirme uma resposta incorreta e verifique que a alternativa correta é destacada.
5. Tente confirmar sem seleção, avançar antes do feedback e retornar a uma questão anterior; as três
   ações devem ser bloqueadas ou indisponíveis conforme o contrato de interface.
6. Conclua as 10 questões. Confira que acertos mais erros é igual a 10 e que o percentual está
   correto.
7. Reinicie o quiz e confirme que a primeira questão é exibida sem dados da tentativa anterior.
8. Repita em uma largura de 320 px e em desktop, sem rolagem horizontal e com controles utilizáveis.
9. Simule indisponibilidade ou invalidez de `data/questions.json` e confirme que o quiz não inicia e
   que a mensagem informa a falha e orienta a recarregar a página.

## Observações de Validação

- 2026-09-26: `node --test tests/quiz.test.js` executado com 8 testes aprovados.
- 2026-09-26: Fluxo no navegador validado por HTTP local: feedback incorreto destacou o gabarito,
  uma tentativa concluída apresentou 9 acertos, 1 erro e 90%, e o reinício retornou à questão 1.
- 2026-09-26: Em viewport de 320 px, a página apresentou quatro alternativas e largura de conteúdo
  igual à largura da tela, sem rolagem horizontal.
- 2026-09-26: A validação de questões inválidas é coberta pelos testes unitários; a interface trata
  falhas de carregamento exibindo orientação para recarregar a página.
