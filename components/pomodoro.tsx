'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { cn } from '@/lib/utils'

type optionsType = {
  label: string
  id: number
}

const options: optionsType[] = [
  {
    label: 'Pomodoro',
    id: 1,
  },
  {
    label: 'Short Break',
    id: 2,
  },
  {
    label: 'Long Break',
    id: 3,
  },
]

const Pomodoro = () => {
  const [activeButton, setActiveButton] = useState(1)

  return (
    <main className="flex justify-center mt-10">
      <Card className="bg-transparent border-zinc-900 w-full flex flex-col h-80 sm:max-w-sm md:max-w-md lg:max-w-xl p-4 mx-4 md:mx-0">
        <CardHeader className="w-full h-10 items-center justify-center">
          <div className="text-zinc-100 w-full flex justify-around">
            {options.map((op) => {
              const isActive = (id: number) => {
                setActiveButton(id)
              }

              return (
                <Button
                  key={op.label}
                  className={cn(
                    'bg-transparent hover:bg-zinc-900 px-6 py-2 rounded-md',
                    activeButton === op.id ? 'bg-zinc-900' : '',
                  )}
                  onClick={() => isActive(op.id)}
                >
                  {op.label}
                </Button>
              )
            })}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-zinc-100">Agora vai saporra</div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Pomodoro
