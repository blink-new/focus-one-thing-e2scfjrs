
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Monitor, Volume2, VolumeX, Bell, BellOff } from 'lucide-react'
import { useFocusStore } from '../lib/store'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Select } from './ui/select'
import { cn } from '../lib/utils'
import { useTheme } from './ThemeProvider'

function SettingSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-lg p-6 shadow-sm border space-y-4"
    >
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </motion.section>
  )
}

function SettingRow({ 
  label, 
  children 
}: { 
  label: string
  children: React.ReactNode 
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      {children}
    </div>
  )
}

export function Settings() {
  const { settings, updateSettings, projects } = useFocusStore()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Handle hydration mismatch for theme
  useEffect(() => {
    setMounted(true)
  }, [])

  // Initialize settings if they don't exist
  useEffect(() => {
    if (!settings?.timer || !settings?.tasks || !settings?.notifications) {
      updateSettings({
        timer: {
          focusDuration: 25 * 60,
          shortBreakDuration: 5 * 60,
          longBreakDuration: 15 * 60,
          longBreakInterval: 4,
          soundEnabled: true
        },
        tasks: {
          defaultProjectId: null,
          autoArchiveDays: 30,
          showCompleted: true
        },
        notifications: {
          timerEnabled: true,
          taskRemindersEnabled: true
        }
      })
    }
  }, [settings, updateSettings])

  if (!mounted) {
    return null
  }

  const formatMinutes = (seconds: number) => Math.floor(seconds / 60)

  // Ensure settings are initialized before rendering
  if (!settings?.timer || !settings?.tasks || !settings?.notifications) {
    return null
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Customize your focus experience.
        </p>
      </div>

      <div className="space-y-6">
        <SettingSection title="Appearance">
          <div className="space-y-4">
            <SettingRow label="Theme">
              <div className="flex space-x-2">
                <Button
                  variant={theme === 'light' ? 'default' : 'outline'}
                  onClick={() => setTheme('light')}
                  className="flex-1"
                  size="sm"
                >
                  <Sun className="h-4 w-4 mr-2" />
                  Light
                </Button>
                <Button
                  variant={theme === 'dark' ? 'default' : 'outline'}
                  onClick={() => setTheme('dark')}
                  className="flex-1"
                  size="sm"
                >
                  <Moon className="h-4 w-4 mr-2" />
                  Dark
                </Button>
                <Button
                  variant={theme === 'system' ? 'default' : 'outline'}
                  onClick={() => setTheme('system')}
                  className="flex-1"
                  size="sm"
                >
                  <Monitor className="h-4 w-4 mr-2" />
                  System
                </Button>
              </div>
            </SettingRow>
          </div>
        </SettingSection>

        <SettingSection title="Timer">
          <div className="space-y-4">
            <SettingRow label="Focus Duration (minutes)">
              <Input
                type="number"
                value={formatMinutes(settings.timer.focusDuration)}
                onChange={(e) => updateSettings({
                  timer: {
                    ...settings.timer,
                    focusDuration: parseInt(e.target.value) * 60
                  }
                })}
                min={1}
                max={120}
                className="w-24"
              />
            </SettingRow>

            <SettingRow label="Short Break Duration (minutes)">
              <Input
                type="number"
                value={formatMinutes(settings.timer.shortBreakDuration)}
                onChange={(e) => updateSettings({
                  timer: {
                    ...settings.timer,
                    shortBreakDuration: parseInt(e.target.value) * 60
                  }
                })}
                min={1}
                max={30}
                className="w-24"
              />
            </SettingRow>

            <SettingRow label="Long Break Duration (minutes)">
              <Input
                type="number"
                value={formatMinutes(settings.timer.longBreakDuration)}
                onChange={(e) => updateSettings({
                  timer: {
                    ...settings.timer,
                    longBreakDuration: parseInt(e.target.value) * 60
                  }
                })}
                min={1}
                max={60}
                className="w-24"
              />
            </SettingRow>

            <SettingRow label="Long Break Interval (sessions)">
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
                className="w-24"
              />
            </SettingRow>

            <SettingRow label="Sound Notifications">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateSettings({
                  timer: {
                    ...settings.timer,
                    soundEnabled: !settings.timer.soundEnabled
                  }
                })}
                className={cn(
                  "transition-colors",
                  settings.timer.soundEnabled 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {settings.timer.soundEnabled ? (
                  <Volume2 className="h-5 w-5" />
                ) : (
                  <VolumeX className="h-5 w-5" />
                )}
              </Button>
            </SettingRow>
          </div>
        </SettingSection>

        <SettingSection title="Tasks">
          <div className="space-y-4">
            <SettingRow label="Default Project">
              <Select
                value={settings.tasks.defaultProjectId || ''}
                onValueChange={(value) => updateSettings({
                  tasks: { ...settings.tasks, defaultProjectId: value || null }
                })}
                className="w-48"
              >
                <option value="">No default</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </Select>
            </SettingRow>

            <SettingRow label="Auto-archive completed tasks after (days)">
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
                className="w-24"
              />
            </SettingRow>

            <SettingRow label="Show Completed Tasks">
              <Button
                variant={settings.tasks.showCompleted ? 'default' : 'outline'}
                onClick={() => updateSettings({
                  tasks: {
                    ...settings.tasks,
                    showCompleted: !settings.tasks.showCompleted
                  }
                })}
                size="sm"
              >
                {settings.tasks.showCompleted ? 'Visible' : 'Hidden'}
              </Button>
            </SettingRow>
          </div>
        </SettingSection>

        <SettingSection title="Notifications">
          <div className="space-y-4">
            <SettingRow label="Timer Notifications">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateSettings({
                  notifications: {
                    ...settings.notifications,
                    timerEnabled: !settings.notifications.timerEnabled
                  }
                })}
                className={cn(
                  "transition-colors",
                  settings.notifications.timerEnabled 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {settings.notifications.timerEnabled ? (
                  <Bell className="h-5 w-5" />
                ) : (
                  <BellOff className="h-5 w-5" />
                )}
              </Button>
            </SettingRow>

            <SettingRow label="Task Due Reminders">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => updateSettings({
                  notifications: {
                    ...settings.notifications,
                    taskRemindersEnabled: !settings.notifications.taskRemindersEnabled
                  }
                })}
                className={cn(
                  "transition-colors",
                  settings.notifications.taskRemindersEnabled 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
              >
                {settings.notifications.taskRemindersEnabled ? (
                  <Bell className="h-5 w-5" />
                ) : (
                  <BellOff className="h-5 w-5" />
                )}
              </Button>
            </SettingRow>
          </div>
        </SettingSection>
      </div>
    </div>
  )
}