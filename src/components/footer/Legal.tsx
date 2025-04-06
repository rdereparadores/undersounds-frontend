import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export function Legal() {
    return (
        <div className="flex justify-center">
            <Card className="w-[90%]">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">Legalidad de UnderSounds</CardTitle>
                    <CardDescription>
                        <li>Terminos y condiciones</li>
                        <li>Centro de seguridad y privacidad</li>
                        <li>Politica de privacidad</li>
                        <li>Configuración de cookies</li>
                        <li>Accesibilidad</li>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-xl font-semibold">Terminos y condiciones</p>
                    <p><strong>Última actualización:</strong> 06/04/2024</p>

                    <p>Bienvenido a <strong>Undersounds</strong>. Al acceder y utilizar nuestro sitio web y nuestros servicios, aceptas cumplir con los siguientes Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, te pedimos que no utilices nuestra plataforma.</p>

                    <h2>1. Información General</h2>
                    <p><strong>Undersounds</strong> es una tienda especializada en la venta de música en formatos digitales (descargas, streaming) y físicos (CDs, vinilos, etc.). Operamos a través del sitio web <a href="https://www.undersounds.com" target="_blank">www.undersounds.com</a> y otras plataformas digitales asociadas.</p>

                    <h2>2. Uso del Sitio</h2>
                        <li>Debes tener al menos 18 años o contar con el consentimiento de un adulto para realizar compras.</li>
                        <li>Te comprometes a proporcionar información veraz, actual y completa al registrarte o realizar una compra.</li>
                        <li>No puedes usar nuestros productos o servicios para ningún propósito ilegal o no autorizado.</li>

                    <h2>3. Productos Digitales</h2>
                        <li>Las descargas digitales están destinadas al uso personal y no comercial del comprador.</li>
                        <li>No está permitido redistribuir, revender, compartir o modificar el contenido sin autorización explícita.</li>
                        <li>Una vez realizada la compra, no se aceptan devoluciones ni reembolsos de contenido digital.</li>

                    <h2>4. Productos Físicos</h2>
                        <li>Los envíos se realizan a la dirección indicada por el comprador. Undersounds no se hace responsable por errores en la información de entrega.</li>
                        <li>Aceptamos devoluciones de productos físicos únicamente si llegan defectuosos o dañados, dentro de los 14 días posteriores a la entrega.</li>
                        <li>El cliente asume los gastos de envío de devolución, salvo que el producto esté defectuoso o se haya enviado por error.</li>

                    <h2>5. Propiedad Intelectual</h2>
                    <p>Todo el contenido disponible en Undersounds (música, imágenes, textos, diseño web, etc.) está protegido por derechos de autor y pertenece a sus respectivos creadores o licenciatarios. El uso indebido del material puede resultar en acciones legales.</p>

                    <h2>6. Precios y Pagos</h2>
                        <li className="pl-4">Todos los precios están expresados en [Moneda] e incluyen los impuestos aplicables, salvo que se indique lo contrario.</li>
                        <li>Los métodos de pago aceptados se indican claramente en el proceso de compra.</li>
                        <li>Nos reservamos el derecho a modificar precios y productos en cualquier momento sin previo aviso.</li>

                    <h2>7. Disponibilidad del Servicio</h2>
                    <p>Undersounds se esfuerza por garantizar la disponibilidad continua de sus servicios, pero no se responsabiliza por interrupciones temporales, fallos técnicos o mantenimiento del sitio.</p>

                    <h2>8. Cambios en los Términos</h2>
                    <p>Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán publicadas en esta página y entrarán en vigor inmediatamente después de su publicación.</p>

                    <h2>9. Contacto</h2>
                    <p>Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos a través de:</p>
                    
                        <li>✉️ <strong>soporte@undersounds.com</strong></li>
                        <li>📍 Dirección física: [Dirección de la tienda, si aplica]</li>
                    
                </CardContent>
                <CardFooter>
                    <p className="text-xl font-semibold">Centro de seguridad y privacidad</p>
                </CardFooter>
                <CardContent>
                    <p className="text-xl font-semibold">Politica de privacidad</p>
                </CardContent>
                <CardContent>
                    <p className="text-xl font-semibold">Configuración de cookies</p>
                </CardContent>
                <CardContent>
                    <p className="text-xl font-semibold">Accesibilidad</p>
                </CardContent>
            </Card>
        </div>
    )
}