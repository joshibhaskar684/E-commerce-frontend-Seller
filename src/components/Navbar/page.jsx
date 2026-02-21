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
import { navigation } from './components/navigation'
import { useRouter } from 'next/navigation'
import SearchBar from './components/SearchBar'
import { Avatar, Modal } from '@mui/material'
import AuthModal from '../Modal/AuthModal'
import Cookies from 'js-cookie'
import { FaUserCircle } from 'react-icons/fa'
import Link from 'next/link'


export default function Navbar() {
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
      <div className="bg-background text-foreground  sticky top-0 z-1">
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

              {
                tokenPresent?(
               <div className="space-y-6 border-t border-gray-200 px-4 py-6">
  <div className="flex flex-col space-y-3">
    <a
      href="/account"
      className="font-bold text-xl text-gray-800 hover:text-yellow transition"
    >
      Profile
    </a>
    <a
      href="/setting"
      className="font-bold text-xl text-gray-800 hover:text-yellow transition"
    >
      Setting
    </a>
    <a
      href="/orders"
      className="font-bold text-xl text-gray-800 hover:text-yellow transition"
    >
      Orders
    </a>
    <button
      onClick={() => {setTokenPresent(false)}}
      className="font-bold text-xl text-red-600 hover:text-red-800 transition text-left"
    >
      Logout
    </button>
  </div>
</div>

            ):( 
                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <button  onClick={()=>{setOpenModal(true), setPage('login')}} className="-m-2 cursor-pointer block p-2 font-medium text-foreground">
                  Sign in
                </button>
              </div>
              {/* <div className="flow-root">
                <button onClick={()=>{setOpenModal(true), setPage('signup')}} className="-m-2 cursor-pointer block p-2 font-medium text-foreground">
                  Create account
                </button>
              </div> */}
            </div>)
              }

             

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

              

                <div className="ml-auto flex justify-end items-center">
                  {tokenPresent ? (<div className="hidden lg:flex">
                    <Menu as="div" className="relative ml-3 ">
                      <MenuButton className="relative flex rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        {/* <img
                  alt=""
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                /> */}
                        <Avatar
                          sx={{ bgcolor: 'yellow' }} // MUI theme color
                          className="w-8 h-8 rounded-full outline outline-1 outline-white/10 text-white font-bold text-2xl"
                        >
                          B
                        </Avatar>
                      </MenuButton>
                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg outline outline-black/5 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                      >
                        <MenuItem>
                          <Link
                            href="/account/order"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            Order
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            Settings
                          </a>
                        </MenuItem>
                        <MenuItem>
                          <button
                            // onClick={handleLogOut}
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden"
                          >
                            Log out
                          </button>
                        </MenuItem>
                      </MenuItems>
                    </Menu></div>
                  ) : (
                    <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                      <button
                        onClick={() => {
                          setOpenModal(true);
                          setPage('login');
                        }}
                        className="text-sm font-medium text-foreground cursor-pointer hover:text-foreground"
                      >
                        Sign in
                      </button>
                      <span aria-hidden="true" className="h-6 w-px bg-gray-200" />
                      <a
                       href="/register"
                        className="text-sm font-medium cursor-pointer text-foreground hover:text-foreground bg-yellow-500 p-2 rounded font-bold"
                      >
                       Start Selling
                      </a>
                    </div>
                  )}



                   {/* Cart */}
                   <div className='md:hidden'> 
                    <a
                        href="/register"
                        className="text-sm font-medium cursor-pointer text-foreground hover:text-foreground bg-yellow-500 p-2 rounded font-bold"
                      >
                       Start Selling
                      </a></div>
                 
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
