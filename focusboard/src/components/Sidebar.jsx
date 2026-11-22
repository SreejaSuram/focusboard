import { LayoutDashboard, CheckSquare, CalendarDays, Settings, X } from 'lucide-react'

const links = [
  { label: 'Overview', icon: LayoutDashboard },
  { label: 'My Tasks', icon: CheckSquare },
  { label: 'Calendar', icon: CalendarDays },
  { label: 'Settings', icon: Settings },
]

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <button className="mobile-scrim" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand-row">
          <div className="brand-mark">F</div>
          <span className="brand-name">Focus<span>Board</span></span>
          <button className="icon-button mobile-close" onClick={onClose} aria-label="Close menu"><X size={19} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="side-nav" aria-label="Main navigation">
          {links.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-link ${label === 'My Tasks' ? 'active' : ''}`} onClick={label === 'My Tasks' ? onClose : undefined}>
              <Icon size={18} strokeWidth={1.8} /><span>{label}</span>
              {label === 'My Tasks' && <span className="nav-dot" />}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="sidebar-tip">
            <div className="tip-spark">✦</div>
            <strong>Stay focused</strong>
            <p>Small steps every day lead to big results.</p>
          </div>
          <div className="profile-row">
            <div className="avatar">Y</div>
            <div><strong>Your workspace</strong><small>Personal account</small></div>
            <span className="profile-menu">•••</span>
          </div>
        </div>
      </aside>
    </>
  )
}
