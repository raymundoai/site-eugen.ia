import { AppWindow, Bot, Compass, Plug, Search, Workflow } from 'lucide-react'

const fallbackIcon = Bot

const serviceIconMap = {
  workflow: Workflow,
  bot: Bot,
  compass: Compass,
  plug: Plug,
  search: Search,
  app: AppWindow,
}

export function resolveServiceIcon(iconKey) {
  return serviceIconMap[iconKey] || fallbackIcon
}
