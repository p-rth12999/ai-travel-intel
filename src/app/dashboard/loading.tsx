import { Loader2 } from 'lucide-react'

export default function DashboardLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#DEEDFC]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  )
}