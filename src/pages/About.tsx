import { Card, CardContent } from "@/components/ui/card";
import { Award, Target, Users, TrendingUp } from "lucide-react";

const About = () => {
  const stats = [
    { number: "6+", label: "Anos em E-commerce", icon: <TrendingUp className="w-6 h-6 text-primary" /> },
    { number: "9+", label: "Anos em Gestão de Processos", icon: <Target className="w-6 h-6 text-primary" /> },
    { number: "24/7", label: "Atendimento Automatizado", icon: <Users className="w-6 h-6 text-primary" /> },
    { number: "100%", label: "Personalização de IA", icon: <Award className="w-6 h-6 text-primary" /> },
  ];

  const values = [
    {
      title: "Expertise Comprovada",
      description:
        "Com 6 anos de experiência em e-commerce e 9 anos em gestão de processos, entendemos profundamente os desafios do seu negócio.",
    },
    {
      title: "Resultados Mensuráveis",
      description:
        "Não fazemos testes cegos. Transformamos o hype da IA em estratégia formal com ROI tangível e métricas claras.",
    },
    {
      title: "Tecnologia Humanizada",
      description:
        "Nossas soluções de IA são projetadas para melhorar a experiência do cliente, não substituir o toque humano.",
    },
    {
      title: "Segurança em Primeiro Lugar",
      description:
        "Garantimos governança completa e proteção dos seus dados empresariais com as melhores práticas de segurança.",
    },
  ];

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* Header */}
      <section className="container mx-auto px-4 mb-16">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Sobre a <span className="text-gradient">Eugen.IA</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Especialistas em conectar Inteligência Artificial aos negócios para entregar estratégias e automações
            inteligentes.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="container mx-auto px-4 mb-24">
        <Card className="card-glass border-border/50">
          <CardContent className="p-12">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">Nossa Missão</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Na Eugen.IA, acreditamos que a Inteligência Artificial deve ser acessível e eficaz para empresas de
                todos os tamanhos. Nosso objetivo é democratizar o acesso à IA, transformando tecnologia complexa em
                soluções práticas que geram resultados reais.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Trabalhamos especialmente com PMEs e e-commerces independentes que desejam automatizar processos,
                escalar resultados e competir em pé de igualdade com grandes players do mercado.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 mb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="card-glass hover-lift border-border/50 text-center"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="flex justify-center mb-4">{stat.icon}</div>
                <div className="text-4xl font-bold text-gradient mb-2">{stat.number}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="bg-card/30 py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-4xl font-bold mb-6">
              Nossos <span className="text-gradient">Valores</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Princípios que guiam nosso trabalho e relacionamento com clientes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <Card
                key={index}
                className="card-glass hover-lift border-border/50"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold mb-4 text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Approach */}
      <section className="container mx-auto px-4 mt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="card-glass border-primary/30">
            <CardContent className="p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
                Nossa <span className="text-gradient">Abordagem</span>
              </h2>
              <div className="space-y-6 text-lg text-muted-foreground">
                <p className="leading-relaxed">
                  Não acreditamos em soluções genéricas. Cada negócio tem suas particularidades, desafios e
                  oportunidades únicas. Por isso, nossa abordagem começa sempre com um diagnóstico estratégico profundo
                  do seu negócio.
                </p>
                <p className="leading-relaxed">
                  Combinamos nossa experiência em e-commerce e gestão de processos com as mais avançadas tecnologias de
                  IA para criar soluções que realmente funcionam. Não fazemos implementações isoladas - construímos
                  ecossistemas inteligentes que evoluem com seu negócio.
                </p>
                <p className="leading-relaxed">
                  Acreditamos em parcerias de longo prazo. Não entregamos um projeto e desaparecemos. Estamos ao seu
                  lado para garantir que você aproveite ao máximo o potencial da IA, com suporte contínuo e
                  aprimoramentos constantes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
