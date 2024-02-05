import {
  Cog6ToothIcon,
  KeyIcon,
  ChartBarIcon,
  CommandLineIcon,
  DocumentTextIcon,
} from "@heroicons/react/24/outline"

export const navigation = [
  { name: "API keys", segment: "keys", icon: KeyIcon },
  { name: "Usage", segment: null, icon: ChartBarIcon },
  { name: "Settings", segment: null, icon: Cog6ToothIcon },
]

export const resources = [
  {
    id: 1,
    name: "Playground",
    href: "/api/graphql",
    icon: CommandLineIcon,
  },
  {
    id: 2,
    name: "Docs",
    href: "/docs",
    icon: DocumentTextIcon,
  },
]
