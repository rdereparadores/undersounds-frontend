"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Save, X, Music, Plus, User, Mail, Lock, MapPin, Calendar, Globe, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { motion, AnimatePresence } from "framer-motion"

// Confetti component with improved animation
const Confetti = ({ active, sourceRef }: { active: boolean; sourceRef: React.RefObject<HTMLButtonElement | null> }) => {
    if (!active || !sourceRef.current) return null

    const buttonRect = sourceRef.current.getBoundingClientRect()
    const buttonCenterX = buttonRect.left + buttonRect.width / 2
    const buttonTopY = buttonRect.top

    return (
        <div className="fixed inset-0 pointer-events-none z-50">
            {Array.from({ length: 100 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute animate-confetti"
                    style={{
                        left: `${buttonCenterX + (Math.random() * 100 - 50)}px`,
                        top: `${buttonTopY}px`,
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        background: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`, // Blue hues
                        borderRadius: "50%",
                        transform: `rotate(${Math.random() * 360}deg)`,
                        animation: `confetti ${Math.random() * 3 + 2}s linear forwards`,
                    }}
                />
            ))}
        </div>
    )
}

// Text field component with animation
const TextAreaField = ({
                           icon,
                           label,
                           value,
                           onChange,
                           disabled,
                           rows = 1,
                       }: {
    icon: React.ReactNode
    label: string
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
    disabled: boolean
    rows?: number
}) => (
    <motion.div
        className="flex items-start gap-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
    >
        <div className="mt-2 text-blue-500">{icon}</div>
        <div className="flex-1">
            <label className="text-sm font-medium text-blue-600 mb-1 block">{label}</label>
            <Textarea
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`resize-none bg-transparent border-blue-200 focus-visible:ring-blue-300 min-h-0 transition-all duration-300 ${
                    !disabled ? "border-blue-400 shadow-sm shadow-blue-100" : ""
                }`}
                rows={rows}
            />
        </div>
    </motion.div>
)

// Section header component
const SectionHeader = ({ title }: { title: string }) => (
    <motion.h2
        className="text-lg font-medium mt-4 mb-2 text-blue-700 border-b border-blue-100 pb-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
    >
        {title}
    </motion.h2>
)

export default function ProfileCard() {
    // State management
    const [isEditing, setIsEditing] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // Editable fields
    const [description, setDescription] = useState("Estoy en Under Sounds!")
    const [musicGenres, setMusicGenres] = useState(["Rock", "Jazz", "Hip Hop", "Electrónica", "Pop"])
    const [newGenre, setNewGenre] = useState("")

    // Personal information
    const [nombre, setNombre] = useState("Juan Pérez")
    const [fechaNacimiento, setFechaNacimiento] = useState("01/01/1990")
    const [correo, setCorreo] = useState("usuario@ejemplo.com")
    const [password, setPassword] = useState("••••••••")
    const [domicilio, setDomicilio] = useState("Calle Principal 123")
    const [ciudad, setCiudad] = useState("Madrid")
    const [codigoPostal, setCodigoPostal] = useState("28001")
    const [pais, setPais] = useState("España")

    // Original values for cancel functionality
    const [originalDescription, setOriginalDescription] = useState(description)
    const [originalMusicGenres, setOriginalMusicGenres] = useState([...musicGenres])
    const [originalNombre, setOriginalNombre] = useState(nombre)
    const [originalFechaNacimiento, setOriginalFechaNacimiento] = useState(fechaNacimiento)
    const [originalCorreo, setOriginalCorreo] = useState(correo)
    const [originalPassword, setOriginalPassword] = useState(password)
    const [originalDomicilio, setOriginalDomicilio] = useState(domicilio)
    const [originalCiudad, setOriginalCiudad] = useState(ciudad)
    const [originalCodigoPostal, setOriginalCodigoPostal] = useState(codigoPostal)
    const [originalPais, setOriginalPais] = useState(pais)

    useEffect(() => {
        // Add confetti animation and blue color styles to CSS
        const style = document.createElement("style")
        style.textContent = `
      @keyframes confetti {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
      }
      .animate-confetti {
        animation: confetti 3s ease-in-out forwards;
      }
      
      @keyframes pulse-blue {
        0%, 100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
        50% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
      }
      .pulse-blue {
        animation: pulse-blue 2s infinite;
      }

      /* Blue color palette */
      .text-blue-50 { color: #eff6ff; }
      .text-blue-100 { color: #dbeafe; }
      .text-blue-200 { color: #bfdbfe; }
      .text-blue-300 { color: #93c5fd; }
      .text-blue-400 { color: #60a5fa; }
      .text-blue-500 { color: #3b82f6; }
      .text-blue-600 { color: #2563eb; }
      .text-blue-700 { color: #1d4ed8; }
      .text-blue-800 { color: #1e40af; }
      .text-blue-900 { color: #1e3a8a; }

      .bg-blue-50 { background-color: #eff6ff; }
      .bg-blue-100 { background-color: #dbeafe; }
      .bg-blue-200 { background-color: #bfdbfe; }
      .bg-blue-300 { background-color: #93c5fd; }
      .bg-blue-400 { background-color: #60a5fa; }
      .bg-blue-500 { background-color: #3b82f6; }
      .bg-blue-600 { background-color: #2563eb; }
      .bg-blue-700 { background-color: #1d4ed8; }
      .bg-blue-800 { background-color: #1e40af; }
      .bg-blue-900 { background-color: #1e3a8a; }

      .border-blue-50 { border-color: #eff6ff; }
      .border-blue-100 { border-color: #dbeafe; }
      .border-blue-200 { border-color: #bfdbfe; }
      .border-blue-300 { border-color: #93c5fd; }
      .border-blue-400 { border-color: #60a5fa; }
      .border-blue-500 { border-color: #3b82f6; }
      .border-blue-600 { border-color: #2563eb; }
      .border-blue-700 { border-color: #1d4ed8; }
      .border-blue-800 { border-color: #1e40af; }
      .border-blue-900 { border-color: #1e3a8a; }

      .shadow-blue-100 { --tw-shadow-color: #dbeafe; }

      /* Sky colors */
      .text-sky-50 { color: #f0f9ff; }
      .text-sky-100 { color: #e0f2fe; }
      .text-sky-200 { color: #bae6fd; }
      .text-sky-300 { color: #7dd3fc; }
      .text-sky-400 { color: #38bdf8; }
      .text-sky-500 { color: #0ea5e9; }
      .text-sky-600 { color: #0284c7; }
      .text-sky-700 { color: #0369a1; }
      .text-sky-800 { color: #075985; }
      .text-sky-900 { color: #0c4a6e; }

      .bg-sky-50 { background-color: #f0f9ff; }
      .bg-sky-100 { background-color: #e0f2fe; }
      .bg-sky-200 { background-color: #bae6fd; }
      .bg-sky-300 { background-color: #7dd3fc; }
      .bg-sky-400 { background-color: #38bdf8; }
      .bg-sky-500 { background-color: #0ea5e9; }
      .bg-sky-600 { background-color: #0284c7; }
      .bg-sky-700 { background-color: #0369a1; }
      .bg-sky-800 { background-color: #075985; }
      .bg-sky-900 { background-color: #0c4a6e; }

      /* Indigo colors */
      .text-indigo-50 { color: #eef2ff; }
      .text-indigo-100 { color: #e0e7ff; }
      .text-indigo-200 { color: #c7d2fe; }
      .text-indigo-300 { color: #a5b4fc; }
      .text-indigo-400 { color: #818cf8; }
      .text-indigo-500 { color: #6366f1; }
      .text-indigo-600 { color: #4f46e5; }
      .text-indigo-700 { color: #4338ca; }
      .text-indigo-800 { color: #3730a3; }
      .text-indigo-900 { color: #312e81; }

      .bg-indigo-50 { background-color: #eef2ff; }
      .bg-indigo-100 { background-color: #e0e7ff; }
      .bg-indigo-200 { background-color: #c7d2fe; }
      .bg-indigo-300 { background-color: #a5b4fc; }
      .bg-indigo-400 { background-color: #818cf8; }
      .bg-indigo-500 { background-color: #6366f1; }
      .bg-indigo-600 { background-color: #4f46e5; }
      .bg-indigo-700 { background-color: #4338ca; }
      .bg-indigo-800 { background-color: #3730a3; }
      .bg-indigo-900 { background-color: #312e81; }

      /* Cyan colors */
      .text-cyan-50 { color: #ecfeff; }
      .text-cyan-100 { color: #cffafe; }
      .text-cyan-200 { color: #a5f3fc; }
      .text-cyan-300 { color: #67e8f9; }
      .text-cyan-400 { color: #22d3ee; }
      .text-cyan-500 { color: #06b6d4; }
      .text-cyan-600 { color: #0891b2; }
      .text-cyan-700 { color: #0e7490; }
      .text-cyan-800 { color: #155e75; }
      .text-cyan-900 { color: #164e63; }

      .bg-cyan-50 { background-color: #ecfeff; }
      .bg-cyan-100 { background-color: #cffafe; }
      .bg-cyan-200 { background-color: #a5f3fc; }
      .bg-cyan-300 { background-color: #67e8f9; }
      .bg-cyan-400 { background-color: #22d3ee; }
      .bg-cyan-500 { background-color: #06b6d4; }
      .bg-cyan-600 { background-color: #0891b2; }
      .bg-cyan-700 { background-color: #0e7490; }
      .bg-cyan-800 { background-color: #155e75; }
      .bg-cyan-900 { background-color: #164e63; }

      /* Red colors for cancel button */
      .text-red-500 { color: #ef4444; }
      .border-red-200 { border-color: #fecaca; }
      .hover\\:bg-red-50:hover { background-color: #fef2f2; }

      /* Green colors for success message */
      .bg-green-100 { background-color: #dcfce7; }
      .text-green-700 { color: #15803d; }

      /* Gradient backgrounds */
      .bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
      .bg-gradient-to-r { background-image: linear-gradient(to right, var(--tw-gradient-stops)); }
      .from-white { --tw-gradient-from: #ffffff var(--tw-gradient-from-position); --tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .to-blue-50 { --tw-gradient-to: #eff6ff var(--tw-gradient-to-position); }
      .from-blue-500 { --tw-gradient-from: #3b82f6 var(--tw-gradient-from-position); --tw-gradient-to: rgb(59 130 246 / 0) var(--tw-gradient-to-position); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
      .to-blue-600 { --tw-gradient-to: #2563eb var(--tw-gradient-to-position); }
    `
        document.head.appendChild(style)

        return () => {
            document.head.removeChild(style)
        }
    }, [])

    const handleEditToggle = () => {
        if (!isEditing) {
            // Enter edit mode
            setIsEditing(true)
            // Save original values
            setOriginalDescription(description)
            setOriginalMusicGenres([...musicGenres])
            setOriginalNombre(nombre)
            setOriginalFechaNacimiento(fechaNacimiento)
            setOriginalCorreo(correo)
            setOriginalPassword(password)
            setOriginalDomicilio(domicilio)
            setOriginalCiudad(ciudad)
            setOriginalCodigoPostal(codigoPostal)
            setOriginalPais(pais)
        } else {
            // Save changes
            setIsEditing(false)
            setShowConfetti(true)
            setSaveSuccess(true)
            setTimeout(() => {
                setShowConfetti(false)
                setSaveSuccess(false)
            }, 3000)
        }
    }

    const handleCancel = () => {
        setIsEditing(false)
        // Restore original values
        setDescription(originalDescription)
        setMusicGenres([...originalMusicGenres])
        setNombre(originalNombre)
        setFechaNacimiento(originalFechaNacimiento)
        setCorreo(originalCorreo)
        setPassword(originalPassword)
        setDomicilio(originalDomicilio)
        setCiudad(originalCiudad)
        setCodigoPostal(originalCodigoPostal)
        setPais(originalPais)
    }

    const handleAddGenre = () => {
        if (newGenre.trim() && !musicGenres.includes(newGenre.trim())) {
            setMusicGenres([...musicGenres, newGenre.trim()])
            setNewGenre("")
        }
    }

    const handleRemoveGenre = (index: number) => {
        const newGenres = [...musicGenres]
        newGenres.splice(index, 1)
        setMusicGenres(newGenres)
    }

    // Blue color variants for badges
    const blueVariants = [
        "bg-blue-100 text-blue-800",
        "bg-sky-100 text-sky-800",
        "bg-indigo-100 text-indigo-800",
        "bg-cyan-100 text-cyan-800",
        "bg-blue-50 text-blue-600",
    ]

    return (
        <>
            <Confetti active={showConfetti} sourceRef={buttonRef} />
            <div className="w-full p-5">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
                        <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                        <CardContent className="p-6 space-y-6 relative">
                            <div className="absolute -top-10 left-6 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white">
                                <User size={40} className="text-blue-500" />
                            </div>

                            <div className="flex justify-between items-center">
                                <motion.h2
                                    className="text-xl font-bold text-blue-700 ml-24"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    Información Personal
                                </motion.h2>
                                <div className="flex gap-2">
                                    <AnimatePresence>
                                        {isEditing && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleCancel}
                                                    className="border-red-200 text-red-500 hover:bg-red-50 transition-all duration-300"
                                                >
                                                    <X className="w-4 h-4 mr-2" /> Cancelar
                                                </Button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                        <Button
                                            ref={buttonRef}
                                            variant={isEditing ? "default" : "outline"}
                                            size="sm"
                                            onClick={handleEditToggle}
                                            className={`${
                                                isEditing
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "border-blue-300 text-blue-600 hover:bg-blue-50"
                                            } transition-all duration-300 ${saveSuccess ? "pulse-blue" : ""}`}
                                        >
                                            {isEditing ? (
                                                <>
                                                    <Save className="w-4 h-4 mr-2" /> Guardar
                                                </>
                                            ) : (
                                                <>
                                                    <Edit className="w-4 h-4 mr-2" /> Editar
                                                </>
                                            )}
                                        </Button>
                                    </motion.div>
                                </div>
                            </div>

                            <AnimatePresence>
                                {saveSuccess && (
                                    <motion.div
                                        className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center text-sm"
                                        initial={{ opacity: 0, y: -20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-1" /> Guardado con éxito
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                                <TextAreaField
                                    icon={<User size={18} />}
                                    label="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    disabled={!isEditing}
                                />

                                <TextAreaField
                                    icon={<Calendar size={18} />}
                                    label="Fecha de nacimiento"
                                    value={fechaNacimiento}
                                    onChange={(e) => setFechaNacimiento(e.target.value)}
                                    disabled={!isEditing}
                                />

                                <TextAreaField
                                    icon={<Mail size={18} />}
                                    label="Correo"
                                    value={correo}
                                    onChange={(e) => setCorreo(e.target.value)}
                                    disabled={!isEditing}
                                />

                                <TextAreaField
                                    icon={<Lock size={18} />}
                                    label="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>

                            <SectionHeader title="Dirección" />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <TextAreaField
                                    icon={<MapPin size={18} />}
                                    label="Domicilio"
                                    value={domicilio}
                                    onChange={(e) => setDomicilio(e.target.value)}
                                    disabled={!isEditing}
                                />

                                <TextAreaField
                                    icon={<MapPin size={18} />}
                                    label="Ciudad"
                                    value={ciudad}
                                    onChange={(e) => setCiudad(e.target.value)}
                                    disabled={!isEditing}
                                />

                                <TextAreaField
                                    icon={<MapPin size={18} />}
                                    label="Código postal"
                                    value={codigoPostal}
                                    onChange={(e) => setCodigoPostal(e.target.value)}
                                    disabled={!isEditing}
                                />

                                <TextAreaField
                                    icon={<Globe size={18} />}
                                    label="País"
                                    value={pais}
                                    onChange={(e) => setPais(e.target.value)}
                                    disabled={!isEditing}
                                />
                            </div>

                            <SectionHeader title="Gustos musicales" />

                            <motion.div
                                className="flex flex-wrap items-center gap-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                {musicGenres.map((genre, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Badge
                                            variant="outline"
                                            className={`flex items-center gap-1 ${blueVariants[index % blueVariants.length]} transition-all duration-300 border-none`}
                                        >
                                            <Music className="w-3 h-3" /> {genre}
                                            {isEditing && (
                                                <button
                                                    onClick={() => handleRemoveGenre(index)}
                                                    className="ml-1 text-blue-700 hover:text-red-500 transition-colors"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            )}
                                        </Badge>
                                    </motion.div>
                                ))}

                                {isEditing && (
                                    <motion.div
                                        className="flex items-center gap-1 mt-1"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <Input
                                            value={newGenre}
                                            onChange={(e) => setNewGenre(e.target.value)}
                                            placeholder="Nuevo género"
                                            className="h-8 text-xs w-32 border-blue-200 focus-visible:ring-blue-300"
                                        />
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="h-8 w-8 text-blue-500 hover:bg-blue-50 hover:text-blue-700"
                                            onClick={handleAddGenre}
                                        >
                                            <Plus className="w-3 h-3" />
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </>
    )
}

