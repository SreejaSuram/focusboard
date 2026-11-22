export default function StatCard({ title, value, note, icon: Icon, tone, progress }) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span className="stat-title">{title}</span>
        <span className={`stat-icon ${tone}`}><Icon size={18} /></span>
      </div>
      <div className="stat-value">{value}</div>
      {progress !== undefined ? (
        <div className="progress-track" aria-label={`${progress}% complete`}><span style={{ width: `${progress}%` }} /></div>
      ) : <div className="stat-note">{note}</div>}
      {progress !== undefined && <div className="stat-note">{note}</div>}
    </article>
  )
}
