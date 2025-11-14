import { Link } from "react-router-dom";
import { Mail, Phone, Linkedin, Instagram } from "lucide-react";
import logo from "@/assets/eugenia-logo.png";

const Footer = () => {
  return (
    <footer className="bg-card/30 border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo} alt="Eugen.IA" className="h-10 w-10" />
              <span className="text-xl font-bold">
                Eugen<span className="text-gradient">.IA</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Especialistas em Inteligência Artificial para e-commerce e atendimento virtual.
            </p>
            <div className="flex gap-4">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Links Úteis */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">Links Úteis</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          {/* Serviços */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">Serviços</h3>
            <ul className="space-y-2">
              <li className="text-sm text-muted-foreground">Consultoria em IA</li>
              <li className="text-sm text-muted-foreground">Agente Eugênia</li>
              <li className="text-sm text-muted-foreground">Treinamento de IA</li>
              <li className="text-sm text-muted-foreground">Automação de Processos</li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-sm font-semibold mb-4 text-foreground">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail size={16} className="text-primary" />
                <a href="mailto:contato@eugenia.com.br" className="hover:text-primary transition-colors">
                  contato@eugenia.com.br
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone size={16} className="text-primary" />
                <a href="tel:+5511999999999" className="hover:text-primary transition-colors">
                  (11) 99999-9999
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Eugen.IA. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
