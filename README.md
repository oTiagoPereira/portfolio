#  Minimalist & Modern Portfolio

Um portfólio de alta performance, minimalista e focado em experiência do usuário, desenvolvido com as tecnologias mais modernas do ecossistema React/Next.js.


##  Funcionalidades

-  **Internacionalização (i18n):** Suporte completo para Português (PT) e Inglês (EN) usando `next-intl`.
-  **Tema Dark/Light:** Integração perfeita com `next-themes` e cores baseadas no sistema.
-  **Animações Fluidas:** Experiência imersiva com `framer-motion` e `lucide-react`.
-  **Integração com GitHub API:** Exibição automática de repositórios em destaque diretamente do seu perfil.
-  **Formulário de Contato:** Sistema funcional de envio de e-mails via API do **Resend** com templates HTML estilizados.
-  **Performance:** Score otimizado no Lighthouse, utilizando fontes locais e carregamento sob demanda.
-  **Totalmente Responsivo:** Design adaptável para qualquer dispositivo.

##  Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Linguagem:** [TypeScript](https://www.typescriptlang.org/)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [Shadcn/UI](https://ui.shadcn.com/)
- **Animações:** [Framer Motion](https://www.framer.com/motion/)
- **E-mails:** [Resend](https://resend.com/)
- **Validação:** [Zod](https://zod.dev/)

##  Como iniciar

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/oTiagoPereira/portfolio.git
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   Crie um arquivo `.env` na raiz e adicione:
   ```env
   RESEND_API_KEY=re_sua_chave
   CONTACT_EMAIL=seu-email@dominio.com
   GITHUB_TOKEN=seu_token_github (opcional para aumentar limite de rate limit)
   ```

4. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

##  Estrutura do Projeto

- `/src/app/[locale]`: Rotas e layouts internacionalizados.
- `/src/components`: Componentes reutilizáveis de interface.
- `/src/sections`: Seções principais da página (Hero, Projetos, Contato, etc).
- `/src/data`: Configurações centrais do portfólio (textos, links e filtros).
- `/messages`: Arquivos de tradução (JSON).

##  Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---
Desenvolvido por [Tiago Pereira](https://otiagopereira.dev)
