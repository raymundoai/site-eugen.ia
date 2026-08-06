## Stack recomendada para esse projeto
### Framework de página: Astro
- Gera site estático rápido
- Permite compor páginas com .astro e importar componentes UI

### Interatividade leve: React
- Use apenas em componentes que precisam de estado/dinamismo
- Mantenha a maior parte do conteúdo HTML/CSS estático

### Estilos: CSS moderno
- CSS modular ou CSS-in-JS leve
- Design responsivo com classes utilitárias ou componentes estilizados
- Suporte a tema escuro/claro e prefers-reduced-motion

### Efeitos visuais recomendados
- Animações de entrada com GSAP e/ou CSS para hero, títulos e cards
- Revelações ao rolar usando IntersectionObserver
- Smooth scroll suave apenas em desktop, com fallback nativo
- Background sutil em canvas/WebGL apenas em desktop e com redução de movimento
- Transições delicadas em botões, links e cards para sensação premium

### Organização de páginas
- Home com hero, proposta de valor, serviços, diferenciais, provas sociais e CTA
- Serviços / Consultoria / Treinamento / Agentes como páginas dedicadas
- FAQ para dúvidas principais
- Contato com formulário e chamada para ação
- Layout compartilhado com header fixo, footer e navegação clara

### Acessibilidade e profissionalismo
- Navegação simples, links internos e SEO bem definidos
- Carregamento progressivo do JavaScript
- Comportamento adaptado para dispositivos móveis e preferências de usuário

Assim, a recomendação principal é: usar Astro como base, React apenas para interatividade necessária, CSS focado em responsividade e animations suaves com GSAP/IntersectionObserver.