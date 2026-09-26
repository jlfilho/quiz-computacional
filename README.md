# Quiz Computacional

Aplicação web educacional para praticar conhecimentos básicos de Computação por meio de questões de
múltipla escolha.

## Recursos

- 10 questões apresentadas uma por vez;
- exatamente quatro alternativas por questão e uma única resposta correta;
- possibilidade de trocar a alternativa antes de confirmar;
- feedback imediato após cada resposta, com destaque do gabarito em caso de erro;
- avanço sequencial, sem retorno a questões anteriores;
- resultado final com acertos, erros e percentual;
- reinício de uma nova tentativa sem manter dados anteriores;
- interface responsiva para desktop e smartphone.

## Tecnologias

- HTML5
- CSS3
- JavaScript puro (ES Modules)
- JSON local para as questões

Não há framework frontend, backend, banco de dados, cadastro ou autenticação nesta versão.

## Executar localmente

Como o navegador carrega as questões de um arquivo JSON, a aplicação precisa ser servida por HTTP.
Não abra o `index.html` diretamente por `file://`.

Na raiz do projeto, execute um servidor estático simples. Com Python:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Depois, abra [http://127.0.0.1:8765](http://127.0.0.1:8765) no navegador.

## Publicação no GitHub Pages

O repositório inclui um workflow que executa os testes e publica automaticamente a versão da branch
`main` no GitHub Pages.

Na primeira publicação, abra **Settings → Pages** no repositório do GitHub e, em **Build and
deployment**, selecione **GitHub Actions** como fonte. Em seguida, envie este projeto para a branch
`main`. A URL pública será exibida na execução do workflow **Publicar no GitHub Pages**, na aba
**Actions**.

## Testes

O projeto usa o executor nativo de testes do Node.js, sem dependências externas.

```powershell
node --test tests/quiz.test.js
```

Os testes cobrem validação das questões, confirmação de respostas, feedback, pontuação, avanço
sequencial e reinício.

## Estrutura

```text
.
├── index.html              # Estrutura da interface
├── css/styles.css          # Estilos responsivos
├── data/questions.json     # Questões e gabaritos locais
├── js/app.js               # Renderização e eventos de interface
├── js/quiz.js              # Lógica pura do quiz
└── tests/quiz.test.js      # Testes unitários
```

## Regras do Quiz

1. Selecione uma alternativa e confirme a resposta.
2. Leia o feedback antes de avançar.
3. Ao concluir as 10 questões, consulte seu desempenho.
4. Se quiser praticar novamente, use o botão **Reiniciar quiz**.
