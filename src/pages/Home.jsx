import { Helmet } from 'react-helmet-async'
import HeroSection from '../sections/HeroSection.jsx'
import ProblemSection from '../sections/ProblemSection.jsx'
import ServicesSection from '../sections/ServicesSection.jsx'
import MethodSection from '../sections/MethodSection.jsx'
import DiferenciaisSection from '../sections/DiferenciaisSection.jsx'
import FaqPreviewSection from '../sections/FaqPreviewSection.jsx'
import CtaSection from '../sections/CtaSection.jsx'

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Eugen.IA | Automação de Processos e Agentes de IA sob medida</title>
        <meta
          name="description"
          content="Diagnóstico e implementação de automações e Agentes de IA para PMEs e e-commerces. Método 5D. Compliance LGPD nativo."
        />
      </Helmet>
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <MethodSection />
      <DiferenciaisSection />
      <FaqPreviewSection />
      <CtaSection />
    </>
  )
}
