"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Edit,
  Save,
  X,
  User,
  Mail,
  Lock,
  MapPin,
  Calendar,
  Globe,
  CheckCircle,
  CreditCard,
  Building,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

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
  <div
    className="flex items-start gap-3"
  >
    <div className="mt-2 text-blue-500">{icon}</div>
    <div className="flex-1">
      <label className="text-sm font-medium text-blue-600 mb-1 block">{label}</label>
      <Textarea
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`resize-none bg-transparent border-blue-200 focus-visible:ring-blue-300 min-h-0 ${
          !disabled ? "border-blue-400 shadow-sm shadow-blue-100" : ""
        }`}
        rows={rows}
      />
    </div>
  </div>
)

// Section header component
const SectionHeader = ({ title }: { title: string }) => (
  <h2
    className="text-lg font-medium mt-4 mb-2 text-blue-700 border-b border-blue-100 pb-2"
  >
    {title}
  </h2>
)

export default function ArtistProfileCard() {
  // State management
  const [isEditing, setIsEditing] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Editable fields
  const [description, setDescription] = useState("Estoy en Under Sounds!")

  // Personal information
  const [nombreArtista, setNombreArtista] = useState("Nombre Artístico")
  const [nombreReal, setNombreReal] = useState("Juan Pérez")
  const [fechaNacimiento, setFechaNacimiento] = useState("01/01/1990")
  const [correo, setCorreo] = useState("usuario@ejemplo.com")
  const [contrasena, setContrasena] = useState("••••••••")
  const [direccion, setDireccion] = useState("Calle Principal 123")
  const [ciudad, setCiudad] = useState("Madrid")
  const [codigoPostal, setCodigoPostal] = useState("28001")
  const [pais, setPais] = useState("España")
  const [cuentaBancaria, setCuentaBancaria] = useState("ES91 2100 0418 4502 0005 1332")
  const [discografica, setDiscografica] = useState("Discos Ejemplo S.L.")

  // Original values for cancel functionality
  const [originalDescription, setOriginalDescription] = useState(description)
  const [originalNombreArtista, setOriginalNombreArtista] = useState(nombreArtista)
  const [originalNombreReal, setOriginalNombreReal] = useState(nombreReal)
  const [originalFechaNacimiento, setOriginalFechaNacimiento] = useState(fechaNacimiento)
  const [originalCorreo, setOriginalCorreo] = useState(correo)
  const [originalContrasena, setOriginalContrasena] = useState(contrasena)
  const [originalDireccion, setOriginalDireccion] = useState(direccion)
  const [originalCiudad, setOriginalCiudad] = useState(ciudad)
  const [originalCodigoPostal, setOriginalCodigoPostal] = useState(codigoPostal)
  const [originalPais, setOriginalPais] = useState(pais)
  const [originalCuentaBancaria, setOriginalCuentaBancaria] = useState(cuentaBancaria)
  const [originalDiscografica, setOriginalDiscografica] = useState(discografica)

  const handleEditToggle = () => {
    if (!isEditing) {
      // Enter edit mode
      setIsEditing(true)
      // Save original values
      setOriginalDescription(description)
      setOriginalNombreArtista(nombreArtista)
      setOriginalNombreReal(nombreReal)
      setOriginalFechaNacimiento(fechaNacimiento)
      setOriginalCorreo(correo)
      setOriginalContrasena(contrasena)
      setOriginalDireccion(direccion)
      setOriginalCiudad(ciudad)
      setOriginalCodigoPostal(codigoPostal)
      setOriginalPais(pais)
      setOriginalCuentaBancaria(cuentaBancaria)
      setOriginalDiscografica(discografica)
    } else {
      // Save changes
      setIsEditing(false)
      setSaveSuccess(true)
      setTimeout(() => {
        setSaveSuccess(false)
      }, 3000)
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    // Restore original values
    setDescription(originalDescription)
    setNombreArtista(originalNombreArtista)
    setNombreReal(originalNombreReal)
    setFechaNacimiento(originalFechaNacimiento)
    setCorreo(originalCorreo)
    setContrasena(originalContrasena)
    setDireccion(originalDireccion)
    setCiudad(originalCiudad)
    setCodigoPostal(originalCodigoPostal)
    setPais(originalPais)
    setCuentaBancaria(originalCuentaBancaria)
    setDiscografica(originalDiscografica)
  }

  return (
    <>
      <div className="w-full p-5">
        <div>
          <Card className="border-blue-200 bg-gradient-to-br from-white to-blue-50 backdrop-blur-sm shadow-lg rounded-xl overflow-hidden">
            <div className="h-16 bg-gradient-to-r from-blue-500 to-blue-600"></div>
            <CardContent className="p-6 space-y-6 relative">
              <div className="absolute -top-10 left-6 w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center border-4 border-white">
                <User size={40} className="text-blue-500" />
              </div>

              <div className="flex flex-col justify-between items-center">
                <h2
                  className="text-xl font-bold text-blue-700 mb-5"
                >
                  Perfil de Artista
                </h2>
                <div className="flex gap-2">
                    {isEditing && (
                      <div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancel}
                          className="border-red-200 text-red-500 hover:bg-red-50 "
                        >
                          <X className="w-4 h-4 mr-2" /> Cancelar
                        </Button>
                      </div>
                    )}

                  <div>
                    <Button
                      ref={buttonRef}
                      variant={isEditing ? "default" : "outline"}
                      size="sm"
                      onClick={handleEditToggle}
                      className={`${
                        isEditing
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "border-blue-300 text-blue-600 hover:bg-blue-50"
                      } ${saveSuccess ? "pulse-blue" : ""}`}
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
                  label="Nombre Artista"
                  value={nombreArtista}
                  onChange={(e) => setNombreArtista(e.target.value)}
                  disabled={!isEditing}
                />

                <TextAreaField
                  icon={<User size={18} />}
                  label="Nombre Real"
                  value={nombreReal}
                  onChange={(e) => setNombreReal(e.target.value)}
                  disabled={!isEditing}
                />

                <TextAreaField
                  icon={<Calendar size={18} />}
                  label="Fecha Nacimiento"
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
                  value={contrasena}
                  onChange={(e) => setContrasena(e.target.value)}
                  disabled={!isEditing}
                />

                <TextAreaField
                  icon={<Building size={18} />}
                  label="Discografica"
                  value={discografica}
                  onChange={(e) => setDiscografica(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <SectionHeader title="Dirección" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextAreaField
                  icon={<MapPin size={18} />}
                  label="Direccion"
                  value={direccion}
                  onChange={(e) => setDireccion(e.target.value)}
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
                  label="Codigo Postal"
                  value={codigoPostal}
                  onChange={(e) => setCodigoPostal(e.target.value)}
                  disabled={!isEditing}
                />

                <TextAreaField
                  icon={<Globe size={18} />}
                  label="Pais"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  disabled={!isEditing}
                />
              </div>

              <SectionHeader title="Información Bancaria" />

              <div className="grid grid-cols-1 gap-6">
                <TextAreaField
                  icon={<CreditCard size={18} />}
                  label="Cuenta Bancaria"
                  value={cuentaBancaria}
                  onChange={(e) => setCuentaBancaria(e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
