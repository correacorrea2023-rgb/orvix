import {
  Briefcase,
  Rocket,
  Folder,
  Sparkles,
  Building2,
  Landmark,
  type LucideIcon,
} from 'lucide-react'

export const WORKSPACE_ICONS: Record<string, LucideIcon> = {
  briefcase: Briefcase,
  rocket: Rocket,
  folder: Folder,
  sparkles: Sparkles,
  building: Building2,
  landmark: Landmark,
}

export const DEFAULT_WORKSPACE_ICON = 'briefcase'

export function getWorkspaceIcon(icon: string | null): LucideIcon {
  return WORKSPACE_ICONS[icon ?? ''] ?? WORKSPACE_ICONS[DEFAULT_WORKSPACE_ICON]
}
