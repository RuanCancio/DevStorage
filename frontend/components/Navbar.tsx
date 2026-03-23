'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export const Navbar = ()=> {

    const [open, setOpen] = useState(false)

    return (
        <div>
          <div className="flex justify-between items-center p-6 bg-gray-700 text-amber-50 font-bold">
            <div className="flex justify-center items-center gap-2">
              <Image src="./Icon.svg" alt="devStorage" width={50} height={50} />
              <Link href='/' className="text-xl">DevStorage</Link>
            </div>
            <div className="hidden flex-row gap-7">
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </div>
            <div className="flex flex-row gap-7">
              <Link href="/register">Register</Link>
              <Link href="/login">Login</Link>
            </div>
          </div>
        </div>
    )
}