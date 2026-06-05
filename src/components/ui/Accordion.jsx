import { useState } from 'react'
import './Accordion.css'

function AccordionItem({ question, answer, open, onToggle }) {
  return (
    <div className={`accordion-item${open ? ' accordion-item--open' : ''}`}>
      <button
        className="accordion-trigger"
        aria-expanded={open}
        onClick={onToggle}
      >
        <span>{question}</span>
        <span className="accordion-icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="accordion-body">
          <p>{answer}</p>
        </div>
      )}
    </div>
  )
}

export default function Accordion({ items }) {
  const [openIndex, setOpenIndex] = useState(-1)

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          question={item.question}
          answer={item.answer}
          open={openIndex === i}
          onToggle={() => setOpenIndex(openIndex === i ? -1 : i)}
        />
      ))}
    </div>
  )
}
