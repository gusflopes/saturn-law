# SaturnLaw: Gerador de Petições

## Objetivo
O objetivo é permitir um cadastro de Clientes e Processos Judiciais, a partir do qual serão gerados documentos automaticamente, preferencialmente em lote.

Os processos se referem exclusivamente à processos de Habilitação de Crédito na Recuperação Judicial Oi

## Cadastros

### Clientes
**Dados:** Nome, RG, CPF, nacionalidade, profissão, Endereço {Rua, numero, complemento, bairro, cidade, uf}

### Créditos a Habilitar
- Credor? Cliente ou Advogado
- Processo Original: string(número CNJ)
- Data
- Principal: valor
- Honorários Contratados: valor
- Honorários Sucumbencia: valor

### Processos
- Número
- Propositura
- Situação: Pendente | Ativo | Extinto | Encerrado
- Tipo: Principal | Hon. Contratados | Hon. Sucumbencia
- Movimentações: {data | descricao | publico<bool>}
- Resultado
