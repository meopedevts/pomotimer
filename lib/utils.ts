import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function playAlarm(command: string) {
  const audio = new Audio('/public/assets/music/alarm_clock_old.mp3')

  if (command === 'play') {
    audio.play()
  } else {
    audio.pause()
  }
}
