import { CalendarDays, MoreHorizontal, Pencil, Trash2, Check } from 'lucide-react'

function formatDate(date) {
  if (!date) return 'No date'
  return new Date(`${date}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export default function TaskList({ tasks, onEdit, onDelete, onStatus }) {
  if (!tasks.length) return <div className="empty-state"><div className="empty-icon">✦</div><h3>No tasks found</h3><p>Try changing your search or filters, or create a new task.</p></div>
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <article className="task-row" key={task.id}>
          <div className={`task-check ${task.status === 'Completed' ? 'checked' : ''}`}>{task.status === 'Completed' && <Check size={13} />}</div>
          <div className="task-main">
            <h3 className={task.status === 'Completed' ? 'task-completed' : ''}>{task.title}</h3>
            <p>{task.description || 'No description added'}</p>
            <div className="task-mobile-meta"><span>{task.category}</span><span><CalendarDays size={12} /> {formatDate(task.dueDate)}</span></div>
          </div>
          <span className="task-category">{task.category}</span>
          <div className="task-date"><CalendarDays size={14} />{formatDate(task.dueDate)}</div>
          <span className={`priority priority-${task.priority.toLowerCase()}`}><i />{task.priority}</span>
          <select className={`status-select status-${task.status.toLowerCase().replace(' ', '-')}`} aria-label={`Status for ${task.title}`} value={task.status} onChange={(event) => onStatus(task.id, event.target.value)}>
            <option>To do</option><option>In progress</option><option>Completed</option>
          </select>
          <div className="task-actions">
            <button className="icon-button tiny" onClick={() => onEdit(task)} aria-label={`Edit ${task.title}`}><Pencil size={15} /></button>
            <button className="icon-button tiny delete-action" onClick={() => onDelete(task)} aria-label={`Delete ${task.title}`}><Trash2 size={15} /></button>
          </div>
        </article>
      ))}
    </div>
  )
}
