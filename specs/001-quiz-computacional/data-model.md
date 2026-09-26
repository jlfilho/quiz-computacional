# Modelo de Dados: Quiz Computacional

## Questão

| Campo | Tipo conceitual | Regras de validação |
|-------|-----------------|---------------------|
| `id` | Identificador | Único no conjunto de questões. |
| `statement` | Texto | Obrigatório e não vazio. |
| `alternatives` | Lista de textos | Exatamente quatro itens não vazios. |
| `correctIndex` | Número inteiro | Índice existente entre 0 e 3. |

O arquivo inicial contém exatamente 10 questões. Uma questão inválida impede o início do quiz e
exibe uma mensagem clara.

## Tentativa de Quiz

| Campo | Tipo conceitual | Regra |
|-------|-----------------|-------|
| `currentQuestionIndex` | Número inteiro | Inicia em 0, avança até 9 e não diminui. |
| `selectedIndex` | Número ou vazio | Pode mudar antes da confirmação da questão atual. |
| `confirmedAnswers` | Lista de respostas | Uma resposta por questão, somente após confirmação. |
| `correctCount` | Número inteiro | Aumenta somente para resposta correta. |
| `incorrectCount` | Número inteiro | Aumenta somente para resposta incorreta. |
| `status` | Estado | `question`, `feedback` ou `result`. |

## Resposta Confirmada

| Campo | Tipo conceitual | Regra |
|-------|-----------------|-------|
| `questionId` | Identificador | Corresponde a uma questão carregada. |
| `selectedIndex` | Número inteiro | Índice escolhido entre 0 e 3. |
| `isCorrect` | Booleano | Comparação de `selectedIndex` com `correctIndex`. |

## Transições de Estado

```text
question --selecionar/trocar alternativa--> question
question --confirmar com alternativa--> feedback
feedback --avançar, questões restantes--> question
feedback --avançar, décima questão--> result
result --reiniciar--> question (índice 0 e contadores limpos)
```

Não há transição para questão anterior. Confirmar sem seleção é inválido e mantém o estado `question`
com orientação para selecionar uma resposta.
