# Saturn Law

## Techs
This will be built with Node.js and React using Javascript (or TypeScript?).

## Backend
### Estrutura de Dados

#### Clientes
**Conceito:** Cadastro de Clientes do Escritório - CRUD Básico

- Id
- Nome Completo **(obrigatório)**
- E-mail
- RG
- CPF
- Estado Civil
- Profissão
- Outras Informações: { Data de Nascimento, PIS, CTPS, }
- Telefone: múltiplos
- Endereço: apenas 1, mas em tabela separada;
- Colaborador: Colaborador do escritório responsável pelo Cliente

#### Atendimentos
**Conceito:** Os atendimentos poderão ser Agendado | Cancelado | Iniciado | Encerrado

- Id
- Status: *enum*: Agendado | Cancelado | Iniciado | Encerrado
- Responsável: pessoa que fará o atendimento (Ex. Advogado X)
- Cliente
- Inicial? sim/não -> Se não, vincular um processo (obs: atendimento pode ser relativoà um novo processo, ou relativo à um processo já em andamento)
- Data/Hora do Agendamento
- Data/Hora do Início
- Data/Hora do Encerramento
-  Observações

**Frontend:** A partir deste atendimento é possível cadastrar um Novo Contrato e Processo 

#### Processos
**Conceito:** Cadastro de processos Administrativos e Judiciais
- Id
- Tipo: *enum*: Administrativo | Judicial | ??
- Classe: A sugestão é criar um identificar para o tipo de processo ou Núcleo/Setor do Escritório, permitindo que seja agrupado posteriormente. Ex: Trabalhista/DPVAT/Previdenciário/Consumidor/Resp. Civil/etc...

- Status: *enum*: Novo | Pendente | Ativo | Encerrado
**Validação:**
  - Se Ativo => deve possuir número de processo e data da distribuição
  - Se Encerrado => deve possuir um motivo (chamar por uma rota independente)
  *opções*: "Status" pode ser uma tabela autônoma e quando cadastrar um número de processo, cadastrar automaticamente um status Ativo. Criar um Hook afterSave para findOrCreate e, se localizado, alterar Status para Ativo.
  *Prazo*: Novo e Pendente pode estar vinculado à um tipo de prazo específico, permitindo visualização em Kanban (Novo = A fazer | Pendente = )
  *Refazer?* Uma opção do Encerramento que cadastra um novo processo automaticamente!
- Número
- Distribuição

- Cliente (id)
- Colaborador (id): advogado/colaborador responsável pelo atendimento do cliente

#### Pastas
**Conceito:** Permitir cadastro de Pastas que são utilizadas para armazenar documentos de clientes/processos. Essas pastas podem ser físicas ou virtuais. *Precisa definir*: 1 pasta por Cliente ou 1 pasta por processo?
**Validação:** Pasta pode ser formada por 3 elementos: (1) Texto; (2) conector; e (3) número sequencial. Exemplo: "VL-2596"
**Outras Opções:** Permitir que o usuário crie manualmente um número de pasta, mas salvar a última gerada para permitir geração automática, cadastrando também o Texto Inicial e conector em parâmetros para geração automática;'
**Documentos:** Usar a pasta para sincronizar com GED. Exemplo, para a pasta "VL-2596", no Gerenciador de Arquivos vamos possuir: "./VL/2596/arquivos.pdf"


#### Prazos

- Id
- Responsável
- Processo
- Tipo
- Descrição
- dueDate (Prazo)
- Status