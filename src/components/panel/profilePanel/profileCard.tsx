"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Edit, Save, X, Music, Plus, User, Mail, Lock, MapPin, Calendar, Globe, CheckCircle } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
                    className="absolute"
                    style={{
                        left: `${buttonCenterX + (Math.random() * 100 - 50)}px`,
                        top: `${buttonTopY}px`,
                        width: `${Math.random() * 10 + 5}px`,
                        height: `${Math.random() * 10 + 5}px`,
                        background: `hsl(${Math.random() * 60 + 200}, 100%, 50%)`, // Blue hues
                        borderRadius: "50%",
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
    <div className="flex items-start gap-3">
        <div className="mt-2 text-blue-500">{icon}</div>
        <div className="flex-1">
            <label className="text-sm font-medium text-blue-600 mb-1 block">{label}</label>
            <Textarea
                value={value}
                onChange={onChange}
                disabled={disabled}
                className={`resize-none bg-transparent border-blue-200 focus-visible:ring-blue-300 min-h-0 ${!disabled ? "border-blue-400 shadow-sm shadow-blue-100" : ""
                    }`}
                rows={rows}
            />
        </div>
    </div>
)

// Section header component
const SectionHeader = ({ title }: { title: string }) => (
    <h2 className="text-lg font-medium mt-4 mb-2 text-blue-700 border-b border-blue-100 pb-2">
        {title}
    </h2>
)

export default function ProfileCard() {
    // State management
    const [isEditing, setIsEditing] = useState(false)
    const [showConfetti, setShowConfetti] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState(false)
    const buttonRef = useRef<HTMLButtonElement>(null)

    // Editable fields
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


    const handleEditToggle = () => {
        if (isEditing) {
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
                <div>
                    <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
                        <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600"></div>
                        <CardContent className="p-6 space-y-6 relative">
                            <div className="absolute -top-10 left-6 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white">
                                <User size={40} className="text-blue-500" />
                            </div>

                            <div className="flex justify-between items-center">
                                <h2 className="text-xl font-bold text-blue-700 ml-24">
                                    Información Personal
                                </h2>
                                <div className="flex gap-2">

                                    <div>
                                        <Button
                                            ref={buttonRef}
                                            variant={isEditing ? "default" : "outline"}
                                            size="sm"
                                            onClick={handleEditToggle}
                                            className={`${isEditing
                                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                    : "border-blue-300 text-blue-600 hover:bg-blue-50"
                                                }${saveSuccess ? "pulse-blue" : ""}`}
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
                                    </div>
                                </div>
                            </div>


                            {saveSuccess && (
                                <div
                                    className="absolute top-4 right-4 bg-green-100 text-green-700 px-3 py-1 rounded-full flex items-center text-sm"
                                >
                                    <CheckCircle className="w-4 h-4 mr-1" /> Guardado con éxito
                                </div>
                            )}


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

                            <div
                                className="flex flex-wrap items-center gap-2"
                    
                            >
                                {musicGenres.map((genre, index) => (
                                    <div
                                        key={index}
                                    >
                                        <Badge
                                            variant="outline"
                                            className={`flex items-center gap-1 ${blueVariants[index % blueVariants.length]}border-none`}
                                        >
                                            <Music className="w-3 h-3" /> {genre}
                                            {isEditing && (
                                                <button
                                                    onClick={() => handleRemoveGenre(index)}
                                                    className="ml-1 text-blue-700 hover:text-red-500"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            )}
                                        </Badge>
                                    </div>
                                ))}

                                {isEditing && (
                                    <div
                                        className="flex items-center gap-1 mt-1"
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
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    )
}

