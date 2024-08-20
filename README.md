# FlexIt

## Descrição
O **FlexIt** é um website voltado para o controle de uma vida saudável, oferecendo funcionalidades como gerenciamento de dietas, controle de treinos, e acompanhamento de métricas pessoais como peso e altura. Ele foi projetado para ajudar as pessoas a alcançarem seus objetivos de saúde e fitness de maneira organizada e eficiente.

## Funcionalidades
- **Dietas**: Ferramenta para criação e acompanhamento de dietas personalizadas.
- **Controle de treinos**: Gestão e monitoramento de treinos, com a possibilidade de criar e seguir planos de exercícios.
- **Linha do tempo de evolução**: Histórico visual da evolução dos dados pessoais, como peso e altura.

## Tecnologias Utilizadas
- **Frontend**: React e Vite
- **Backend**: Node.js (NestJS)
- **Banco de Dados**: PostgreSQL
- **Serviços Adicionais**:
  - Docker
  - SonarQube
  - Jenkins (CI/CD)
  - TDD com Jest

## Arquitetura
Optamos por uma arquitetura **monolítica** para o projeto FlexIt, que combina o frontend em ReactJS e o backend em NestJS. A escolha da arquitetura monolítica foi feita pela simplicidade e facilidade de integração, considerando o escopo do projeto e o tempo disponível para desenvolvimento. Essa abordagem permite um gerenciamento mais centralizado e uma implantação mais direta, ideal para projetos acadêmicos com um ciclo de vida limitado.

## Equipe
A equipe de trabalho é composta por:
- **Ruan Cardozo**: Responsável pelo desenvolvimento do backend e do frontend.
- **Guilherme Elias**: Responsável pelo desenvolvimento do backend e banco de dados.
- **Guilherme Machado**: Responsável pelo desenvolvimento do frontend e banco de dados.

Como trabalharemos com sprints, cada sprint terá suas tarefas distribuídas entre os colaboradores conforme suas responsabilidades. A distribuição será feita de forma a garantir a colaboração eficiente e a entrega de cada funcionalidade dentro do prazo estabelecido.

## Cronograma
O projeto será desenvolvido em sprints, cada uma focada em uma das funcionalidades principais. O cronograma está alinhado com as datas de entrega das três avaliações (N1, N2 e N3) do curso.

- **Sprint 1 - Gerenciamento de Dietas/Cadastro de usuários**: 15/08/2024 - 26/09/2024
- **Sprint 2 - Controle de Treinos**: [Data de Início] - [Data de Término]
- **Sprint 3 - Linha do Tempo de Evolução(Métricas pessoais)**: [Data de Início] - [Data de Término]

### Futuro caso há tempo/evoluções

- **Agenda de Atividades**
- **Dashboard Personalizados**

## Requisitos do projeto

Aqui estão alguns requisitos funcionais e não funcionais para o projeto **FlexIt**:

### Requisitos Funcionais

1. **Cadastro de Usuários:**
   - O sistema deve permitir que usuários se cadastrem fornecendo nome, email, senha, e informações básicas como idade, peso, e altura.
   - Deve permitir o login e recuperação de senha.

2. **Gerenciamento de Dietas:**
   - O usuário deve ser capaz de criar e gerenciar planos de dieta personalizados, com a opção de adicionar e editar refeições diárias.
   - O sistema deve permitir a visualização do progresso nutricional, como calorias e macronutrientes consumidos.

3. **Controle de Treinos:**
   - O usuário deve poder criar, editar, e acompanhar planos de treino, incluindo exercícios, séries, repetições e descanso.
   - O sistema deve permitir registrar o desempenho em cada treino e mostrar o progresso ao longo do tempo.

4. **Acompanhamento de Métricas Pessoais:**
   - O sistema deve permitir que os usuários registrem e acompanhem métricas pessoais como peso, altura, IMC, e medidas corporais.
   - Deve oferecer gráficos e relatórios para visualização do progresso dessas métricas.

5. **Agenda de Atividades (Opcional):**
   - O sistema deve ter uma agenda onde o usuário possa planejar seus treinos e refeições, recebendo lembretes e notificações.

6. **Dashboard Personalizado (Opcional):**
   - O usuário deve ter acesso a um dashboard com uma visão geral do seu progresso, incluindo indicadores de desempenho e alertas personalizados.

### Requisitos Não Funcionais

1. **Usabilidade:**
   - A interface deve ser intuitiva, fácil de navegar, com um design responsivo que se adapte a diferentes dispositivos, incluindo smartphones e tablets.

2. **Segurança:**
   - Deve haver criptografia de dados sensíveis, como senhas, e o sistema deve implementar autenticação segura com tokens.

Esses requisitos oferecem uma base sólida para o desenvolvimento do **FlexIt**, cobrindo as principais funcionalidades necessárias e garantindo a qualidade do sistema.

## Como Executar o Projeto

Preencher mais adiante