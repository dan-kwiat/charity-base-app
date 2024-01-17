export interface ApiKey {
  id: string
  createdAt: string
  roles: Array<"basic" | "download"> // and admin?
}
