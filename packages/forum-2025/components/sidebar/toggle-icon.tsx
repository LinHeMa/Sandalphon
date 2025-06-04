import React from 'react'

type ToggleIconProps = {
  pathColor: string
}

export function ToggleIcon({ pathColor }: ToggleIconProps) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="7"
        y1="9"
        x2="21"
        y2="9"
        stroke={pathColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="13"
        x2="21"
        y2="13"
        stroke={pathColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="7"
        y1="17"
        x2="21"
        y2="17"
        stroke={pathColor}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}
