# Contrato do Arquivo de Questões

**Arquivo**: `data/questions.json`

O arquivo deve conter uma lista JSON com exatamente 10 objetos de questão. Cada objeto usa o formato:

```json
{
  "id": "q1",
  "statement": "Qual componente executa instruções?",
  "alternatives": ["Memória RAM", "Processador", "Teclado", "Monitor"],
  "correctIndex": 1
}
```

## Regras obrigatórias

- Cada `id` é único.
- `statement` é um texto não vazio.
- `alternatives` contém exatamente quatro textos não vazios.
- `correctIndex` é um inteiro entre 0 e 3 e identifica uma única alternativa correta.
- O arquivo contém exatamente 10 questões na primeira versão.

Se o carregamento falhar ou uma regra for violada, o quiz não inicia uma tentativa inválida. A
interface deve informar que as questões não puderam ser carregadas, que o quiz não pode ser iniciado
e orientar o estudante a recarregar a página.
