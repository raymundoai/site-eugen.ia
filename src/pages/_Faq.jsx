import Tag from '../components/ui/Tag.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import './_PageShared.css'
import './_Faq.css'

const faqItems = [
  {
    question: 'Quem é a Eugen.IA?',
    answer: 'Somos uma empresa especializada em automação de processos e desenvolvimento de Agentes de IA para PMEs e e-commerces. Combinamos mais de 10 anos em gestão de processos com expertise em IA aplicada ao negócio.',
  },
  {
    question: 'Qual o investimento?',
    answer: 'Depende do escopo. A Consultoria 5D custa R$ 800–900 e é abatível do projeto de execução. O Agente de Agendamento tem setup de R$ 1.200 + R$ 200/mês de manutenção. O Treinamento in-company custa R$ 800–900 por turma. Projetos de automação e agentes customizados são orçados após o diagnóstico.',
  },
  {
    question: 'IA substitui minha equipe?',
    answer: 'Não. IA automatiza tarefas repetitivas e de baixo valor, devolvendo tempo para que sua equipe foque em decisão, relacionamento e crescimento. Nosso objetivo é aumentar a capacidade da equipe, não substituí-la.',
  },
  {
    question: 'Não vou perder o controle ao automatizar processos?',
    answer: 'Pelo contrário. Processos automatizados são rastreáveis, auditáveis e previsíveis. Você tem visibilidade sobre cada etapa. Construímos com logs auditáveis e dados no seu ambiente.',
  },
  {
    question: 'E se não tenho tempo agora para implementar uma coisa nova?',
    answer: 'Começamos pelo Pré-Diagnóstico de 30-45 minutos, sem compromisso. Se não for o momento certo, saímos com clareza sobre quando e como fazer. Não forçamos implementação fora do tempo da empresa.',
  },
  {
    question: 'Minha operação é muito específica. Existe solução pronta para o que eu tenho?',
    answer: 'Não trabalhamos com soluções prontas. Cada projeto começa com um diagnóstico da sua operação. Se a IA faz sentido para o seu contexto específico, desenhamos a solução para o seu processo — não o contrário.',
  },
  {
    question: 'Já investi em tecnologia antes e não tive retorno. Por que seria diferente aqui?',
    answer: 'Porque começamos pelo diagnóstico, não pela ferramenta. A maioria dos projetos fracassa porque a tecnologia foi implementada sem entender o processo. O Método 5D garante que o escopo seja fechado com critério de aceite claro antes de qualquer desenvolvimento.',
  },
  {
    question: 'Minha empresa não tem equipe técnica. Conseguimos usar o que vocês constroem?',
    answer: 'Sim. Entregamos documentação completa, treinamento da equipe e 30 dias de suporte pós-deploy. Construímos para autonomia — você recebe material suficiente para operar e, se quiser, implementar melhorias sozinho.',
  },
  {
    question: 'Meus dados ficam seguros?',
    answer: 'Operamos com compliance nativo à LGPD. Seus dados ficam no seu ambiente — não em plataformas de terceiros sem contrato. Os agentes se identificam como IA na primeira mensagem. Seguimos os princípios do PL 2338/2023 desde a arquitetura.',
  },
  {
    question: 'O que acontece se eu não quiser contratar a execução após a consultoria?',
    answer: 'Você fica com todos os entregáveis: fluxogramas, arquitetura, stack recomendada, estimativa de esforço e escopo fechado. Material suficiente para implementar sozinho ou contratar outro fornecedor. Não cobramos consultoria condicionada à execução.',
  },
  {
    question: 'Vocês atendem fora do Rio Grande do Sul?',
    answer: 'Sim, 100% remoto para todo o Brasil.',
  },
]

export default function Faq() {
  return (
    <>
      <section className="page-hero section">
        <div className="container">
          <Tag data-gsap="page-hero-item">Perguntas frequentes</Tag>
          <h1 data-gsap="page-hero-item">Tudo que você precisa saber</h1>
        </div>
      </section>

      <section className="section" data-gsap="page-section">
        <div className="container faq-body">
          <Accordion items={faqItems} />
        </div>
      </section>
    </>
  )
}
