import { Menu, Bell, ChevronDown } from 'lucide-react'

export default function Header({ onMenu }) {
  return (
    <header className="topbar">
      <button className="icon-button menu-trigger" onClick={onMenu} aria-label="Open navigation"><Menu size={21} /></button>
      <div className="breadcrumb">Workspace <span>/</span> <strong>My Tasks</strong></div>
      <div className="topbar-actions">
        <button className="icon-button notification-button" aria-label="Notifications"><Bell size={19} /><i /></button>
        <div className="top-profile"><div className="avatar avatar-small">Y</div><span>My account</span><ChevronDown size={15} /></div>
      </div>
    </header>
  )
}
