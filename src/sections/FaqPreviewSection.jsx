import Tag from '../components/ui/Tag.jsx'
import Accordion from '../components/ui/Accordion.jsx'
import Button from '../components/ui/Button.jsx'
import './FaqPreviewSection.css'

const previewItems = [
  {
    question: 'Minha operação é muito específica. Existe solução pronta para o que eu tenho?',
    answer: 'Não trabalhamos com soluções prontas. Cada projeto começa com um diagnóstico da sua operação. Se a IA faz sentido para o seu contexto, desenhamos a solução específica para o seu processo.',
  },
  {
    question: 'Já investi em tecnologia antes e não tive retorno. Por que seria diferente aqui?',
    answer: 'Porque começamos pelo diagnóstico, não pela ferramenta. A maioria dos projetos fracassa porque a tecnologia foi implementada sem entender o processo. Nosso Método 5D garante que o escopo seja fechado com critério de aceite antes de qualquer desenvolvimento.',
  },
  {
    question: 'Minha empresa não tem equipe técnica. Conseguimos usar o que vocês constroem?',
    answer: 'Sim. Entregamos documentação completa, treinamento da equipe e 30 dias de suporte pós-deploy. Construímos para autonomia, não para dependência.',
  },
  {
    question: 'Meus dados ficam seguros?',
    answer: 'Operamos com compliance nativo à LGPD. Seus dados ficam no seu ambiente — não em plataformas de terceiros sem contrato. Os agentes se identificam como IA na primeira mensagem. Seguimos os princípios do PL 2338/2023 desde a arquitetura.',
  },
]

export default function FaqPreviewSection() {
  return (
    <section className="faq-preview section">
      <div className="container faq-preview-inner">
        <Tag>Perguntas frequentes</Tag>
        <h2 className="faq-preview-heading">Dúvidas comuns</h2>

        <Accordion items={previewItems} />

        <div className="faq-preview-cta">
          <Button href="/faq" variant="secondary">
            Ver todas as perguntas →
          </Button>
        </div>
      </div>
    </section>
  )
}
