import { MdSettings } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { IconType } from 'react-icons'
import Link from 'next/link'

type navButtonsType = {
  label: string
  icon: IconType
}

const navButtons: navButtonsType[] = [
  {
    label: 'Settings',
    icon: MdSettings,
  },
  {
    label: 'Login',
    icon: FaUserCircle,
  },
]

const Header = () => {
  return (
    <header className="flex justify-center border-b-[1px] border-b-zinc-900">
      <nav className="flex-1 flex h-16 sm:max-w-md md:max-w-lg lg:max-w-2xl px-4 items-center">
        <div>
          {/* <AlarmCheck width={24} height={24} /> */}
          <span className="text-xl font-semibold">PomoTimer</span>
        </div>
        <div className="flex-1 flex justify-end gap-2">
          {navButtons.map((button) => (
            <Link href="/" key={button.label}>
              <Button
                size={'icon'}
                className="bg-zinc-900 hover:bg-zinc-900 md:hidden"
              >
                <button.icon size={24} />
              </Button>
            </Link>
          ))}
          {navButtons.map((button) => (
            <Link href="/" key={button.label}>
              <Button
                key={button.label}
                className="bg-zinc-900 hover:bg-zinc-900 max-md:hidden w-32 gap-2"
              >
                <button.icon size={16} />
                <span>{button.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Header
