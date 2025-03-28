
import { useState } from 'react'
import { Moon, Sun, Monitor, Volume2, VolumeX, Bell, BellOff } from 'lucide-react'
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { Slider } from './ui/slider'

export function Settings() {
  const { settings, updateSettings, projects } = useFocusStore()
  const [activeTab, setActiveTab] = useState<'timer' | 'appearance' | 'tasks' | 'notifications'>('timer')

  const tabs = [
    { id: 'timer', label: 'Timer' },
    { id: 'appearance', label: 'Appearance' },
    { id: 'tasks', label: 'Tasks' },
    { id: 'notifications', label: 'Notifications' },
  ] as const

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 px-4 py-2 text-sm font-medium rounded-md transition-colors
              ${activeTab === tab.id
                ? 'bg-white shadow text-gray-900'
                : 'text-gray-500 hover:text-gray-900'
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Timer Settings */}
      {activeTab === 'timer' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Focus Duration (minutes)
            </label>
            <Input
              type="number"
              value={settings.timer.focusDuration / 60}
              onChange={(e) => updateSettings({
                timer: {
                  ...settings.timer,
                  focusDuration: parseInt(e.target.value) * 60
                }
              })}
              min={1}
              max={120}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Short Break Duration (minutes)
            </label>
            <Input
              type="number"
              value={settings.timer.shortBreakDuration / 60}
              onChange={(e) => updateSettings({
                timer: {
                  ...settings.timer,
                  shortBreakDuration: parseInt(e.target.value) * 60
                }
              })}
              min={1}
              max={30}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Break Duration (minutes)
            </label>
            <Input
              type="number"
              value={settings.timer.longBreakDuration / 60}
              onChange={(e) => updateSettings({
                timer: {
                  ...settings.timer,
                  longBreakDuration: parseInt(e.target.value) * 60
                }
              })}
              min={1}
              max={60}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Long Break Interval (sessions)
            </label>
            <Input
              type="number"
              value={settings.timer.longBreakInterval}
              onChange={(e) => updateSettings({
                timer: {
                  ...settings.timer,
                  longBreakInterval: parseInt(e.target.value)
                }
              })}
              min={1}
              max={10}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Sound Notifications</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateSettings({
                timer: {
                  ...settings.timer,
                  soundEnabled: !settings.timer.soundEnabled
                }
              })}
            >
              {settings.timer.soundEnabled ? (
                <Volume2 className="h-5 w-5" />
              ) : (
                <VolumeX className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Appearance Settings */}
      {activeTab === 'appearance' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Theme
            </label>
            <div className="flex space-x-2">
              <Button
                variant={settings.appearance.theme === 'light' ? 'default' : 'outline'}
                onClick={() => updateSettings({
                  appearance: { ...settings.appearance, theme: 'light' }
                })}
                className="flex-1"
              >
                <Sun className="h-4 w-4 mr-2" />
                Light
              </Button>
              <Button
                variant={settings.appearance.theme === 'dark' ? 'default' : 'outline'}
                onClick={() => updateSettings({
                  appearance: { ...settings.appearance, theme: 'dark' }
                })}
                className="flex-1"
              >
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </Button>
              <Button
                variant={settings.appearance.theme === 'system' ? 'default' : 'outline'}
                onClick={() => updateSettings({
                  appearance: { ...settings.appearance, theme: 'system' }
                })}
                className="flex-1"
              >
                <Monitor className="h-4 w-4 mr-2" />
                System
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              View Mode
            </label>
            <div className="flex space-x-2">
              <Button
                variant={settings.appearance.viewMode === 'compact' ? 'default' : 'outline'}
                onClick={() => updateSettings({
                  appearance: { ...settings.appearance, viewMode: 'compact' }
                })}
                className="flex-1"
              >
                Compact
              </Button>
              <Button
                variant={settings.appearance.viewMode === 'comfortable' ? 'default' : 'outline'}
                onClick={() => updateSettings({
                  appearance: { ...settings.appearance, viewMode: 'comfortable' }
                })}
                className="flex-1"
              >
                Comfortable
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Task Settings */}
      {activeTab === 'tasks' && (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Default Project
            </label>
            <Select
              value={settings.tasks.defaultProjectId || ''}
              onValueChange={(value) => updateSettings({
                tasks: { ...settings.tasks, defaultProjectId: value }
              })}
            >
              <option value="">No default project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sort Tasks By
            </label>
            <Select
              value={settings.tasks.sortBy}
              onValueChange={(value: 'impact' | 'urgency' | 'custom') => updateSettings({
                tasks: { ...settings.tasks, sortBy: value }
              })}
            >
              <option value="impact">Impact</option>
              <option value="urgency">Urgency</option>
              <option value="custom">Custom Order</option>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Auto-archive completed tasks after (days)
            </label>
            <Input
              type="number"
              value={settings.tasks.autoArchiveDays}
              onChange={(e) => updateSettings({
                tasks: {
                  ...settings.tasks,
                  autoArchiveDays: parseInt(e.target.value)
                }
              })}
              min={1}
              max={365}
              className="w-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Show Completed Tasks</span>
            <Button
              variant={settings.tasks.showCompleted ? 'default' : 'outline'}
              onClick={() => updateSettings({
                tasks: {
                  ...settings.tasks,
                  showCompleted: !settings.tasks.showCompleted
                }
              })}
            >
              {settings.tasks.showCompleted ? 'Visible' : 'Hidden'}
            </Button>
          </div>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Timer Notifications</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateSettings({
                notifications: {
                  ...settings.notifications,
                  timerEnabled: !settings.notifications.timerEnabled
                }
              })}
            >
              {settings.notifications.timerEnabled ? (
                <Bell className="h-5 w-5" />
              ) : (
                <BellOff className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Task Due Reminders</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateSettings({
                notifications: {
                  ...settings.notifications,
                  taskRemindersEnabled: !settings.notifications.taskRemindersEnabled
                }
              })}
            >
              {settings.notifications.taskRemindersEnabled ? (
                <Bell className="h-5 w-5" />
              ) : (
                <BellOff className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Daily Summary</span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => updateSettings({
                notifications: {
                  ...settings.notifications,
                  dailySummaryEnabled: !settings.notifications.dailySummaryEnabled
                }
              })}
            >
              {settings.notifications.dailySummaryEnabled ? (
                <Bell className="h-5 w-5" />
              ) : (
                <BellOff className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}