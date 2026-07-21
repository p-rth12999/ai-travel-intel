'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { User } from 'lucide-react'

export default function ProfileForm({
  email,
  username: initialUsername,
  avatarUrl: initialAvatarUrl,
}: {
  email: string
  username: string
  avatarUrl: string
}) {
  const [username, setUsername] = useState(initialUsername)
  const [avatarUrl, setAvatarUrl] = useState(initialAvatarUrl)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const router = useRouter()
  const supabase = createClient()

  async function handleSave() {
    setSaving(true)
    setMessage(null)
    const { error } = await supabase.auth.updateUser({ data: { username } })
    setSaving(false)
    if (error) {
      setMessage(`Error: ${error.message}`)
      return
    }
    setMessage('Saved!')
    router.refresh()
  }

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    setMessage(null)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setUploading(false); return }

    const filePath = `${user.id}/${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('avatars')
      .upload(filePath, file, { upsert: true })

    if (uploadError) {
      setUploading(false)
      setMessage(`Upload failed: ${uploadError.message}`)
      return
    }

    const { data: publicUrlData } = supabase.storage.from('avatars').getPublicUrl(filePath)
    const publicUrl = publicUrlData.publicUrl

    const { error: updateError } = await supabase.auth.updateUser({
      data: { avatar_url: publicUrl },
    })

    setUploading(false)

    if (updateError) {
      setMessage(`Error saving avatar: ${updateError.message}`)
      return
    }

    setAvatarUrl(publicUrl)
    setMessage('Profile picture updated!')
    router.refresh()
  }

  return (
    <div className="max-w-lg rounded-3xl border border-white bg-white/80 p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => fileInputRef.current?.click()}
          className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-blue-100 text-blue-600 transition hover:opacity-80"
          disabled={uploading}
        >
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={avatarUrl} alt="Profile picture" className="h-full w-full object-cover" />
          ) : (
            <User className="h-8 w-8" />
          )}
        </button>
        <div>
          <p className="text-sm font-medium text-gray-900">Profile picture</p>
          <button
            onClick={() => fileInputRef.current?.click()}
            className="text-sm text-blue-600 hover:underline"
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Click to change'}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
        <input
          value={email}
          disabled
          className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-500"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block text-sm font-medium text-gray-700">Username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {message && <p className="mb-3 text-sm text-gray-600">{message}</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="rounded-full bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
      >
        {saving ? 'Saving...' : 'Save changes'}
      </button>
    </div>
  )
}