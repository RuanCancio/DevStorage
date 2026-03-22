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
        <div>
            <h1>Register your account!</h1>

            <input type="email"
                placeholder="email"
                onChange={e => setEmail(e.target.value)}
            />

            <input type="password"
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />

            <button onClick={handleRegister}>
                Cadastre-se
            </button>
        </div>
    )
}