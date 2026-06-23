import type { TeamMember } from './types';

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Aline',
    role: 'Back-end & Banco',
    bio: 'Criei e ajudei na implementação dos CRUDs inicais, implementei a classe Session com as regras de negócio da sessão, e o enum TicketType.No application criei os contratos e os use cases de Product, Cinema e Session. No infra implementei os repositórios de Cinema, Pedido e Session, conectando com o banco via Prisma. No presentation criei os controllers e rotas de Cinema, Session e Product.',
    github: 'https://github.com/aline-kuster',
    image: '/team/Aline.png',
    alt: 'Aline, menina risonha que ri e que sonha',
  },
  {
    name: 'Andressa',
    role: 'Front-end & Back-end',
    bio: 'No back-end, implementei o sistema de pedidos e controle de estoque, incluindo criação, suporte a combos e o CRUD de combos. Também desenvolvi a modelagem da compra de ingressos no banco de dados, com as entidades e relacionamentos necessários, além da criação das tabelas de Sala e Assento e suas migrations. Ainda realizei a atualização de cinema com validação para evitar CNPJs duplicados. No front-end, desenvolvi a página inicial da aplicação, com a exibição do catálogo de filmes e a produtos',
    github: 'https://github.com/AndressaGSouza',
    image: '/team/Andress.png',
    alt: 'Andressa, menina risonha que ri e que sonha',
  },
  {
    name: 'Akemi',
    role: 'Front-end & Banco',
    bio: 'Implementei as páginas de Login e cadastro e auxiliei na construção do banco de dados.',
    github: 'https://github.com/akemiikemoto',
    image: '/team/Akemi.png',
    alt: 'Akemi, menina risonha que ri e que sonha',
  },
  {
    name: 'Cibelle',
    role: 'Front-end & Back-end',
    bio: 'Além do desenvolvimento, auxiliei toda a equipe, ajudando no planejamento e na organização das tarefas, acompanhando o andamento do projeto e realizando as revisões das pull requests para manter a qualidade do código. No back-end, desenvolvi a autenticação da aplicação e o CRUD de usuários. Também fui responsável pela infraestrutura de integração entre o front-end e o back-end, realizando os ajustes necessários para garantir o funcionamento da aplicação. No front-end, defini o design da interface, desenvolvi o catálogo de filmes e a funcionalidade de avaliações, além de adaptar a aplicação durante a integração com a API para que todas as funcionalidades estivessem conectadas corretamente.',
    github: 'https://github.com/Cibelleeg',
    image: '/team/Cibelle.png',
    alt: 'Cibelle, menina risonha que ri e que sonha',
  }
];
