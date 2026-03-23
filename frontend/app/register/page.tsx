'use client'

import { useState } from "react"
import { useRouter } from "next/router"
import { api } from "@/services/api"

export default function Register() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleRegister = async () => {
        try {
            await api.post("/auth/register", {
                email,
                password
            })

            alert("User created")
        } catch (err) {
            alert("User not found")
        }

    }

    return (
        <div className="w-screen h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="bg-slate-900 shadow-xl shadow-slate-600/20 rounded-2xl flex flex-col p-10 h-80">
                <h1 className="text-2xl text-slate-100 font-medium">Register your account!</h1>
                <input type="email"
                    placeholder="email"
                    onChange={e => setEmail(e.target.value)}
                    className="mt-10 mb-5 border-2 rounded-xl  outline-sky-500 border-amber-50/30 px-5 py-1 text-slate-100"
                />
                <input type="password"
                    placeholder="password"
                    onChange={e => setPassword(e.target.value)}
                    className=" mb-8 border-2 rounded-xl  outline-sky-500 border-amber-50/30 px-5 py-1 text-slate-100"
                />
                <button onClick={handleRegister}
                className="bg-slate-600 py-2 rounded-xl text-white font-bold"
                >
                    Cadastre-se
                </button>
            </div>
        </div>
    )
}