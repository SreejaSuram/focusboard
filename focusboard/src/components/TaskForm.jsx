import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const emptyForm = { title: '', description: '', category: 'Development', status: 'To do', priority: 'Medium', dueDate: '' }

export default function TaskForm({ task, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm)
  const [error, setError] = useState('')

  useEffect(() => {
    setForm(task ? { ...emptyForm, ...task } : emptyForm)
    setError('')
  }, [task])

  const update = (event) => setForm((current) => ({ ...current, [event.target.name]: event.target.value }))

  const submit = (event) => {
    event.preventDefault()
    const title = form.title.trim()
    if (!title) return setError('Please enter a task title.')
    if (!form.dueDate) return setError('Please choose a due date.')
    onSave({ ...form, title, description: form.description.trim() })
  }

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="task-modal" role="dialog" aria-modal="true" aria-labelledby="form-title">
        <div className="modal-heading">
          <div><span className="eyebrow">YOUR WORKSPACE</span><h2 id="form-title">{task ? 'Edit task' : 'Create a task'}</h2><p>Keep the details clear and make your next step count.</p></div>
          <button className="icon-button" onClick={onClose} aria-label="Close form"><X size={20} /></button>
        </div>
        <form onSubmit={submit}>
          <label className="field-label" htmlFor="task-title">Task title <span>*</span></label>
          <input id="task-title" name="title" value={form.title} onChange={update} placeholder="e.g. Finish the landing page" autoFocus />
          <label className="field-label" htmlFor="task-description">Description</label>
          <textarea id="task-description" name="description" value={form.description} onChange={update} placeholder="Add a few details about this task..." rows="3" />
          <div className="form-grid">
            <div><label className="field-label" htmlFor="task-status">Status <span>*</span></label><select id="task-status" name="status" value={form.status} onChange={update}><option>To do</option><option>In progress</option><option>Completed</option></select></div>
            <div><label className="field-label" htmlFor="task-priority">Priority <span>*</span></label><select id="task-priority" name="priority" value={form.priority} onChange={update}><option>Low</option><option>Medium</option><option>High</option></select></div>
          </div>
          <div className="form-grid">
            <div><label className="field-label" htmlFor="task-category">Category</label><select id="task-category" name="category" value={form.category} onChange={update}><option>Development</option><option>Design</option><option>Research</option><option>Testing</option><option>Personal</option></select></div>
            <div><label className="field-label" htmlFor="task-date">Due date <span>*</span></label><input id="task-date" type="date" name="dueDate" value={form.dueDate} onChange={update} /></div>
          </div>
          {error && <p className="form-error" role="alert">{error}</p>}
          <div className="modal-actions"><button type="button" className="button button-light" onClick={onClose}>Cancel</button><button type="submit" className="button button-primary">{task ? 'Save changes' : 'Create task'}</button></div>
        </form>
      </section>
    </div>
  )
}
