import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { faqs } from '../data/siteContent'

export function FaqList({ limit }) {
  const [open, setOpen] = useState(-1)
  const items = typeof limit === 'number' ? faqs.slice(0, limit) : faqs

  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <article className={open === index ? 'faq-item open' : 'faq-item'} key={item.question}>
          <button type="button" onClick={() => setOpen(open === index ? -1 : index)}>
            <span>{item.question}</span>
            <ChevronDown size={20} aria-hidden="true" />
          </button>
          <div className="faq-answer">
            {item.answer.split('\n\n').map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>
      ))}
    </div>
  )
}
