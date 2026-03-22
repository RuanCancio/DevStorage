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
    <div>
      <h1>Login</h1>

      <input
        placeholder="email"
        onChange={(e)=> setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="password"
        onChange={(e)=> setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>
        Entrar
      </button>
    </div>
  )
}