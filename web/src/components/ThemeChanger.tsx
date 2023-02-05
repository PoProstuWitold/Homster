import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Switch } from '@headlessui/react'

interface ThemeChangerProps {}

export const ThemeChanger: React.FC<ThemeChangerProps> = ({}) => {
    const [mounted, setMounted] = useState<boolean>(false)
    const { theme, setTheme } = useTheme()

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <>
            {mounted && 
            <Switch
                checked={theme === 'dark'}
                onChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`${
                    theme === 'dark' ? 'bg-primary' : 'bg-primary'
                } relative inline-flex h-6 w-11 items-center rounded-full mx-5`}
                >
                <span className="sr-only">Enable notifications</span>
                <span
                    className={`${
                        theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                />
            </Switch>
            }
            {!mounted &&
                <Switch
                checked={false}
                className={`${
                    theme === 'dark' ? 'bg-primary' : 'bg-primary'
                } relative inline-flex h-6 w-11 items-center rounded-full mx-5`}
                >
            </Switch>
            }
        </>
    )
}