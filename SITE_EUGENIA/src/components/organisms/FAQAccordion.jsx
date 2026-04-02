import { useState } from 'react'
import { faqItems } from '../../data/siteContent'

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section" aria-labelledby="faq-title">
      <div className="container faq-wrapper">
        <div className="section-intro" data-reveal>
          <p className="kicker">FAQ</p>
          <h2 id="faq-title">Perguntas frequentes</h2>
        </div>

        <div className="faq-list" data-reveal>
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <article key={item.question} className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}>
                <button
                  type="button"
                  className="faq-trigger"
                  onClick={() => setOpenIndex((current) => (current === index ? -1 : index))}
                  aria-expanded={isOpen}
                  data-cursor="action"
                >
                  <span>{item.question}</span>
                  <span aria-hidden="true">{isOpen ? '−' : '+'}</span>
                </button>
                <div className="faq-content" role="region" hidden={!isOpen}>
                  <p>{item.answer}</p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
