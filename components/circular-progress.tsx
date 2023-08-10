import React, { ReactNode } from 'react'

type PropsType = {
  percentage: number
  children?: ReactNode
}

const CircularProgress = ({ percentage, children }: PropsType) => {
  const radius = 140
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percentage / 100) * circumference

  return (
    <>
      <svg className="progress-ring absolute" height="320" width="320">
        <circle
          className="progress-ring__circle bg-zinc-100"
          stroke="rgb(39 39 42)"
          stroke-width="20"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="160"
          cy="160"
        />
        <circle
          className="progress-ring__bar"
          stroke="rgb(244 244 245)"
          stroke-width="20"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="160"
          cy="160"
          stroke-dasharray={`${circumference} ${circumference}`}
          stroke-dashoffset={offset}
        />
      </svg>
      {children}
    </>
  )
}

export default CircularProgress
