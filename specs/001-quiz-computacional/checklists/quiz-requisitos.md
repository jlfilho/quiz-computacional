# Checklist de Requisitos: Quiz Computacional

**Objetivo**: Revisar a qualidade, clareza e completude dos requisitos do quiz antes da implementação.
**Criada em**: 2026-09-26
**Funcionalidade**: [spec.md](../spec.md)

**Nota**: Esta checklist avalia a qualidade dos requisitos, não a implementação.
**Propriedade da revisão**: Artefato de revisão por pares. Marque um item como `[x]` somente quando
o revisor concluir que o critério de qualidade dos requisitos foi satisfeito.
**Semântica do marcador**: `[x]` indica requisito revisado e satisfatório; não indica trabalho de
implementação concluído.

## Completude dos Requisitos

- [ ] CHK001 Os requisitos definem o enunciado, as quatro alternativas e a única alternativa correta
  para cada questão? [Completude, Spec §RF-003–RF-005]
- [ ] CHK002 Os requisitos definem de forma completa as condições para seleção, troca de seleção e
  confirmação de uma resposta? [Completude, Spec §RF-006–RF-007]
- [ ] CHK003 Os requisitos definem a sequência completa entre os estados de questão, feedback e
  resultado? [Completude, Spec §RF-008–RF-015]
- [ ] CHK004 Os requisitos definem claramente o que é removido de uma tentativa ao reiniciar?
  [Completude, Spec §RF-013]
- [ ] CHK005 A premissa de não haver cadastro, autenticação e histórico está documentada como limite
  de escopo consistente? [Completude, Spec §Premissas]

## Clareza e Consistência

- [ ] CHK006 A expressão "destacar a alternativa correta" possui critérios visuais ou textuais
  suficientemente claros para revisão? [Clareza, Spec §RF-008; Contract §Estado `feedback`]
- [ ] CHK007 Os requisitos distinguem sem ambiguidade a seleção provisória da resposta confirmada e
  imutável? [Clareza, Spec §RF-006 e RF-009]
- [ ] CHK008 As regras de avanço sequencial e de ausência de retorno estão consistentes entre as
  histórias, requisitos e contrato de interface? [Consistência, Spec §História 1 e RF-015; Contract
  §Estado `feedback`]
- [ ] CHK009 A regra de percentual como porcentagem inteira está compatível com os critérios de
  resultado para todas as combinações de acertos? [Consistência, Spec §CS-003; Premissas]
- [ ] CHK010 A quantidade fixa de 10 questões está consistente entre requisitos, contrato de dados e
  modelo de dados? [Consistência, Spec §RF-002; Contract `questions-json`; Data model §Questão]

## Critérios de Aceitação e Cenários

- [ ] CHK011 Os critérios de sucesso permitem medir separadamente acertos, erros e percentual para
  qualquer resultado de 0 a 10? [Mensurabilidade, Spec §CS-003]
- [ ] CHK012 Os cenários de aceitação definem o feedback esperado tanto para resposta correta quanto
  incorreta? [Cobertura, Spec §História 1]
- [ ] CHK013 Os cenários definem o resultado após a décima questão sem depender de interpretação
  sobre um comando adicional de conclusão? [Clareza, Spec §História 2; RF-011]
- [ ] CHK014 O cenário de reinício define critérios objetivos para demonstrar que dados da tentativa
  anterior não permanecem? [Mensurabilidade, Spec §História 3; CS-005]

## Casos Limite e Requisitos Não Funcionais

- [ ] CHK015 Os requisitos especificam a mensagem ou orientação apresentada quando se tenta
  confirmar sem selecionar uma alternativa? [Gap, Spec §RF-007; Casos Limite]
- [ ] CHK016 Os requisitos definem o comportamento e a mensagem para falha ou invalidez do arquivo
  local de questões? [Cobertura, Contract `questions-json`; Plan §Restrições]
- [ ] CHK017 Os requisitos de responsividade definem critérios objetivos adicionais além da largura
  mínima de 320 px e da ausência de rolagem horizontal? [Gap, Contract `quiz-ui`]
- [ ] CHK018 Os requisitos de acessibilidade definem ordem de foco e textos alternativos ou nomes
  acessíveis para todos os controles do fluxo? [Gap, Contract `quiz-ui`]

## Dependências e Premissas

- [ ] CHK019 A dependência de servir o JSON por HTTP(S), em vez de abrir a página via `file://`, está
  documentada de forma visível para quem executará a aplicação? [Dependência, Plan §Restrições;
  Research §Carregamento das questões locais]
- [ ] CHK020 A ausência de persistência ao atualizar ou fechar a página está explicitamente aceita
  como consequência do escopo sem histórico? [Premissa, Spec §Premissas; Plan §Armazenamento]

## Observações

- Mantenha itens sem marcação enquanto houver necessidade de esclarecimento, correção ou revisão.
- `$speckit-implement` lê os marcadores como gate e não deve alterá-los.
- `checklists/requirements.md` possui ciclo de vida próprio do `$speckit-specify` e
  `$speckit-clarify`.
