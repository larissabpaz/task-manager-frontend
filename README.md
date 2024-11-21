# Gerenciador de Tarefas - Front-End

Este é o front-end do Gerenciador de Tarefas, uma aplicação web desenvolvida com **React**, **TypeScript**, e **Material UI**. A aplicação permite que os usuários gerenciem tarefas (criar, editar, deletar, e categorizar) de forma prática e intuitiva.

## Funcionalidades

- Login e cadastro de usuários
- Criação, edição, e exclusão de tarefas
- Categorização e filtragem de tarefas
- Modal de criação/edição de tarefas
- Feedback visual com estados vazios e prioridades coloridas
- Interface responsiva e moderna

## Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces de usuário
- **TypeScript**: Superset de JavaScript que adiciona tipagem estática
- **Material UI (MUI)**: Biblioteca de componentes de UI prontos para React
- **Axios**: Biblioteca para realizar requisições HTTP
- **React Router**: Gerenciamento de rotas no front-end
- **Vite**: Ferramenta de build rápida para o desenvolvimento de front-end

## Requisitos

- **Node.js**: v14 ou superior
- **npm** ou **yarn**: para gerenciar pacotes

## Instalação

1. Clone o repositório:

git clone https://github.com/larissabpaz/task-manager-frontend

2. Acesse a pasta do projeto:

3. Instale as dependências:
npm install

4. Inicie o servidor de desenvolvimento:

Acesse a aplicação em http://localhost:{porta}.

## Estrutura do Projeto
A estrutura básica do projeto é a seguinte:

bash
Copiar código
src/
│
├── components/       # Componentes reutilizáveis da aplicação
├── pages/            # Páginas da aplicação (Login, Cadastro, Gerenciamento de Tarefas)
├── services/         # Integração com API e métodos auxiliares
├── App.tsx           # Componente raiz da aplicação
└── main.tsx          # Arquivo de entrada da aplicação
Rotas
/: Página de login
/register: Página de cadastro
/tasks: Página de gerenciamento de tarefas (rota protegida, disponível apenas para usuários autenticados)

## Como Usar
Login/Cadastro
Acesse a tela de Login ou Cadastro para registrar-se ou fazer login.
Após o login, você será redirecionado para a página de tarefas.
Gerenciamento de Tarefas
Você pode criar, editar, deletar e categorizar tarefas.
A página de tarefas exibe um Empty State quando não há tarefas cadastradas.
As tarefas podem ser filtradas por prioridade ou categoria.
Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto com as seguintes variáveis de ambiente:

VITE_API_BASE_URL=https://sua-api-url
Essa variável será usada para definir a URL base da API que o front-end consumirá.

## Contribuição
Sinta-se à vontade para abrir issues e enviar pull requests. Sugestões de melhoria e correções de bugs são sempre bem-vindas!

Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.