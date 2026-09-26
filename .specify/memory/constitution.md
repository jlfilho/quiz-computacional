<!--
Relatório de Impacto da Sincronização
- Alteração de versão: 1.0.0 -> 1.0.1
- Princípios modificados: todos traduzidos para pt-BR; sem alteração de significado
- Seções adicionadas: nenhuma
- Seções removidas: nenhuma
- Pendências: RATIFICATION_DATE deve ser substituída pela data original de ratificação quando conhecida.
-->

# Constituição do Quiz Computacional

## Princípios Fundamentais

### I. Simplicidade Centrada no Estudante
A interface DEVE ser simples, clara e adequada aos estudantes. Telas, textos e interações DEVEM
priorizar a realização do quiz sem carga cognitiva ou navegação desnecessárias. Isso mantém a
aplicação focada no aprendizado, e não na operação do software.

### II. Código de Fácil Manutenção
O código DEVE ser organizado, legível e de fácil manutenção. As funcionalidades DEVEM ter
responsabilidades claras, nomenclatura consistente e baixo acoplamento; duplicação e complexidade
evitável DEVEM ser eliminadas. Isso permite mudanças seguras à medida que o conteúdo educacional e
o comportamento da aplicação evoluem.

### III. Quatro Alternativas por Questão
Cada questão DEVE apresentar exatamente quatro alternativas de resposta. Criar, editar, importar ou
exibir uma questão com qualquer outro número de alternativas é inválido e DEVE ser rejeitado ou
impedido. Um formato fixo oferece uma experiência previsível de aprendizado e avaliação.

### IV. Uma Única Alternativa Correta
Cada questão DEVE ter exatamente uma alternativa correta. A validação DEVE rejeitar questões sem
alternativa correta ou com mais de uma. Isso garante uma resposta inequívoca e uma pontuação
confiável.

### V. Feedback Imediato da Resposta
Após cada resposta do estudante, a aplicação DEVE fornecer feedback indicando se a alternativa
selecionada está correta. O feedback DEVE ser perceptível antes que o estudante prossiga para a
próxima questão. O retorno imediato reforça o aprendizado e torna o comportamento do quiz
transparente.

### VI. Pontuação Automática
A aplicação DEVE calcular automaticamente a pontuação do estudante a partir das respostas
registradas e da única alternativa correta de cada questão. Usuários NÃO DEVEM precisar somar os
resultados manualmente. Isso evita erros de cálculo e mantém a avaliação consistente.

### VII. Dependências Mínimas
O projeto DEVE priorizar a implementação viável mais simples e EVITAR dependências que não tenham
um benefício claro e necessário. Toda dependência ou complexidade arquitetural adicionada DEVE ser
justificada por um requisito concreto. Isso protege a manutenção e a acessibilidade.

### VIII. Verificabilidade Objetiva
Cada funcionalidade implementada DEVE ser verificável por testes automatizados ou critérios de
aceitação explícitos e objetivos. Alterações DEVEM indicar como o comportamento aplicável é
verificado. Isso torna a qualidade mensurável e evita alegações ambíguas de conclusão.

## Restrições Educacionais

Os dados de questões e os fluxos do quiz DEVEM preservar as regras de quatro alternativas e uma
única alternativa correta em todas as fronteiras, incluindo interfaces, validação, persistência,
importações e APIs, quando existirem. Feedback e pontuação automática são resultados obrigatórios
visíveis ao estudante, e não aprimoramentos opcionais.

## Desenvolvimento e Verificação

Antes de o trabalho ser considerado concluído, a implementação e a revisão DEVEM verificar a
conformidade com cada Princípio Fundamental aplicável. A cobertura de testes ou os critérios de
aceitação objetivos DEVEM contemplar a validação das questões, o feedback após uma resposta e a
pontuação automática sempre que esses comportamentos forem alterados. As decisões de projeto e
implementação DEVEM favorecer fluxos diretos e adequados aos estudantes em vez de funcionalidades
especulativas.

## Governança

Esta constituição prevalece sobre práticas conflitantes do projeto Quiz Computacional. Emendas DEVEM
documentar a alteração de regra proposta, sua justificativa, os artefatos afetados e o incremento de
versão semântica necessário. Uma versão MAJOR remove ou redefine uma regra de governança de forma
incompatível; uma versão MINOR adiciona um princípio ou amplia materialmente uma orientação; uma
versão PATCH esclarece a redação sem alterar o significado da governança. Revisões e verificações de
conclusão DEVEM confirmar os requisitos constitucionais aplicáveis e registrar as evidências da
verificação objetiva.

**Versão**: 1.0.1 | **Ratificada em**: TODO(RATIFICATION_DATE): data original de ratificação não informada |
**Última alteração**: 2026-09-25
