'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Menu as MenuIcon, X, LogOut, User } from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { menuItems } from "../NavRoute/menuitems"

export default function Navbar({tokenPresent}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handlelogout = async () => {
    try {
      await axios.post("/api/logout-admin", {}, { withCredentials: true });
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const NavData = [{ label: "Home", link: "/" }];
  const LoginData = menuItems.filter(item => item.name); // Filter out empty items

  return (
    <>
      <header className="fixed top-0 z-[50] w-full border-b border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setOpen(true)}
                className="inline-flex items-center justify-center rounded-md p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-800 dark:hover:text-zinc-50 lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
              >
                <span className="sr-only">Open menu</span>
                <MenuIcon className="h-6 w-6" aria-hidden="true" />
              </button>
              
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <img
                  alt="Logo"
                  src="/QuickLogo.png"
                  className="h-8 w-auto"
                />
                <span className="hidden font-bold sm:inline-block tracking-tight text-foreground">Admin Portal</span>
              </Link>
            </div>

            <div className="flex flex-1 items-center justify-end space-x-4">
              {tokenPresent ? (
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 bg-background text-sm font-medium transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950">
                    <User className="h-5 w-5 text-foreground" />
                    <span className="sr-only">Open user menu</span>
                  </MenuButton>
                  
                  <MenuItems
                    transition
                    className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-100 dark:divide-zinc-800 rounded-md border border-zinc-200 dark:border-zinc-800 bg-background text-foreground shadow-md outline-none data-[closed]:scale-95 data-[closed]:opacity-0 transition duration-100 ease-out z-[100]"
                  >
                    <div className="px-4 py-3">
                      <p className="text-sm font-medium">Administrator</p>
                      <p className="text-xs text-zinc-500 truncate">admin@system.local</p>
                    </div>
                    <div className="py-1">
                      <MenuItem>
                        {({ active }) => (
                          <button
                            onClick={handlelogout}
                            className={`group flex w-full items-center px-4 py-2 text-sm text-red-600 transition-colors ${active ? 'bg-zinc-100 dark:bg-zinc-800' : ''}`}
                          >
                            <LogOut className="mr-2 h-4 w-4" />
                            Log out
                          </button>
                        )}
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              ) : (
                <div className="hidden lg:flex items-center gap-4">
                   <Link href="/admin-login" className="text-sm font-medium hover:underline underline-offset-4 text-foreground">Sign In</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile menu (Sheet) */}
      <Dialog open={open} onClose={setOpen} className="relative z-[100] lg:hidden">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 data-[closed]:opacity-0"
        />
        <div className="fixed inset-0 z-[100] flex">
          <DialogPanel
            transition
            className="relative flex w-3/4 max-w-sm flex-col bg-background shadow-xl transition-transform duration-300 data-[closed]:-translate-x-full border-r border-zinc-200 dark:border-zinc-800"
          >
            <div className="flex items-center justify-between px-4 py-4 border-b border-zinc-200 dark:border-zinc-800 bg-background/95 backdrop-blur sticky top-0">
              <span className="font-semibold tracking-tight text-foreground">Admin Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-sm opacity-70 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 text-foreground"
              >
                <span className="sr-only">Close menu</span>
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-6 bg-background">
              <nav className="flex flex-col gap-4">
                {NavData.map((item, index) => (
                  <Link
                    key={index}
                    href={item.link}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium hover:underline underline-offset-4 text-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
                
                {tokenPresent && (
                  <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-4">
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">Management</p>
                    {LoginData.map((item, index) => (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="text-sm font-medium hover:underline underline-offset-4 text-zinc-600 dark:text-zinc-400 hover:text-foreground"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <div className="mt-6 pt-4 border-t border-zinc-200 dark:border-zinc-800">
                      <button
                        onClick={() => {
                          setOpen(false);
                          handlelogout();
                        }}
                        className="text-sm font-medium text-red-600 hover:text-red-700 flex items-center"
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </nav>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}
