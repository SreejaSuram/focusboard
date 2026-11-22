import { useMemo, useState } from 'react'
import { Plus, Search, ListTodo, Clock3, CircleCheck, TrendingUp, SlidersHorizontal, X } from 'lucide-react'
import Sidebar from './components/Sidebar.jsx'
import Header from './components/Header.jsx'
import StatCard from './components/StatCard.jsx'
import FocusNotes from './components/FocusNotes.jsx'
import TaskForm from './components/TaskForm.jsx'
import TaskList from './components/TaskList.jsx'
import { sampleTasks } from './data/sampleTasks.js'
import { useLocalStorage } from './hooks/useLocalStorage.js'

const tabs = ['All tasks', 'To do', 'In progress', 'Completed']

export default function App() {
  const [tasks, setTasks] = useLocalStorage('focusboard_tasks', sampleTasks)
  const [search, setSearch] = useState('')
  const [activeTab, setActiveTab] = useState('All tasks')
  const [priority, setPriority] = useState('All priorities')
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState(null)
  const [mobileNav, setMobileNav] = useState(false)

  const total = tasks.length
  const inProgress = tasks.filter((task) => task.status === 'In progress').length
  const completed = tasks.filter((task) => task.status === 'Completed').length
  const completion = total ? Math.round((completed / total) * 100) : 0

  const filteredTasks = useMemo(() => tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.trim().toLowerCase())
    const matchesStatus = activeTab === 'All tasks' || task.status === activeTab
    const matchesPriority = priority === 'All priorities' || task.priority === priority
    return matchesSearch && matchesStatus && matchesPriority
  }), [tasks, search, activeTab, priority])

  const openCreate = () => { setEditingTask(null); setShowForm(true) }
  const openEdit = (task) => { setEditingTask(task); setShowForm(true) }
  const saveTask = (data) => {
    if (editingTask) setTasks((current) => current.map((task) => task.id === editingTask.id ? { ...data, id: editingTask.id } : task))
    else setTasks((current) => [{ ...data, id: Date.now() }, ...current])
    setShowForm(false)
    setEditingTask(null)
  }
  const deleteTask = (task) => {
    if (window.confirm(`Delete "${task.title}"? This task will be permanently removed.`)) {
      setTasks((current) => current.filter((item) => item.id !== task.id))
    }
  }
  const updateStatus = (id, status) => setTasks((current) => current.map((task) => task.id === id ? { ...task, status } : task))
  const resetFilters = () => { setSearch(''); setActiveTab('All tasks'); setPriority('All priorities') }

  return (
    <div className="app-shell">
      <Sidebar open={mobileNav} onClose={() => setMobileNav(false)} />
      <main className="main-area">
        <Header onMenu={() => setMobileNav(true)} />
        <div className="page-content">
          <div className="page-heading">
            <div><div className="eyebrow">MONDAY, NOVEMBER 23, 2026</div><h1>My Tasks <span className="heading-spark">✦</span></h1><p>Stay organised, stay focused, and make today count.</p></div>
            <button className="button button-primary add-task-button" onClick={openCreate}><Plus size={17} /> Add new task</button>
          </div>

          <section className="stats-grid" aria-label="Task statistics">
            <StatCard title="Total tasks" value={total} note="Across your workspace" icon={ListTodo} tone="violet" />
            <StatCard title="In progress" value={inProgress} note="Tasks you are working on" icon={Clock3} tone="blue" />
            <StatCard title="Completed" value={completed} note="Tasks finished so far" icon={CircleCheck} tone="green" />
            <StatCard title="Completion rate" value={`${completion}%`} note="Your overall progress" icon={TrendingUp} tone="orange" progress={completion} />
          </section>

          <FocusNotes />

          <section className="tasks-section">
            <div className="section-heading"><div><div className="eyebrow">YOUR WORK, YOUR PACE</div><h2>Task overview <span className="task-count">{filteredTasks.length}</span></h2></div><button className="button button-outline" onClick={openCreate}><Plus size={16} /> New task</button></div>
            <div className="toolbar">
              <div className="search-wrap"><Search size={17} /><input aria-label="Search tasks by title" placeholder="Search tasks..." value={search} onChange={(event) => setSearch(event.target.value)} />{search && <button onClick={() => setSearch('')} aria-label="Clear search"><X size={15} /></button>}</div>
              <div className="filter-wrap"><SlidersHorizontal size={16} /><label className="sr-only" htmlFor="priority-filter">Filter by priority</label><select id="priority-filter" value={priority} onChange={(event) => setPriority(event.target.value)}><option>All priorities</option><option>High</option><option>Medium</option><option>Low</option></select></div>
            </div>
            <div className="task-tabs" role="tablist" aria-label="Filter tasks by status">
              {tabs.map((tab) => <button key={tab} role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'tab active' : 'tab'} onClick={() => setActiveTab(tab)}>{tab}{tab === 'All tasks' && <span>{total}</span>}</button>)}
              {(search || priority !== 'All priorities' || activeTab !== 'All tasks') && <button className="clear-filters" onClick={resetFilters}>Clear filters</button>}
            </div>
            <div className="task-list-header"><span>TASK</span><span>CATEGORY</span><span>DUE DATE</span><span>PRIORITY</span><span>STATUS</span><span /></div>
            <TaskList tasks={filteredTasks} onEdit={openEdit} onDelete={deleteTask} onStatus={updateStatus} />
          </section>
          <footer className="page-footer"><span>Made for a more focused day.</span><span>FocusBoard <b>·</b> 2026</span></footer>
        </div>
      </main>
      {showForm && <TaskForm task={editingTask} onSave={saveTask} onClose={() => { setShowForm(false); setEditingTask(null) }} />}
    </div>
  )
}
