(function () {
  const root = document.documentElement;
  const storedTheme = localStorage.getItem("eugenia-theme");
  if (storedTheme) root.dataset.theme = storedTheme;

  const themeToggle = document.querySelector("[data-theme-toggle]");
  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "light" ? "dark" : "light";
    root.dataset.theme = next;
    localStorage.setItem("eugenia-theme", next);
  });

  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");
  navToggle?.addEventListener("click", () => {
    const isOpen = nav?.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(Boolean(isOpen)));
  });
  nav?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    });
  });

  const langSelect = document.querySelector("[data-lang-select]");
  const storedLang = localStorage.getItem("eugenia-lang") || "pt";
  if (langSelect) langSelect.value = storedLang;

  const translations = {
    "Quem somos": "About",
    "Contato": "Contact",
    "Falar com a Eugênia": "Talk to Eugenia",
    "Política de Privacidade": "Privacy Policy",
    "© 2026 Eugen.IA. Todos os direitos reservados.": "© 2026 Eugen.IA. All rights reserved.",
    "Todos os direitos reservados.": "All rights reserved.",
    "Transformamos a operação": "We transform the operations",
    "de Prestadores de Serviços": "of Service Providers",
    "com Inteligência": "with Intelligence",
    "Automações e Agentes de IA que eliminam o trabalho manual do seu atendimento e backoffice. Reduza custos, automatize processos e multiplique a eficiência da sua equipe.": "AI automations and agents that eliminate manual work from your support and back office. Reduce costs, automate processes and multiply your team's efficiency.",
    "Ver como funciona": "See how it works",
    "MAIS TEMPO CONSTRUINDO": "MORE TIME BUILDING",
    "MENOS TEMPO OPERANDO": "LESS TIME OPERATING",
    "O que fazemos": "What we do",
    "Muito além do Hype.": "Far beyond hype.",
    "Alguns dos processos que nossos Agentes realizam com excelência:": "Some of the processes our Agents perform with excellence:",
    "Atendimento ágil e personalizado 24/7.": "Fast, personalized 24/7 support.",
    "Qualificação de leads e suporte técnico.": "Lead qualification and technical support.",
    "Agendamento e gestão de agendas.": "Scheduling and calendar management.",
    "Lembretes e notificações automáticas via Whatsapp, e-mail e SMS.": "Automatic reminders and notifications via WhatsApp, email and SMS.",
    "Geração automática de contratos, NFs, documentos e propostas.": "Automatic generation of contracts, invoices, documents and proposals.",
    "Onboarding automatizado para novos clientes.": "Automated onboarding for new clients.",
    "Ver funcionando na prática": "See it working in practice",
    "Não existe Inteligência Artificial": "There is no",
    "“plug-and-play”.": "plug-and-play Artificial Intelligence.",
    "E esse é o motivo pelo qual muitos empresários não estão tendo resultado com Inteligência Artificial.": "And this is why many business owners are not getting results with Artificial Intelligence.",
    "Compram cursos do tipo “implemente você mesmo”. Assinam ferramentas do tipo “conecte seu whatsapp e comece a usar no mesmo instante”.": "They buy courses that promise “implement it yourself”. They subscribe to tools that say “connect your WhatsApp and start using it instantly”.",
    "Aqui que mora o perigo. Se você passou por isso, sinto lhe dizer que seu cérebro foi guiado pela promessa de caminho mais fácil.": "That is where the danger is. If you have been through this, your brain was guided by the promise of the easiest path.",
    "O resultado é um robô genérico, nada humanizado e que afasta o usuário ao invés de converter (isso quando ele funciona sem nenhum problema de configuração).": "The result is a generic, non-humanized bot that pushes users away instead of converting them, when it even works without configuration issues.",
    "Aqui na Eugen.IA, nós jogamos o jogo da engenharia e não da promessa milagrosa. Um Agente de IA autônomo de verdade não é um produto de prateleira.": "Here at Eugen.IA, we play the engineering game, not the miracle-promise game. A truly autonomous AI Agent is not an off-the-shelf product.",
    "Ele exige desenho de processos e conexões profundas para conectar seu WhatsApp aos bastidores do seu negócio, CRM, ERP, documentos e planilhas.": "It requires process design and deep connections to link your WhatsApp to the backstage of your business, CRM, ERP, documents and spreadsheets.",
    "Por isso, nós não te vendemos uma ferramenta para te dar mais trabalho. Nós mapeamos sua rotina e entregamos o ecossistema 100% pronto e integrado aos sistemas que você já usa.": "That is why we do not sell you a tool that gives you more work. We map your routine and deliver a 100% ready ecosystem integrated with the systems you already use.",
    "E o melhor: mais acessível do que você imagina.": "And best of all: more accessible than you imagine.",
    "Nós fazemos a engenharia pesada para você ter o que realmente importa:": "We handle the heavy engineering so you can have what really matters:",
    "Mais tempo construindo. Menos tempo operando.": "More time building. Less time operating.",
    "Por trás da Engenharia Operacional": "Behind Operational Engineering",
    "Uma mente analítica projetando os sistemas que devolvem a liberdade ao seu negócio.": "An analytical mind designing the systems that return freedom to your business.",
    "Conhecer a Eugen.IA": "Meet Eugen.IA",
    "Conheça a Eugênia": "Meet Eugenia",
    "Nossa Agente de IA está pronta para lhe dar um gostinho de como a tecnologia funciona na prática.": "Our AI Agent is ready to give you a taste of how the technology works in practice.",
    "Converse com a Eugênia e tire suas próprias conclusões.": "Talk to Eugenia and draw your own conclusions.",
    "Perguntas frequentes": "Frequently Asked Questions",
    "Quem é a Eugen.IA?": "Who is Eugen.IA?",
    "Somos uma empresa de Engenharia Operacional especializada em projetar ecossistemas de automação e Agentes de IA sob medida para Prestadores de Serviços (como escritórios de advocacia, clínicas de saúde e consultorias). O nome carrega nossa filosofia: a união entre o \"Eu\" (o talento humano) e a \"Gen IA\" (Inteligência Artificial Generativa) para potencializar o seu negócio.": "We are an Operational Engineering company specialized in designing automation ecosystems and custom AI Agents for Service Providers, such as law firms, healthcare clinics and consultancies. The name carries our philosophy: the union between the “Self”, human talent, and “Gen AI”, Generative Artificial Intelligence, to enhance your business.",
    "Qual o investimento para implementar os sistemas?": "What is the investment to implement the systems?",
    "A Inteligência Artificial vai substituir a minha equipe?": "Will Artificial Intelligence replace my team?",
    "Não vou perder o controle da minha empresa ao automatizar os processos?": "Will I lose control of my company by automating processes?",
    "E se eu não tiver tempo agora para implementar uma tecnologia nova?": "What if I do not have time right now to implement new technology?",
    "Minha operação é muito específica. Existe solução de prateleira para o meu caso?": "My operation is very specific. Is there an off-the-shelf solution for my case?",
    "Já investi em chatbots ou automações antes e não tive retorno. Por que aqui seria diferente?": "I have invested in chatbots or automations before and got no return. Why would this be different?",
    "Minha empresa não tem equipe técnica. Como vamos gerenciar os robôs?": "My company does not have a technical team. How will we manage the bots?",
    "Como funciona a segurança dos dados da minha empresa e dos meus clientes?": "How does data security work for my company and my clients?",
    "Vocês atendem apenas no Rio Grande do Sul?": "Do you only serve Rio Grande do Sul?",
    "O Agente consegue encaminhar o atendimento para um humano se necessário?": "Can the Agent forward the conversation to a human when needed?",
    "Trabalhamos com o modelo Done-For-You (feito para você), dividindo o investimento em duas etapas: um valor único de Setup para a engenharia e implantação da arquitetura (como nosso Gerador Automático de Contratos), e uma mensalidade de manutenção para suporte das APIs, monitoramento de servidores e refinamento contínuo do(s) Agente(s) de IA. Os valores exatos dependem da complexidade da sua operação e são apresentados logo após a sua Sessão de Diagnóstico.": "We work with a Done-For-You model, splitting the investment into two stages: a one-time setup fee for engineering and architecture implementation, such as our Automatic Contract Generator, and a maintenance fee for API support, server monitoring and continuous refinement of the AI Agent(s). Exact values depend on the complexity of your operation and are presented right after your Diagnostic Session.",
    "Absolutamente não (A não ser que você queira, mas recomendamos substituir apenas quem não deseja trabalhar). Nosso objetivo é substituir as tarefas robóticas e invisíveis que sobrecarregam sua recepção e seu backoffice, e não as pessoas. A IA assume o trabalho repetitivo — como preencher contratos e confirmar agendas — para devolver o tempo técnico da sua equipe para o que realmente gera faturamento: decisão, relacionamento e vendas.": "Absolutely not, unless you want to, but we recommend replacing only those who do not want to work. Our goal is to replace robotic and invisible tasks that overload your reception and back office, not people. AI takes over repetitive work, such as filling contracts and confirming appointments, to return your team's technical time to what actually generates revenue: decision-making, relationships and sales.",
    "Pelo contrário, você ganha controle gerencial. Processos manuais são invisíveis e propensos a falhas humanas. Os ecossistemas que construímos são 100% rastreáveis, previsíveis e auditáveis. Você terá total visibilidade sobre cada lead, contrato ou agendamento através de uma central de atendimento limpa e intuitiva.": "On the contrary, you gain managerial control. Manual processes are invisible and prone to human error. The ecosystems we build are 100% traceable, predictable and auditable. You will have full visibility over every lead, contract or appointment through a clean and intuitive service center.",
    "Nossos sistemas foram desenhados justamente para quem está sem tempo. O modelo é Done-For-You: nós fazemos toda a engenharia pesada por trás dos panos. Sua única dedicação será uma chamada inicial de 30 minutos (Sessão de Diagnóstico) para nos mostrar seus gargalos. Nós mapeamos, construímos, integramos e entregamos tudo pronto e testado para a sua equipe usar.": "Our systems were designed precisely for people who have no time. The model is Done-For-You: we handle all the heavy engineering behind the scenes. Your only dedication will be an initial 30-minute call, the Diagnostic Session, to show us your bottlenecks. We map, build, integrate and deliver everything ready and tested for your team to use.",
    "Não trabalhamos com soluções genéricas de prateleira, porque sabemos que não existe Inteligência Artificial plug-and-play. Cada projeto da Eugen.IA começa com o mapeamento da sua rotina atual. Desenhamos a arquitetura da IA para se moldar ao seu processo e aos sistemas que você já utiliza hoje — e não o contrário.": "We do not work with generic off-the-shelf solutions, because we know there is no plug-and-play Artificial Intelligence. Every Eugen.IA project starts by mapping your current routine. We design the AI architecture to fit your process and the systems you already use today, not the other way around.",
    "Porque a maioria das ferramentas baratas do mercado vende apenas um robô engessado de mensagens que irrita o cliente e não resolve o seu backoffice. Na Eugen.IA, nós aplicamos o Método 5D de engenharia. Começamos pelo diagnóstico e pelo desenho do fluxo de dados antes de mover uma única linha de código, garantindo que o sistema traga retorno financeiro e paz operacional desde o primeiro dia.": "Because most cheap market tools sell only a rigid messaging bot that irritates the client and does not solve your back office. At Eugen.IA, we apply the 5D engineering method. We start with diagnosis and data-flow design before moving a single line of code, ensuring the system brings financial return and operational peace from day one.",
    "Você não precisa entender de códigos, prompts ou APIs. Entregamos a solução 100% instalada, configurada e integrada. Além disso, nossa mensalidade cobre toda a manutenção e suporte técnico do sistema para você nunca se preocupar.": "You do not need to understand code, prompts or APIs. We deliver the solution 100% installed, configured and integrated. In addition, our monthly fee covers all maintenance and technical support so you never have to worry.",
    "Segurança e conformidade são prioridades na nossa engenharia. Operamos em estrita conformidade com a LGPD. Os dados e históricos de atendimento rodam em servidores dedicados e seguros, integrados diretamente aos seus sistemas atuais via API. Nossos agentes de IA sempre se identificam como assistentes virtuais na primeira interação, mantendo total transparência.": "Security and compliance are priorities in our engineering. We operate in strict compliance with Brazil's LGPD. Service data and histories run on dedicated, secure servers, directly integrated with your current systems via API. Our AI agents always identify themselves as virtual assistants in the first interaction, maintaining full transparency.",
    "Atendemos de forma focada toda a Região Sul (RS, SC e PR) e prestadores de serviços de todo o Brasil através de atendimento e implantação 100% remotos, utilizando salas de reunião virtuais e suporte dedicado online.": "We serve the entire Southern Region of Brazil, RS, SC and PR, and service providers throughout Brazil through 100% remote service and implementation, using virtual meeting rooms and dedicated online support.",
    "Sim, sempre que necessário, o Agente consegue acionar o atendimento humano para que sua equipe continue pelo próprio CRM ou Whatsapp, sem necessidade de encaminhar para outro número ou alternar entre sistemas.": "Yes. Whenever necessary, the Agent can trigger human support so your team can continue through the CRM or WhatsApp itself, without forwarding to another number or switching systems.",
    "Olá, eu sou o Felipe Raymundo.": "Hello, I am Felipe Raymundo.",
    "Sou um arquiteto de processos, empreendedor e entusiasta da eficiência. Minha mente funciona através de sistemas, lógica e precisão. Há mais de 10 anos atuo no mercado destrinchando operações complexas, organizando fluxos de trabalho e traduzindo tecnologias densas em soluções de negócios simplificadas e fáceis de usar.": "I am a process architect, entrepreneur and efficiency enthusiast. My mind works through systems, logic and precision. For more than 10 years I have worked in the market breaking down complex operations, organizing workflows and translating dense technologies into simplified, easy-to-use business solutions.",
    "O nome “Eugen.IA” carrega um trocadilho e uma filosofia.": "The name “Eugen.IA” carries a pun and a philosophy.",
    "O trocadilho é com o conceito de \"Eugência\", a Agência de uma pessoa só. Afinal, essa é a realidade da Eugen.IA hoje. Mas, acima de tudo, representa a fusão inevitável do EU (ser humano) com a IA Generativa (Gen IA).": "The pun is with the concept of “Eugência”, a one-person agency. After all, that is Eugen.IA's reality today. But above all, it represents the inevitable fusion of the Self, the human being, with Generative AI, Gen AI.",
    "Não acreditamos que a Inteligência Artificial veio para roubar empregos de humanos dedicados.": "We do not believe Artificial Intelligence came to steal jobs from dedicated humans.",
    "Ela veio para nos devolver o tempo.": "It came to give us time back.",
    "A IA vai substituir tarefas repetitivas, o trabalho invisível do backoffice, o \"copia e cola\" burocrático e a lentidão da operação manual.": "AI will replace repetitive tasks, invisible back-office work, bureaucratic copy-and-paste and the slowness of manual operations.",
    "Ela limpa o terreno para que o talento humano possa criar e se conectar de verdade.": "It clears the ground so human talent can truly create and connect.",
    "Construímos sistemas precisos e agentes inteligentes sob medida com um único objetivo: potencializar o seu negócio, mantendo a sua estrutura enxuta.": "We build precise systems and custom intelligent agents with one goal: to enhance your business while keeping your structure lean.",
    "Inteligência Operacional para quem deseja passar mais tempo construindo a própria liberdade.": "Operational Intelligence for those who want to spend more time building their own freedom.",
    "Afinal, esse é nosso lema:": "After all, this is our motto:",
    "Usamos cookies essenciais e métricas para melhorar sua experiência, conforme nossa Política de Privacidade.": "We use essential and analytics cookies to improve your experience, according to our Privacy Policy.",
    "Ler política": "Read policy",
    "Aceitar": "Accept"
    ,
    "Esta política explica como a Eugen.IA trata dados pessoais coletados em seus canais digitais.": "This policy explains how Eugen.IA processes personal data collected through its digital channels.",
    "Dados coletados": "Data collected",
    "Podemos coletar nome, telefone, e-mail, empresa, mensagens enviadas por formulários, WhatsApp ou e-mail, além de dados técnicos como endereço IP, tipo de navegador, páginas visitadas e preferências de cookies.": "We may collect name, phone number, email, company, messages sent through forms, WhatsApp or email, as well as technical data such as IP address, browser type, visited pages and cookie preferences.",
    "Finalidades": "Purposes",
    "Usamos os dados para responder contatos, realizar diagnóstico comercial, prestar serviços contratados, melhorar a experiência do site, cumprir obrigações legais e proteger nossos sistemas.": "We use data to respond to contacts, perform commercial diagnosis, provide contracted services, improve the website experience, comply with legal obligations and protect our systems.",
    "Cookies": "Cookies",
    "Utilizamos cookies essenciais para funcionamento do site e cookies de métricas para entender navegação de forma agregada. Você pode gerenciar cookies pelo navegador e aceitar o aviso exibido no site.": "We use essential cookies for website operation and analytics cookies to understand navigation in aggregate. You can manage cookies through your browser and accept the notice displayed on the website.",
    "Compartilhamento": "Sharing",
    "Dados podem ser compartilhados com fornecedores necessários à operação, como hospedagem, ferramentas de atendimento, automação, agenda, analytics e infraestrutura. Não vendemos dados pessoais.": "Data may be shared with providers necessary for operation, such as hosting, support tools, automation, scheduling, analytics and infrastructure. We do not sell personal data.",
    "Segurança": "Security",
    "Aplicamos medidas técnicas e administrativas compatíveis com a natureza dos dados tratados, incluindo controle de acesso, integração via API e monitoramento operacional.": "We apply technical and administrative measures compatible with the nature of the processed data, including access control, API integration and operational monitoring.",
    "Direitos do titular": "Data subject rights",
    "Você pode solicitar confirmação de tratamento, acesso, correção, eliminação, portabilidade, informação sobre compartilhamento e revogação de consentimento, conforme a LGPD.": "You may request confirmation of processing, access, correction, deletion, portability, information about sharing and withdrawal of consent, according to the LGPD.",
    "Para exercer seus direitos ou esclarecer dúvidas, entre em contato pelo e-mail": "To exercise your rights or ask questions, contact us by email",
    "ou telefone": "or phone",
    "Última atualização: 26 de junho de 2026.": "Last updated: June 26, 2026."
  };

  const originalTextNodes = [];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const key = node.nodeValue.replace(/\s+/g, " ").trim();
    if (key) originalTextNodes.push({ node, value: node.nodeValue, key });
  }

  function setLanguage(lang) {
    document.documentElement.lang = lang === "en" ? "en" : "pt-BR";
    originalTextNodes.forEach(({ node, value, key }) => {
      node.nodeValue = value;
      if (lang === "en" && translations[key]) {
        const leading = value.match(/^\s*/)?.[0] || "";
        const trailing = value.match(/\s*$/)?.[0] || "";
        node.nodeValue = `${leading}${translations[key]}${trailing}`;
      }
    });
    document.querySelectorAll(".typing-text").forEach((el) => {
      el.dataset.words = lang === "en" ? "Artificial,Strategic,Operational" : "Artificial,Estratégica,Operacional";
      el.textContent = el.dataset.words.split(",")[0];
    });
    document.querySelectorAll("[data-headline-prefix]").forEach((el) => {
      el.textContent = lang === "en" ? "with" : "com Inteligência";
    });
    document.querySelectorAll("[data-headline-suffix]").forEach((el) => {
      el.textContent = lang === "en" ? " Intelligence" : "";
    });
    localStorage.setItem("eugenia-lang", lang);
  }
  setLanguage(storedLang);
  langSelect?.addEventListener("change", (event) => setLanguage(event.target.value));

  document.querySelectorAll("[data-carousel]").forEach((carousel) => {
    const cards = Array.from(carousel.querySelectorAll("[data-carousel-card]"));
    const prevButton = carousel.querySelector("[data-carousel-prev]");
    const nextButton = carousel.querySelector("[data-carousel-next]");
    let activeIndex = 0;

    function circularDistance(index) {
      const total = cards.length;
      const forward = (index - activeIndex + total) % total;
      const backward = (activeIndex - index + total) % total;
      return forward <= backward ? forward : -backward;
    }

    function renderCarousel() {
      cards.forEach((card, index) => {
        card.classList.remove("is-active", "is-prev", "is-next", "is-far-prev", "is-far-next");
        const distance = circularDistance(index);
        if (distance === 0) card.classList.add("is-active");
        if (distance === -1) card.classList.add("is-prev");
        if (distance === 1) card.classList.add("is-next");
        if (distance === -2) card.classList.add("is-far-prev");
        if (distance === 2) card.classList.add("is-far-next");
        card.setAttribute("aria-hidden", distance === 0 ? "false" : "true");
      });
    }

    function move(direction) {
      activeIndex = (activeIndex + direction + cards.length) % cards.length;
      renderCarousel();
    }

    prevButton?.addEventListener("click", () => move(-1));
    nextButton?.addEventListener("click", () => move(1));

    let dragStartX = 0;
    let dragStartY = 0;
    let isDragging = false;
    let hasSwiped = false;

    carousel.addEventListener("pointerdown", (event) => {
      if (event.target.closest(".carousel-arrow")) return;
      dragStartX = event.clientX;
      dragStartY = event.clientY;
      isDragging = true;
      hasSwiped = false;
      carousel.setPointerCapture?.(event.pointerId);
    });

    carousel.addEventListener("pointermove", (event) => {
      if (!isDragging || hasSwiped) return;
      const deltaX = event.clientX - dragStartX;
      const deltaY = event.clientY - dragStartY;
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 24) {
        isDragging = false;
        return;
      }
      if (Math.abs(deltaX) > 46) {
        move(deltaX < 0 ? 1 : -1);
        hasSwiped = true;
        isDragging = false;
      }
    });

    carousel.addEventListener("pointerup", () => {
      isDragging = false;
    });

    carousel.addEventListener("pointercancel", () => {
      isDragging = false;
    });

    carousel.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    });
    renderCarousel();
  });

  const typingEl = document.querySelector(".typing-text");
  if (typingEl) {
    let wordIndex = 0;
    let charIndex = typingEl.dataset.words.split(",")[0].length;
    let deleting = false;
    let hold = 12;
    window.setInterval(() => {
      const words = typingEl.dataset.words.split(",");
      if (wordIndex >= words.length) wordIndex = 0;
      const word = words[wordIndex];
      typingEl.textContent = word.slice(0, charIndex);
      if (hold > 0) {
        hold -= 1;
        return;
      }
      if (deleting) charIndex -= 1;
      else charIndex += 1;
      if (charIndex <= 0 && deleting) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        charIndex = 0;
        hold = 2;
      }
      if (charIndex >= words[wordIndex].length && !deleting) {
        deleting = true;
        charIndex = words[wordIndex].length;
        hold = 12;
      }
    }, 92);
  }

  const faqList = document.querySelector("[data-faq-list]");
  if (faqList) {
    faqList.addEventListener("click", (event) => {
      const button = event.target.closest(".faq-item button");
      if (!button) return;
      const current = button.closest(".faq-item");
      faqList.querySelectorAll(".faq-item").forEach((item) => {
        if (item !== current) item.classList.remove("is-open");
      });
      current.classList.toggle("is-open");
    });

    document.addEventListener("click", (event) => {
      if (!faqList.contains(event.target)) {
        faqList.querySelectorAll(".faq-item").forEach((item) => item.classList.remove("is-open"));
      }
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  const cookieBanner = document.querySelector("[data-cookie-banner]");
  if (cookieBanner && localStorage.getItem("eugenia-cookies") !== "accepted") {
    cookieBanner.classList.add("is-visible");
  }
  document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
    localStorage.setItem("eugenia-cookies", "accepted");
    cookieBanner?.classList.remove("is-visible");
  });

  const canvas = document.getElementById("neural-bg");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!canvas || reducedMotion) return;

  const ctx = canvas.getContext("2d");
  let width = 0;
  let height = 0;
  let points = [];
  const pointer = { x: -9999, y: -9999 };

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = width < 700 ? 34 : 76;
    points = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      pulse: Math.random() * Math.PI * 2
    }));
  }

  function primaryRgb() {
    return getComputedStyle(root).getPropertyValue("--primary-rgb").trim() || "251, 186, 35";
  }

  function draw() {
    const primary = primaryRgb();
    ctx.clearRect(0, 0, width, height);
    for (const point of points) {
      point.x += point.vx;
      point.y += point.vy;
      point.pulse += 0.025;
      if (point.x < 0 || point.x > width) point.vx *= -1;
      if (point.y < 0 || point.y > height) point.vy *= -1;
    }

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        const a = points[i];
        const b = points[j];
        const dist = Math.hypot(a.x - b.x, a.y - b.y);
        if (dist < 150) {
          const opacity = (1 - dist / 150) * 0.18;
          ctx.strokeStyle = `rgba(37, 99, 235, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    for (const point of points) {
      const nearPointer = Math.hypot(point.x - pointer.x, point.y - pointer.y) < 180;
      const radius = nearPointer ? 3.1 : 1.8 + Math.sin(point.pulse) * 0.6;
      ctx.fillStyle = nearPointer ? `rgba(${primary}, 0.86)` : `rgba(${primary}, 0.48)`;
      ctx.beginPath();
      ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY;
  });
  resize();
  draw();
})();
