import { useState } from 'react'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'

const slides = [
  { eyebrow: 'A LITTLE REMINDER · 01', title: 'Make room for focus.', body: 'Choose one meaningful task. Give it your attention, and let progress build one step at a time.', tag: 'One thing at a time' },
  { eyebrow: 'A LITTLE REMINDER · 02', title: 'Progress over perfection.', body: 'You do not need to finish everything today. A small, thoughtful step is still a win.', tag: 'Keep moving forward' },
  { eyebrow: 'A LITTLE REMINDER · 03', title: 'Pause, then begin again.', body: 'Take a breath, reset your priorities and return to the work that matters most.', tag: 'Your pace is valid' },
]

export default function FocusNotes() {
  const [active, setActive] = useState(0)
  const move = (step) => setActive((current) => (current + step + slides.length) % slides.length)
  const slide = slides[active]
  return (
    <section className="focus-notes" aria-label="Focus notes carousel">
      <div className="notes-decoration"><Sparkles size={22} /></div>
      <div className="notes-content">
        <div className="notes-eyebrow">{slide.eyebrow}</div>
        <h2>{slide.title}</h2>
        <p>{slide.body}</p>
        <span className="notes-tag">{slide.tag}</span>
      </div>
      <div className="notes-controls">
        <span className="slide-count">{active + 1} <i>/</i> {slides.length}</span>
        <button className="notes-arrow" onClick={() => move(-1)} aria-label="Previous focus note"><ArrowLeft size={17} /></button>
        <button className="notes-arrow notes-arrow-dark" onClick={() => move(1)} aria-label="Next focus note"><ArrowRight size={17} /></button>
      </div>
      <div className="notes-dots" aria-label="Choose focus note">
        {slides.map((item, index) => <button key={item.eyebrow} className={active === index ? 'dot active' : 'dot'} onClick={() => setActive(index)} aria-label={`Show focus note ${index + 1}`} aria-current={active === index ? 'true' : undefined} />)}
      </div>
    </section>
  )
}
