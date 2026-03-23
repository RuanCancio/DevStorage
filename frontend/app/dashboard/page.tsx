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
  const token = localStorage.getItem("token")

    async function loadFiles() {

      const response = await api.get("/files", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      setFiles(response.data)
    }

    async function handleCopyLink(id: string) {
        const url = `http://localhost:3000/files/public/${id}`

        await navigator.clipboard.writeText(url)

        alert("Link copiado!")
    }

    async function handleUpload() {
        if(!selectedFile) return

        const formData = new FormData()
        formData.append("file", selectedFile)

        await api.post("/files/upload", formData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        setSelectedFile(null)
        loadFiles()
    }

    async function handleDelete(id: string) {
        

        await api.delete(`/files/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        loadFiles()
    }

   async function handleDownload(id: string) {
        

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

    useEffect(()=> {
        loadFiles()
    }, [])

  return (
    <div>
      <h1>Seus Arquivos</h1>

      <input type="file" 
      onChange={e => setSelectedFile(e.target.files?.[0] || null)}/>

      <button onClick={handleUpload}>Upload</button>

      {files.map(file => (
        <div key={file.id}>

          <span>{file.name}</span> <br />

          <button onClick={()=> handleDownload(file.id)}>Download</button>

          <button onClick={()=> handleDelete(file.id)}>Delete</button> <br />
          <button onClick={()=> handleCopyLink(file.id)}>Copiar link</button>
        </div>
      ))}
    </div>
  )
}