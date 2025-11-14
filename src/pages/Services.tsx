import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Brain, Bot, Users, Zap, Shield, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Services = () => {
  const mainServices = [
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "Consultoria em Inteligência Artificial",
      description: "Orientação estratégica completa para implementar IA no seu negócio de forma eficaz.",
      features: [
        "Por onde começar com IA?",
        "Como aproveitar o melhor das ferramentas disponíveis?",
        "Quais processos otimizar e automatizar?",
        "Como estruturar uma equipe de IA interna?",
        "Garantia de segurança dos seus dados",
      ],
    },
    {
      icon: <Bot className="w-12 h-12 text-primary" />,
      title: "Eugênia - Agente de IA",
      description: "Seu assistente virtual inteligente que trabalha 24/7 para seu e-commerce.",
      features: [
        "Atendimento em WhatsApp, Instagram, Email e Chat",
        "Consulta ao estoque em tempo real",
        "Criação automática de orçamentos e pedidos",
        "Recuperação inteligente de carrinhos abandonados",
        "Aprende continuamente com seu negócio",
        "IA personalizada de verdade para sua marca",
      ],
    },
    {
      icon: <Users className="w-12 h-12 text-primary" />,
      title: "Treinamento e Personalização",
      description: "Personalizamos IAs especificamente para as necessidades do seu negócio.",
      features: [
        "Treinamento de funções e conhecimento específico",
        "Modelagem de persona da IA alinhada à sua marca",
        "Integração com sistemas existentes",
        "Capacitação da equipe interna",
      ],
    },
  ];

  const benefits = [
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Redução de Custos Operacionais",
      description: "IA integrada para aumentar a eficiência e reduzir gastos desnecessários.",
    },
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Escala com Controle",
      description: "Cresça sem perder a qualidade do atendimento ou controle sobre os processos.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Segurança e Governança",
      description: "Proteção completa dos dados com estrutura de governança robusta.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Nossos <span className="text-gradient">Serviços</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Soluções completas de Inteligência Artificial para transformar seu e-commerce e processos de atendimento.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="container mx-auto px-4 mb-24">
        <div className="space-y-12">
          {mainServices.map((service, index) => (
            <Card
              key={index}
              className="card-glass hover-lift border-border/50 overflow-hidden"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <div className="mb-6">{service.icon}</div>
                    <h2 className="text-3xl font-bold mb-4 text-foreground">{service.title}</h2>
                    <p className="text-muted-foreground text-lg">{service.description}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="space-y-4">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                          <span className="text-foreground/90 text-lg">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-card/30 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Por que escolher a <span className="text-gradient">Eugen.IA?</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Nossa abordagem garante resultados mensuráveis e transformação real do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="card-glass hover-lift border-border/50 text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="mb-4 flex justify-center">{benefit.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-4 mt-24">
        <Card className="card-glass border-primary/30 overflow-hidden">
          <CardContent className="p-12 text-center">
            <h2 className="text-4xl font-bold mb-6">
              Pronto para <span className="text-gradient">começar?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Solicite um diagnóstico estratégico gratuito e descubra qual solução é ideal para o seu negócio.
            </p>
            <Link to="/contato">
              <Button size="lg" className="bg-gradient-primary border-0 hover:opacity-90 glow text-lg px-8 py-6 text-primary">
                Solicitar Diagnóstico Gratuito
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default Services;
