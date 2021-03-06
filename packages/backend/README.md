# SaturnLaw Backend
## Start up
The backend will run on port 3333, and will need a Postgres Database

## Funcionalidades
O escopo inicial do projeto é ser utilizado como uma ferramenta auxiliar na gestão de processos judiciais na fase em que há maior interação entre o Advogado e o Cliente, na fase inicial de contratação dos serviços jurídicos e a na fase final, quando do encerramento do processo.

### Estrutura do App
[ ] Cadastro de Usuário (name, email, password)
[ ] Autenticação JWT (userId)
[ ] Usuário pode criar um Escritório (Lawfirm) se tornando *owner* e *admin*
[ ] Relacionamento UserLawfirm com roles (client, member, admin)
[ ] Autenticação em Lawfirm JWT (userId + lawfirmId)
[ ] Middlewares de Autenticação (Login e Roles)
[ ] Tipos de rotas autenticadas (clients, members, admin ou owner)
[ ] Rota Admin de Hard Reset dos Usuários (deleta todos os usuários e recria apenas o owner como admin)

### Atendimento Inicial
As seguintes funcionalidades serão implementadas:
[ ] Cadastro de Clientes
[ ] Upload de documentos do Cliente (AWS S3)
[ ] Cadastro de Tipos de Processo e respectivos requisitos documentais e cadastrais
[ ] Cadastro de Informações Complementares do Cliente conforme Processo
[ ] Geração de Documentos Genéricos (Procuração, Declaração, Contrato) - docx
[ ] Geração de Petição Inicial
[ ] Gestão de Petição Inicial a ser elaborda Distribuída
[ ] Cadastro de Processos Judiciais
[ ] Exportação/Informativo Gerencial Processos ajuizados

### Encerramento de Processos
[ ] requisito: Cadastro de Clientes
[ ] requisito: Cadastro de Processos
[ ] Clientes -> Dados Bancários
[ ] Cadastro de Movimentação Financeira ref. Alvará
[ ] Cadastro de Alvará
[ ] Conciliação Alvará X Movimentação Financeira
[ ] Relatórios Contábeis
[ ] Relatórios Financeiros
