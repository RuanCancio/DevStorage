'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Navbar = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className="absolute">
      <div className={`flex w-screen justify-between items-center  text-amber-50 font-bold ${open? "bg-none justify-end" : "bg-gray-700 p-4"}`}>
        <div className={`flex justify-center items-center gap-2 ${open? "hidden" : ""}`}>
          <Image src="./Icon.svg" alt="devStorage" width={50} height={50} />
          <Link href='/' className="text-xl">DevStorage</Link>
        </div>
        <div className="hidden flex-row gap-7 md:block">
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </div>
        {open ? <div className={`flex flex-col gap-7 md:hidden ${open? "bg-gray-700 p-5 rounded-bl-xl" : ""}`}>
          <Image src="./close.svg" alt="menu-close" width={30} height={30} onClick={() => setOpen(!open)} />
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
        </div> : <Image src="./open.svg" alt="menu-open" width={30} height={30} onClick={() => setOpen(!open)} className="md:hidden" />}
      </div>
    </div>
  )
}