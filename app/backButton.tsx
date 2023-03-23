import { useRouter } from 'next/navigation'

export default function BackButton() {
  const router = useRouter()

  return (
    <div className='mt-4 ml-4'>
<button type="button" className='bg-blue-600 hover:bg-blue-800 text-center p-2 text-white text-lg '  onClick={() => router.back()}>
      go back
    </button>
    </div>
  )
}