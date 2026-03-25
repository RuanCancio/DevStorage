"use client"

import { useEffect, useState } from "react"
import { api } from "@/services/api"

interface UserFile {
  id: string
  name: string
}

export default function Dashboard() {
  const [files, setFiles] = useState<UserFile[]>([])
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  async function loadFiles() {
    const token = localStorage.getItem("token")

    const response = await api.get("/files", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    setFiles(response.data)
  }

  async function handleCopyLink(id: string) {
    const token = localStorage.getItem("token")
    const url = `http://localhost:3000/files/public/${id}`

    await navigator.clipboard.writeText(url)

    alert("Link copiado!")
  }

  async function handleUpload() {
    try {
      const token = localStorage.getItem("token")
      if (!selectedFile) return

      const formData = new FormData()
      formData.append("file", selectedFile)

      await api.post("/files/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setSelectedFile(null)
      loadFiles()
    } catch {
      alert("deu erro")
    }
  }

  async function handleDelete(id: string) {
    const token = localStorage.getItem("token")

    await api.delete(`/files/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    loadFiles()
  }

  async function handleDownload(id: string) {
    const token = localStorage.getItem("token")


    const response = await api.get(`/files/${id}/download`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      responseType: "blob"
    })

    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement("a")
    link.href = url
    link.setAttribute("download", "arquivo")
    document.body.appendChild(link)
    link.click()
  }

  useEffect(() => {
    loadFiles()
  }, [])

  return (
    <div className="w-screen h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="mt-30 font-medium text-white text-center">
        <h1 className="text-2xl">Seus Arquivos</h1>
        <input type="file"
          onChange={e => setSelectedFile(e.target.files?.[0] || null)}
          className="underline mt-5"
        />
        <br />
        <button onClick={handleUpload}
          className="mt-4 bg-slate-700 hover:bg-slate-600 py-2 px-6 rounded-xl"
        >Upload</button>

        {files.map(file => (
          <div key={file.id} className="mt-10 mx-5 rounded-2xl py-5 bg-slate-700">
            <h3>{file.name}</h3>
            <div className="flex flex-row gap-3 justify-center my-3">
              <button onClick={() => handleDownload(file.id)}
                className="py-1 px-5 bg-slate-500 hover:bg-slate-600/50 rounded-xl"
              >Download</button>
              <button onClick={() => handleDelete(file.id)}
                className="py-1 px-5 bg-red-500 hover:bg-red-600 rounded-xl text-shadow-slate-700"
              >Delete</button>
            </div>
            <button onClick={() => handleCopyLink(file.id)}
              className="underline"
            >Copiar link</button>
          </div>
        ))}
      </div>
    </div>
  )
}