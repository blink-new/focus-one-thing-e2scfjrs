
import { ListTodo, History, Settings as SettingsIcon } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export function Navigation() {
  const location = useLocation()

  const links = [
    { to: '/', icon: ListTodo, label: 'Tasks' },
    { to: '/history', icon: History, label: 'History' },
    { to: '/settings', icon: SettingsIcon, label: 'Settings' },
  ]

  return (
    <nav className="flex items-center justify-center space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
      {links.map(({ to, icon: Icon, label }) => {
        const isActive = location.pathname === to
        return (
          <Link
            key={to}
            to={to}
            className={`flex items-center px-4 py-2 rounded-md transition-colors
              ${isActive
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
              }`}
          >
            <Icon className="h-5 w-5 mr-2" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}