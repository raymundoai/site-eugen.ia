import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Brain, Users, Zap, Shield, TrendingUp, Bot } from "lucide-react";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  const features = [
    {
      icon: <Brain className="w-8 h-8 text-primary" />,
      title: "Consultoria Estratégica em IA",
      description: "Transformamos o hype da IA em estratégia formal e mensurável para seu negócio.",
    },
    {
      icon: <Bot className="w-8 h-8 text-primary" />,
      title: "Agente Eugênia",
      description: "IA personalizada que atende clientes 24/7 via WhatsApp, Instagram, Email e Chat.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Automação Inteligente",
      description: "Otimize processos, reduza custos operacionais e aumente a produtividade.",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-primary" />,
      title: "ROI Mensurável",
      description: "Resultados tangíveis com dados de intenção em tempo real.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "Segurança de Dados",
      description: "Governança completa e proteção dos seus dados empresariais.",
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Treinamento Personalizado",
      description: "Capacitamos sua equipe para aproveitar o máximo da IA.",
    },
  ];

  const benefits = [
    "6 anos de experiência em e-commerce",
    "9 anos em gestão de processos",
    "Atendimento 24/7 automatizado",
    "Integração com múltiplas plataformas",
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(17, 24, 39, 0.85), rgba(17, 24, 39, 0.85)), url(${heroBackground})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Mais resultado para sua empresa,{" "}
              <span className="text-gradient">mais tempo para você.</span>
            </h1>
            <p className="text-xl md:text-2xl text-foreground/80 mb-8 leading-relaxed">
              Conectamos Inteligência Artificial ao seu negócio para entregar estratégias e automações inteligentes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contato">
                <Button size="lg" className="bg-gradient-primary border-0 hover:opacity-90 glow text-lg px-8 py-6 text-primary-foreground">
                  Solicitar Diagnóstico Gratuito
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <Link to="/servicos">
                <Button size="lg" variant="outlineGold" className="text-lg px-8 py-6">
                  Conheça Nossos Serviços
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </section>

      {/* Value Proposition */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Agentes de IA{" "}
              <span className="text-gradient">que vão aprender, pensar e trabalhar pra você.</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Transforme sua empresa com inteligência artificial que entende seu negócio e trabalha 24/7 para gerar resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="card-glass hover-lift border-border/50 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="mb-4 group-hover:scale-110 transition-transform">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Experiência comprovada em{" "}
                <span className="text-gradient">e-commerce e automação</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8">
                Nossa expertise garante que sua implementação de IA seja bem-sucedida desde o primeiro dia.
              </p>
              <ul className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-lg text-foreground/90">{benefit}</span>
                  </li>
                ))}
              </ul>
              <Link to="/sobre">
                <Button variant="outline" className="border-primary/50 hover:bg-primary/10">
                  Saiba Mais Sobre Nós
                  <ArrowRight className="ml-2" size={18} />
                </Button>
              </Link>
            </div>

            <div className="relative">
              <Card className="card-glass p-8 border-primary/30">
                <CardContent className="p-0">
                  <h3 className="text-2xl font-bold mb-4 text-gradient">Eugênia - Seu Agente de IA</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse"></div>
                      </div>
                      <span className="text-foreground/90">Atendimento multicanal (WhatsApp, Instagram, Email, Chat)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse"></div>
                      </div>
                      <span className="text-foreground/90">Consulta ao estoque em tempo real</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse"></div>
                      </div>
                      <span className="text-foreground/90">Criação automática de orçamentos e pedidos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse"></div>
                      </div>
                      <span className="text-foreground/90">Recuperação inteligente de carrinhos abandonados</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-2 h-2 rounded-full bg-primary animate-glow-pulse"></div>
                      </div>
                      <span className="text-foreground/90">Aprende continuamente com seu negócio</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <div className="absolute -top-4 -right-4 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <Card className="card-glass border-primary/30 overflow-hidden">
            <CardContent className="p-12 text-center relative">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Pronto para <span className="text-gradient">transformar seu negócio?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Solicite um diagnóstico estratégico gratuito e descubra como a IA pode multiplicar seus resultados.
              </p>
              <Link to="/contato">
                <Button size="lg" className="bg-gradient-primary border-0 hover:opacity-90 glow text-lg px-8 py-6 text-primary-foreground">
                  Solicitar Diagnóstico Gratuito
                  <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
