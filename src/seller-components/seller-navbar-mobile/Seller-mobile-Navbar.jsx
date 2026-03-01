'use client'

import { Fragment, useEffect, useState } from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    Menu,
    MenuButton,
    MenuItem,
    MenuItems,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
    Tab,
    TabGroup,
    TabList,
    TabPanel,
    TabPanels,
} from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { Avatar, Modal } from '@mui/material'
import Cookies from 'js-cookie'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'
import AuthModal from '@/components/Modal/AuthModal'


export default function SellermobileNavbar() {
    const [open, setOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [tokenPresent, setTokenPresent] = useState(false);
    const router = useRouter();


    // useEffect(() => {  
    //   const usertoken=Cookies.get("usertoken");
    //  {usertoken?setTokenPresent(true):setTokenPresent(false)}
    //  },[])

    const [openModal, setOpenModal] = useState(false);
    const [page, setPage] = useState('');

    const handleClose = () => {
        setOpenModal(false);
    };

    return (
        <>
            <div className="bg-background text-foreground  sticky top-0 z-1 md:hidden">
                {/* Mobile menu */}
                <Dialog open={open} onClose={setOpen} className="relative z-40 lg:hidden">
                    <DialogBackdrop
                        transition
                        className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                    />
                    <div className="fixed inset-0 z-40 flex">
                        <DialogPanel
                            transition
                            className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-background text-foreground  pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
                        >
                            <div className="flex px-4 pt-5 pb-2">
                                <button
                                    type="button"
                                    onClick={() => setOpen(false)}
                                    className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-foreground"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Close menu</span>
                                    <XMarkIcon aria-hidden="true" className="size-6" />
                                </button>
                            </div>


                            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                <div className="flex flex-col space-y-3">
                                    <a
                                        href="/account"
                                        className="font-md text-md text-gray-800 hover:text-yellow transition"
                                    >
                                        Profile
                                    </a>
                                    <a
                                        href="/setting"
                                        className="font-md text-md text-gray-800 hover:text-yellow transition"
                                    >
                                        Setting
                                    </a>
                                    <a
                                        href="/orders"
                                        className="font-md text-md text-gray-800 hover:text-yellow transition"
                                    >
                                        Orders
                                    </a>
                                    <button
                                        onClick={() => { setTokenPresent(false) }}
                                        className="font-md text-md text-red-600 hover:text-red-800 transition text-left"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>





                        </DialogPanel>
                    </div>
                </Dialog>

                <header className="relative bg-background text-foreground ">


                    <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="border-b border-gray-200">
                            <div className="flex h-16 items-center">
                                <button
                                    type="button"
                                    onClick={() => setOpen(true)}
                                    className="relative rounded-md bg-background text-foreground  p-2 text-foreground lg:hidden"
                                >
                                    <span className="absolute -inset-0.5" />
                                    <span className="sr-only">Open menu</span>
                                    <Bars3Icon aria-hidden="true" className="size-6" />
                                </button>

                                {/* Logo */}
                                <div className="ml-4 flex lg:ml-0">
                                    <a href="/">
                                        <span className="sr-only">Your Company</span>
                                        <img
                                            alt=""
                                            src="/QuickLogo.png"
                                            className="h-8 w-auto"
                                        />
                                    </a>
                                </div>




                            </div>
                        </div>
                    </nav>
                </header>
            </div>

            <AuthModal openModal={openModal} setOpenModal={setOpenModal} page={page} setPage={setPage} />
        </>

    )
}
