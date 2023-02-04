import React, { useEffect, useState } from 'react'
import { Popover } from '@headlessui/react'
import Link from 'next/link'
import { AiOutlineUser, AiOutlineClose, AiOutlineShoppingCart, AiOutlineMenu } from  'react-icons/ai'

import { useLogoutMutation, useMeQuery } from '@/generated/graphql'
import { ThemeChanger } from './ThemeChanger'
import { TopHeader } from './TopHeader'
import { toast } from 'react-hot-toast'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [mounted, setMounted] = useState<boolean>(false)

    const [{ data }] = useMeQuery({
        pause: !mounted
    })
    const [, logout] = useLogoutMutation()

    useEffect(() => {
        setMounted(true)
    }, [])


    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeTab, setActiveTab] = useState('store')

    const navigation = {
        pages: [
            { name: 'Support', href:"/support" }
        ],
        categories: [
            {
                id: 'store',
                name: 'Store',
                sections: [
                    { name: 'Home', href: '/store' },
                    { name: 'Wishlist', href: '/store/wishlist' },
                    { name: 'News', href: '/store/news' },
                    { name: 'About', href: '/store/about' },
                ]
            },
            {
                id: 'community',
                name: 'Community',
                sections: [
                    { name: 'Home', href: '/community' },
                    { name: 'Discussions', href: '/community/discussions' },
                    { name: 'Workshop', href: '/community/workshop' },
                    { name: 'Market', href: '/community/market' }
                ]
            }
        ]
    }
    
    return (
        <>
           <div className="sticky top-0 w-full bg-white">
      
            {/* STORE NAVIGATION (SMALL DEVICE) */}
            <div className="md:hidden">

                {/* Overlay Background */}
                <div onClick={() => setIsMenuOpen(false)} className={`z-30 fixed inset-0 w-full h-screen bg-gray-500 bg-opacity-75 ${isMenuOpen ? "visible" : "invisible"}`} />

                {/* Mobile Menu */}
                <div className={`z-50 fixed top-0 left-0 lg:inset-0 lg:relative w-full h-full max-h-screen max-w-xs lg:overflow-auto bg-base-200 transition-all duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}`}>
                <div className="flex flex-col">
                    {/* Close menu button */}
                    
                    <div className="flex justify-between">
                        <a href="/" className="flex items-center pt-2">
                            <div className="w-10 h-10 inline-flex justify-center items-center rounded-full">
                            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 10.031v-6.423l-6.036-3.608-5.964 3.569v6.499l-6 3.224v7.216l6.136 3.492 5.864-3.393 5.864 3.393 6.136-3.492v-7.177l-6-3.3zm-1.143.036l-4.321 2.384v-4.956l4.321-2.539v5.111zm-4.895-8.71l4.272 2.596-4.268 2.509-4.176-2.554 4.172-2.551zm-10.172 12.274l4.778-2.53 4.237 2.417-4.668 2.667-4.347-2.554zm4.917 3.587l4.722-2.697v5.056l-4.722 2.757v-5.116zm6.512-3.746l4.247-2.39 4.769 2.594-4.367 2.509-4.649-2.713zm9.638 6.323l-4.421 2.539v-5.116l4.421-2.538v5.115z"/></svg>
                            </div>
                            <span className="text-base font-medium">Homster</span>
                        </a>
                    <span className="p-5 flex">
                        <button onClick={() => setIsMenuOpen(false)}>
                        <AiOutlineClose className="w-6 h-6"/>
                        </button>
                    </span>
                    </div>
                    {/* Tab button */}
                    <div className="grid grid-cols-2">
                    {navigation.categories.map(category => (
                        <button key={category.id} className={`col-span-1 p-5 ${category.id === activeTab ? "border-b-primary border-b-2 text-primary" : ""} text-center text-lg  font-semibold`} onClick={() => setActiveTab(category.id)}>{category.name}</button>
                    ))
                    }
                    </div>
                    {/* Tab content */}
                    <div className="py-8 px-4 flex flex-col">
                    {navigation.categories
                        .filter(category => category.id === activeTab)
                        .map(category => (
                        <div key={category.id} className="grid grid-cols-2 gap-x-2 gap-y-4">
                            {category.sections.map((item, index) => (
                            <Link key={item.name} href={item.href} className={`btn btn-primary btn-ghost ${index === 0 ? "text-primary" : "hover:text-primary"}`}>{item.name}</Link>
                            ))
                            }
                        </div>
                        ))
                    }
                    </div>
                    {/* Company infos */}
                    <div className="py-5 px-4 flex flex-col space-y-2 border-t-2 border-base-content">
                    {navigation.pages.map((page, index) => (
                        <Link key={index} href={page.href} className="py-1 px-4 rounded-md text-base font-semibold tracking-wide btn btn-primary btn-ghost">{page.name}</Link>
                    ))
                    }
                    </div>
                  
                </div>
                </div>

            </div>



            {/* STORE NAVIGATION (big device) */}
            <header className="relative">

            {/* EVENT BANNER (eg. Winter Sale) */}
            {/* <TopHeader/> */}

                {/* Main Menu */}
                <div className="relative py-4 px-4 bg-base-300">
                <div className="mx-auto max-w-6xl flex justify-between items-center">
                    
                    {/* Container */}
                    <div className="flex items-center space-x-4">
                    {/* Site logo & Burger icon */}
                    <div className="flex items-center">
                        {/* Burger button (small device) */}
                        <button className="md:hidden mr-4" aria-label="open navigation menu" onClick={() => setIsMenuOpen(true)}>
                        <AiOutlineMenu className="w-6 h-6"/>
                        </button>
                        {/* logo  */}
                        <a href="/" className="flex items-center">
                            <div className="w-10 h-10 inline-flex justify-center items-center rounded-full">
                            <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18 10.031v-6.423l-6.036-3.608-5.964 3.569v6.499l-6 3.224v7.216l6.136 3.492 5.864-3.393 5.864 3.393 6.136-3.492v-7.177l-6-3.3zm-1.143.036l-4.321 2.384v-4.956l4.321-2.539v5.111zm-4.895-8.71l4.272 2.596-4.268 2.509-4.176-2.554 4.172-2.551zm-10.172 12.274l4.778-2.53 4.237 2.417-4.668 2.667-4.347-2.554zm4.917 3.587l4.722-2.697v5.056l-4.722 2.757v-5.116zm6.512-3.746l4.247-2.39 4.769 2.594-4.367 2.509-4.649-2.713zm9.638 6.323l-4.421 2.539v-5.116l4.421-2.538v5.115z"/></svg>
                            </div>
                            <span className="text-base font-medium pr-5">Homster</span>
                        </a>
                        
                    </div>
                    {/* Navigation */}
                    <nav aria-label="navigation menu">
                        <Popover.Group className="hidden md:block">
                        <ul className="flex items-center space-x-10 text-base font-medium">
                            {/* Dropdown categories */}
                            {navigation.categories.map(category => (
                                <li key={category.id} className="group">
                                <Popover>
                                    {({ open }) => (
                                    <>
                                        <Popover.Button className={`inline-flex items-baseline ${open ? "text-primary" : "group-hover:text-primary"}`}>
                                        {category.name}
                                        <svg className={`ml-1.5 w-2.5 h-2.5 ${open ? "" : "group-hover:text-primary"} fill-current`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z"/></svg>
                                        </Popover.Button>
                                        {/* Flyout menu */}
                                        <Popover.Panel className={`bg-base-200 absolute top-full left-0 py-3 px-5 w-full flex justify-start shadow-sm`}>
                                        <ul className="mx-auto w-full max-w-5xl flex">
                                            {category.sections.map((section, index) => (
                                            <li key={section.name} className={`${index !== 0 && "border-l-2 border-primary"}`}>
                                                <Link href={section.href} className={`py-3 px-4 text-sm font-semibold whitespace-nowrap hover:text-primary`}>{section.name}</Link>
                                            </li>
                                            ))
                                            }
                                        </ul>
                                        </Popover.Panel>
                                    </>
                                    )}
                                </Popover>
                                </li>
                            ))
                            }
                            {/* Regular pages */}
                            {navigation.pages.map(page => (
                            <li key={page.name}>
                                <Link href={page.href} className="hover:text-primary">{page.name}</Link>
                            </li>
                            ))
                            }
                        </ul>
                        </Popover.Group>
                    </nav>
                    </div>

                    {/* Cart & User */}
                    <div className="inline-flex items-center">
                        
                    {/* Cart */}
                    <ThemeChanger />
                    <Link href="/store/cart" className="px-4 inline-flex items-center">
                        <AiOutlineShoppingCart className="w-6 h-6"/>
                        <span className="ml-2 text-base font-semibold">0</span>
                    </Link>
                    {/* User */}
                    <div className="px-4 border-l-2 border-primary dropdown dropdown-end">
                            <label tabIndex={0}><AiOutlineUser className="w-6 h-6 cursor-pointer"/></label>
                            <ul tabIndex={0} className="menu dropdown-content p-2 shadow bg-base-200 rounded-box w-52 mt-4">
                                {mounted && data && !data.me &&
                                    <>
                                        <li><Link href={`/login`}>Log in</Link></li>
                                    </>
                                }
                                {mounted && !data &&
                                    <>
                                        <li><Link href={`/login`}>Log in</Link></li>
                                    </>
                                }
                                {mounted && data && data.me && data.me.user &&
                                    <>
                                        <li><Link href={`/profile`}>{data.me.user.displayName}</Link></li>
                                        <li>
                                            <button 
                                                onClick={() => { 
                                                    logout({})
                                                    toast.success('Logged out') 
                                                }}
                                            >
                                            Log out
                                            </button>
                                        </li>
                                    </>
                                }
                            </ul>
                    </div>
                    
                    </div>

                </div>
                </div>

            </header>

            </div>
        </>
    )
}