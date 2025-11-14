import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FAQ = () => {
  const faqs = [
    {
      question: "O que é o Diagnóstico Estratégico com a Eugen.IA?",
      answer:
        "É uma análise completa e personalizada do seu negócio para identificar oportunidades de automação, otimização de processos e implementação de IA. Analisamos sua operação atual, mapeamos gargalos e propomos soluções específicas com ROI mensurável. O diagnóstico é gratuito e sem compromisso.",
    },
    {
      question: "Para quem é indicado o serviço da Eugen.IA?",
      answer:
        "Nossos serviços são ideais para PMEs e e-commerces independentes que desejam automatizar processos, escalar resultados e otimizar o atendimento ao cliente. Atendemos negócios que buscam reduzir custos operacionais, melhorar a experiência do cliente e competir com eficiência no mercado digital.",
    },
    {
      question: "Preciso de conhecimento técnico para usar os agentes de IA?",
      answer:
        "Não! Uma das nossas principais missões é democratizar o acesso à IA. Nossas soluções são projetadas para serem intuitivas e fáceis de usar, não requerendo conhecimento técnico avançado. Além disso, fornecemos treinamento completo para sua equipe e suporte contínuo.",
    },
    {
      question: "Quanto tempo leva para implementar a solução?",
      answer:
        "O tempo varia conforme a complexidade do projeto. Implementações básicas do agente Eugênia podem estar funcionando em 2-4 semanas. Projetos mais complexos de consultoria e automação customizada podem levar de 1 a 3 meses. Durante o diagnóstico, apresentamos um cronograma detalhado específico para seu caso.",
    },
    {
      question: "Como fica a segurança dos meus dados?",
      answer:
        "A segurança é nossa prioridade máxima. Trabalhamos com infraestrutura de nuvem segura, criptografia de ponta a ponta, e seguimos as melhores práticas de governança de dados. Garantimos total conformidade com a LGPD e nunca compartilhamos seus dados com terceiros. Você mantém total propriedade e controle sobre suas informações.",
    },
    {
      question: "A Eugênia substitui minha equipe de atendimento?",
      answer:
        "Não, a Eugênia complementa e potencializa sua equipe. O agente de IA cuida de tarefas repetitivas, consultas simples, atendimento fora do horário comercial e recuperação de carrinhos. Isso libera sua equipe humana para focar em atendimentos mais complexos, vendas consultivas e relacionamento estratégico com clientes.",
    },
    {
      question: "Posso personalizar a IA com a identidade da minha marca?",
      answer:
        "Sim! A personalização é um dos nossos diferenciais. Modelamos a persona da IA para refletir o tom de voz, valores e identidade da sua marca. Treinamos o agente com conhecimento específico do seu negócio, produtos e processos. Cada IA que entregamos é única e alinhada à sua estratégia.",
    },
    {
      question: "Como funciona a integração com meu e-commerce e sistemas?",
      answer:
        "Integramos com as principais plataformas de e-commerce (Shopify, WooCommerce, VTEX, etc.), ERPs, sistemas de gestão de estoque, CRMs e canais de atendimento (WhatsApp, Instagram, Email). Durante o diagnóstico, mapeamos sua infraestrutura atual e propomos a melhor arquitetura de integração.",
    },
    {
      question: "Qual o investimento necessário?",
      answer:
        "O investimento varia conforme o escopo do projeto e necessidades específicas do seu negócio. Oferecemos diferentes modelos: desde licenciamento mensal do agente Eugênia até projetos customizados de consultoria e automação. Após o diagnóstico gratuito, apresentamos uma proposta transparente com ROI projetado.",
    },
    {
      question: "Vocês oferecem suporte após a implementação?",
      answer:
        "Sim! Acreditamos em parcerias de longo prazo. Oferecemos suporte técnico contínuo, atualizações regulares do sistema, treinamentos adicionais conforme necessário, e acompanhamento de métricas e resultados. Estamos ao seu lado para garantir que você aproveite ao máximo o potencial da IA.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Perguntas <span className="text-gradient">Frequentes</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Tire suas dúvidas sobre nossos serviços e soluções de Inteligência Artificial.
          </p>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="container mx-auto px-4 mb-24">
        <Card className="card-glass border-border/50 max-w-4xl mx-auto">
          <CardContent className="p-8 md:p-12">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                  <AccordionTrigger className="text-left hover:text-primary transition-colors text-lg font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed text-base pt-2">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4">
        <Card className="card-glass border-primary/30 overflow-hidden max-w-4xl mx-auto">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Ainda tem <span className="text-gradient">dúvidas?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Entre em contato conosco para um diagnóstico estratégico gratuito e personalizado.
            </p>
            <Link to="/contato">
              <Button size="lg" className="bg-gradient-primary border-0 hover:opacity-90 glow text-lg px-8 py-6">
                Fale com Nossa Equipe
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default FAQ;
