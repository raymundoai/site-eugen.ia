# Marca Eugen.IA: Fontes e Cores

Este documento preserva a referência visual mínima para reconstruir o site da Eugen.IA do zero. Ele foi consolidado a partir dos tokens e CSS do frontend anterior.

## Identidade Visual

A Eugen.IA deve comunicar consultoria premium, clareza operacional, tecnologia aplicada a processos reais e acabamento editorial limpo. Evite linguagem visual de startup genérica, excesso de efeitos futuristas ou interfaces lúdicas demais.

O sistema visual anterior era bi-temático:

- tema claro: mais editorial, aberto, consultivo e institucional
- tema escuro: mais técnico, intenso, estratégico e de operação noturna

Os dois temas fazem parte da marca. A preferência do sistema do usuário pode decidir o tema inicial.

## Fontes

### Fonte de Display

- Família: `Sora`
- Uso: títulos, chamadas principais, valores, cards de autoridade, labels fortes e pontos de impacto
- Pesos recomendados: `500`, `600`, `700`, `800`
- Sensação: firme, atual, direta e estratégica

### Fonte de Texto e Interface

- Família: `Manrope`
- Uso: corpo de texto, navegação, botões, formulários, descrições, microcopy e mensagens do chat
- Pesos recomendados: `400`, `500`, `600`, `700`, `800`
- Sensação: legível, limpa, neutra e profissional

### Import Recomendado

```css
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&family=Sora:wght@400;500;600;700;800&display=swap');
```

### Regras de Uso

- Use `Sora` em `h1`, `h2`, `h3`, `h4` e elementos de autoridade.
- Use `Manrope` como fonte padrão do body e da interface.
- Mantenha `letter-spacing: 0` em títulos, salvo pequenos labels em caixa alta.
- Kicker/eyebrow pode usar caixa alta, peso alto e tracking moderado.
- Priorize hierarquia clara, sem tipos decorativos adicionais.

## Paleta Principal

### Tema Claro

| Papel | Token | Hex |
| --- | --- | --- |
| Fundo geral | `background` | `#f9f7f2` |
| Superfície principal | `surface` | `#ffffff` |
| Superfície auxiliar | `surface-soft` | `#f2f4f8` |
| Texto principal | `foreground` | `#0f131a` |
| Texto secundário | `muted` | `#576174` |
| Bordas e divisores | `line` | `#d5dce8` |
| Ação primária | `primary` | `#d99400` |
| Realce/gradiente | `accent` | `#f0b93f` |
| Erro | `danger` | `#c8484d` |

### Tema Escuro

| Papel | Token | Hex |
| --- | --- | --- |
| Fundo geral | `background` | `#0f131a` |
| Superfície principal | `surface` | `#181d25` |
| Superfície auxiliar | `surface-soft` | `#1f2631` |
| Texto principal | `foreground` | `#fffaf0` |
| Texto secundário | `muted` | `#a5afbf` |
| Bordas e divisores | `line` | `#2a3240` |
| Ação primária | `primary` | `#fbba23` |
| Realce/gradiente | `accent` | `#f6c655` |
| Erro | `danger` | `#f06367` |

## Gradientes e Clima Visual

O CTA primário usa gradiente dourado:

```css
background: linear-gradient(140deg, var(--primary), var(--accent));
color: #1b1200;
```

O fundo pode usar uma malha radial sutil com dourado e azul frio. Ela deve ser atmosfera, não decoração chamativa.

Tema escuro:

```css
--gradient-mesh:
  radial-gradient(circle at 10% 12%, rgba(246, 198, 85, 0.16), transparent 52%),
  radial-gradient(circle at 88% 14%, rgba(86, 130, 206, 0.18), transparent 48%),
  radial-gradient(circle at 55% 86%, rgba(251, 186, 35, 0.12), transparent 52%);
```

Tema claro:

```css
--gradient-mesh:
  radial-gradient(circle at 10% 12%, rgba(240, 185, 63, 0.18), transparent 52%),
  radial-gradient(circle at 88% 14%, rgba(76, 118, 190, 0.15), transparent 48%),
  radial-gradient(circle at 55% 86%, rgba(245, 196, 88, 0.17), transparent 52%);
```

## Tokens Complementares

```css
:root {
  --radius-sm: 10px;
  --radius-md: 18px;
  --radius-lg: 26px;
  --radius-pill: 999px;

  --shadow-base: 0 16px 42px rgba(6, 10, 18, 0.16);
  --shadow-glass: 0 22px 50px rgba(6, 10, 18, 0.22);
  --shadow-glow: 0 0 48px rgba(251, 186, 35, 0.28);

  --motion-fast: 0.18s;
  --motion-normal: 0.35s;
  --motion-slow: 0.7s;
  --motion-ease: cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Diretrizes de Aplicação

- Botões principais devem ser pills dourados com texto escuro.
- Header, cards e painéis podem usar transparência, blur e bordas discretas.
- Cards devem parecer premium e consultivos, não dashboard operacional pesado.
- Use dourado para ação e destaque, não como preenchimento dominante da página.
- Use azul frio apenas como luz ambiente secundária.
- Evite paleta monotemática, roxo futurista genérico, neon forte ou visual excessivamente "IA".
- A marca deve parecer humana, estratégica e operacional.
