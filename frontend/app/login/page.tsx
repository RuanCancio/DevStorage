"use client"

import { useState } from "react"
import { api } from "@/services/api"
import { useRouter } from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  async function handleLogin() {
    const response = await api.post("/auth/login", {
      email,
      password
    })

    localStorage.setItem("token", response.data.token)
    router.push("/dashboard")
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="bg-slate-900 shadow-xl shadow-slate-600/20 rounded-2xl flex flex-col p-10 h-80">
        <h1 className="text-2xl text-slate-100 font-medium">Login</h1>
        <input
          placeholder="email"
          onChange={(e)=> setEmail(e.target.value)}
          className="mt-10 mb-5 border-2 rounded-xl  outline-sky-500 border-amber-50/30 px-5 py-1 text-slate-100"
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e)=> setPassword(e.target.value)}
          className=" mb-8 border-2 rounded-xl  outline-sky-500 border-amber-50/30 px-5 py-1 text-slate-100"
        />
        <button onClick={handleLogin}
        className="bg-slate-600 py-2 rounded-xl text-white font-bold"
        >
          Entrar
        </button>
      </div>
    </div>
  )
}