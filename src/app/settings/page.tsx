import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Sidebar from '@/components/dashboard/Sidebar'
import Image from 'next/image'

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <div className="flex flex-col min-h-screen bg-[#DEEDFC] lg:flex-row">
      <Sidebar />
      <div className="flex flex-1 flex-col items-center justify-center p-6 text-center lg:p-8">
        <h1 className="mb-6 text-2xl font-semibold text-gray-900">Koi meri bhi setting kara do</h1>
        <Image
          src="/images/settings-photo.jpeg"
          alt="Settings coming soon"
          width={360}
          height={360}
          className="max-w-full rounded-2xl object-contain"
        />
      </div>
    </div>
  )
}