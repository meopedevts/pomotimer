import Header from '@/components/header'
import Pomodoro from '@/components/pomodoro'

export default function Home() {
  return (
    <main className="bg-zinc-950 text-zinc-100 h-screen w-full">
      <Header />
      <Pomodoro />
    </main>
  )
}
