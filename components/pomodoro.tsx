'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCallback, useEffect, useState } from 'react'
import { cn, playAlarm } from '@/lib/utils'
import CircularProgress from '@/components/circular-progress'
import { AiOutlineReload } from 'react-icons/ai'

type optionsType = {
  label: string
  id: number
  timerVal: number
}

type buttonCallbackType = {
  id: number
  timerVal: number
}

const options: optionsType[] = [
  {
    label: 'Pomodoro',
    id: 1,
    timerVal: 25,
  },
  {
    label: 'Short Break',
    id: 2,
    timerVal: 0.5,
  },
  {
    label: 'Long Break',
    id: 3,
    timerVal: 15,
  },
]

const Pomodoro = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [activeButton, setActiveButton] = useState(1)
  const [activeTimer, setActiveTimer] = useState(false)
  const [reloadTimer, setReloadTimer] = useState(false)
  const [timer, setTimer] = useState(25)
  const [timeLeft, setTimeLeft] = useState(timer * 60)
  const [progress, setProgress] = useState(100)

  const handleStartTimer = () => {
    setActiveTimer(!activeTimer)
  }

  const handleSetActiveButton = useCallback(
    ({ id, timerVal }: buttonCallbackType) => {
      playAlarm('stop')
      setActiveButton(id)
      setTimer(timerVal)
      setActiveTimer(false)
      setTimeLeft(timerVal * 60)
      setProgress(100)
    },
    [],
  )

  const handleReloadTimer = () => {
    setReloadTimer(false)
    setTimer(timer)
    setTimeLeft(timer * 60)
    setProgress(100)
  }

  useEffect(() => {
    let timerId: any
    let alarmId: any

    if (activeTimer && timeLeft > 0 && !reloadTimer) {
      timerId = setInterval(() => {
        const newTimeLeft = timeLeft - 1
        setTimeLeft(newTimeLeft)
        setProgress((newTimeLeft / (timer * 60)) * 100)
      }, 1000)
    } else {
      clearInterval(timerId)
    }

    if (timeLeft === 0) {
      setProgress(0)
      setActiveTimer(false)
      setReloadTimer(true)
      alarmId = setInterval(() => {
        playAlarm('play')
      }, 30000)
      playAlarm('play')
    } else {
      clearInterval(alarmId)
    }

    return () => {
      clearInterval(timerId)
      clearInterval(alarmId)
    }
  }, [activeTimer, timeLeft, timer, reloadTimer])

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <main className="flex justify-center mt-10">
      <Card className="bg-transparent border-zinc-900 w-full flex flex-col h-[480px] sm:max-w-sm md:max-w-md lg:max-w-xl p-4 mx-4 md:mx-0">
        <CardHeader className="w-full h-10 items-center justify-center">
          <div className="text-zinc-100 w-full flex justify-around">
            {options.map((op) => {
              return (
                <Button
                  key={op.label}
                  className={cn(
                    'bg-transparent hover:bg-zinc-900 px-6 py-2',
                    activeButton === op.id ? 'bg-zinc-900' : '',
                  )}
                  onClick={() => {
                    const id = op.id
                    const timerVal = op.timerVal
                    handleSetActiveButton({ id, timerVal })
                  }}
                >
                  {op.label}
                </Button>
              )
            })}
          </div>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center pt-5">
          <CircularProgress percentage={progress}>
            <span className="flex items-center justify-center text-center text-zinc-100 text-7xl">
              {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
              {timeLeft % 60}
            </span>
          </CircularProgress>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          {!reloadTimer ? (
            <Button
              onClick={handleStartTimer}
              className="bg-zinc-100 hover:bg-zinc-100/80 transition-colors text-zinc-900 font-semibold text-lg w-48 py-6"
            >
              {activeTimer ? 'PAUSE' : 'START'}
            </Button>
          ) : (
            <Button
              onClick={handleReloadTimer}
              className="bg-zinc-100 hover:bg-zinc-100/80 transition-colors text-zinc-900 font-semibold text-2xl w-48 py-6"
            >
              <AiOutlineReload />
            </Button>
          )}
        </CardFooter>
      </Card>
    </main>
  )
}

export default Pomodoro
