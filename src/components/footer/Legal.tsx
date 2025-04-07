import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"


export function Legal() {
    return (
        <div className="flex justify-center">
            <Card className="w-[90%]">
                <CardHeader>
                    <CardTitle className="text-4xl font-bold">Legalidad de UnderSounds</CardTitle>
                    <CardDescription className="flex flex-col text-lg">
                        <a href="#T&S">Terminos y condiciones</a>
                        <a href="#privacyAndSecurity">Centro de seguridad y privacidad</a>
                        <a href="#privacyPolicy">Politica de privacidad</a>
                        <a href="#cookieConfig">Configuración de cookies</a>
                        <a href="#accesibility">Accesibilidad</a>
                    </CardDescription>
                </CardHeader>
                <CardContent id="T&S">
                    <p className="text-3xl font-semibold mb-5" >Terminos y condiciones</p>
                    <p><strong>Última actualización:</strong> 06/04/2024</p>

                    <p>Bienvenido a <strong>Undersounds</strong>. Al acceder y utilizar nuestro sitio web y nuestros servicios, aceptas cumplir con los siguientes Términos y Condiciones. Si no estás de acuerdo con alguno de ellos, te pedimos que no utilices nuestra plataforma.</p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">1. Información General</h2>
                    <p><strong>Undersounds</strong> es una tienda especializada en la venta de música en formatos digitales (descargas, streaming) y físicos (CDs, vinilos, etc.). Operamos a través del sitio web <a href="https://www.undersounds.com" target="_blank">www.undersounds.com</a> y otras plataformas digitales asociadas.</p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">2. Uso del Sitio</h2>
                    <li className="pl-4">Debes tener al menos 18 años o contar con el consentimiento de un adulto para realizar compras.</li>
                    <li className="pl-4">Te comprometes a proporcionar información veraz, actual y completa al registrarte o realizar una compra.</li>
                    <li className="pl-4">No puedes usar nuestros productos o servicios para ningún propósito ilegal o no autorizado.</li>

                    <h2 className="text-xl font-semibold mt-6 mb-2">3. Productos Digitales</h2>
                    <li className="pl-4">Las descargas digitales están destinadas al uso personal y no comercial del comprador.</li>
                    <li className="pl-4">No está permitido redistribuir, revender, compartir o modificar el contenido sin autorización explícita.</li>
                    <li className="pl-4">Una vez realizada la compra, no se aceptan devoluciones ni reembolsos de contenido digital.</li>

                    <h2 className="text-xl font-semibold mt-6 mb-2">4. Productos Físicos</h2>
                    <li className="pl-4">Los envíos se realizan a la dirección indicada por el comprador. Undersounds no se hace responsable por errores en la información de entrega.</li>
                    <li className="pl-4">Aceptamos devoluciones de productos físicos únicamente si llegan defectuosos o dañados, dentro de los 14 días posteriores a la entrega.</li>
                    <li className="pl-4">El cliente asume los gastos de envío de devolución, salvo que el producto esté defectuoso o se haya enviado por error.</li>

                    <h2 className="text-xl font-semibold mt-6 mb-2">5. Propiedad Intelectual</h2>
                    <p>Todo el contenido disponible en Undersounds (música, imágenes, textos, diseño web, etc.) está protegido por derechos de autor y pertenece a sus respectivos creadores o licenciatarios. El uso indebido del material puede resultar en acciones legales.</p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">6. Precios y Pagos</h2>
                    <li className="pl-4">Todos los precios están expresados en [Moneda] e incluyen los impuestos aplicables, salvo que se indique lo contrario.</li>
                    <li className="pl-4">Los métodos de pago aceptados se indican claramente en el proceso de compra.</li>
                    <li className="pl-4">Nos reservamos el derecho a modificar precios y productos en cualquier momento sin previo aviso.</li>

                    <h2 className="text-xl font-semibold mt-6 mb-2">7. Disponibilidad del Servicio</h2>
                    <p>Undersounds se esfuerza por garantizar la disponibilidad continua de sus servicios, pero no se responsabiliza por interrupciones temporales, fallos técnicos o mantenimiento del sitio.</p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">8. Cambios en los Términos</h2>
                    <p>Nos reservamos el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones serán publicadas en esta página y entrarán en vigor inmediatamente después de su publicación.</p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">9. Contacto</h2>
                    <p>Si tienes preguntas sobre estos Términos y Condiciones, puedes contactarnos a través de:</p>

                    <li>✉️ <strong>soporte@undersounds.com</strong></li>
                    <li>📍 Dirección física: [Dirección de la tienda, si aplica]</li>

                </CardContent>
                <CardContent className="flex-col" id="privacyAndSecurity">
                    <p className="text-3xl font-semibold mb-5">Centro de seguridad y privacidad</p>
                    <p>
                        En <strong>Undersounds</strong>, tu seguridad y privacidad son una prioridad. Nos comprometemos a proteger tus datos personales y ofrecerte una experiencia de compra y navegación segura.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">1. Protección de tus datos</h2>
                    <li className="pl-4">Recopilamos solo la información necesaria para brindarte nuestros servicios.</li>
                    <li className="pl-4">Todos los datos se almacenan en servidores seguros con cifrado actualizado.</li>
                    <li className="pl-4">No vendemos ni compartimos tu información personal con terceros no autorizados.</li>

                    <h2 className="text-xl font-semibold mt-6 mb-2">2. Pagos seguros</h2>

                    <li className="pl-4">Utilizamos plataformas de pago confiables y seguras (como Stripe, PayPal, etc.).</li>
                    <li className="pl-4">La información de tu tarjeta no se almacena en nuestros servidores.</li>
                    <li className="pl-4">Todos los pagos están protegidos por cifrado SSL.</li>


                    <h2 className="text-xl font-semibold mt-6 mb-2">3. Derechos del usuario</h2>

                    <li className="pl-4">Puedes solicitar el acceso, modificación o eliminación de tus datos personales en cualquier momento.</li>
                    <li className="pl-4">Te damos control sobre las preferencias de comunicaciones (newsletter, promociones, etc.).</li>
                    <li className="pl-4">Respetamos el derecho al olvido y cumplimiento de normativas como el RGPD.</li>


                    <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies y seguimiento</h2>
                    <p>
                        Usamos cookies para mejorar tu experiencia en el sitio. Puedes aceptar o rechazar el uso de cookies desde la configuración de tu navegador o desde nuestro banner de consentimiento.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">5. Seguridad de la cuenta</h2>

                    <li className="pl-4">Recomendamos usar contraseñas seguras y únicas para tu cuenta.</li>
                    <li className="pl-4">No compartas tu contraseña con terceros.</li>
                    <li className="pl-4">Si detectamos actividad sospechosa, podríamos suspender temporalmente tu cuenta para protegerte.</li>


                    <h2>6. Contacto para dudas o incidencias</h2>
                    <p>
                        Si tienes alguna pregunta sobre nuestra política de privacidad o crees que tu cuenta ha sido comprometida, puedes contactarnos en:
                    </p>

                    <li>✉️ <strong>privacidad@undersounds.com</strong></li>
                    <li>📞 Línea directa de soporte: +34 900 000 000</li>

                </CardContent>
                <CardContent id="privacyPolicy">
                    <p className="text-3xl font-semibold mb-5">Politica de privacidad</p>
                    <p>
                        En <strong>Undersounds</strong>, valoramos tu confianza y nos tomamos muy en serio la protección de tu información personal. Esta política describe cómo recopilamos, utilizamos y protegemos tus datos cuando accedes a nuestra tienda, ya sea para adquirir música digital o física.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">1. ¿Qué información recopilamos?</h2>
                    <li className="pl-4">Información personal: nombre, dirección, correo electrónico, número de teléfono.</li>
                    <li className="pl-4">Datos de pago: solo procesados por proveedores seguros. No almacenamos información bancaria.</li>
                    <li className="pl-4">Datos de uso: páginas visitadas, productos vistos, preferencias de navegación, dirección IP.</li>

                    <h2 className="text-xl font-semibold mt-6 mb-2">2. ¿Cómo utilizamos tus datos?</h2>
                    <li className="pl-4">Para procesar pedidos y enviar productos.</li>
                    <li className="pl-4">Para mejorar la experiencia del usuario y personalizar el contenido.</li>
                    <li className="pl-4">Para enviar comunicaciones promocionales (solo si diste tu consentimiento).</li>
                    <li className="pl-4">Para prevenir fraudes y garantizar la seguridad del sitio.</li>

                    <h2 className="text-xl font-semibold mt-6 mb-2">3. ¿Con quién compartimos tus datos?</h2>
                    <p>
                        Solo compartimos tu información con terceros cuando es estrictamente necesario:
                    </p>
                    <li className="pl-4">Servicios de pago (Stripe, PayPal, etc.).</li>
                    <li className="pl-4">Plataformas de envío y logística.</li>
                    <li className="pl-4">Herramientas de análisis (Google Analytics, etc.)</li>
                    <p className="mb-4">
                        Nunca vendemos tus datos personales a terceros.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">4. Tus derechos</h2>
                    <li className="pl-4">Acceder a tus datos personales.</li>
                    <li className="pl-4">Solicitar correcciones o eliminación de información.</li>
                    <li className="pl-4">Oponerte al uso de tus datos para fines publicitarios.</li>
                    <li className="pl-4">Ejercer tu derecho al olvido según el RGPD (si aplica).</li>

                    <h2 className="text-xl font-semibold mt-6 mb-2">5. Seguridad de la información</h2>
                    <p className="mb-4">
                        Aplicamos medidas técnicas y organizativas para proteger tus datos. Todas las conexiones están cifradas y trabajamos con plataformas certificadas para garantizar tu seguridad.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">6. Uso de cookies</h2>
                    <p className="mb-4">
                        Utilizamos cookies para personalizar la experiencia, analizar el tráfico y ofrecer contenido relevante. Puedes configurar tu navegador para aceptar o rechazar cookies según tus preferencias.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">7. Cambios en esta política</h2>
                    <p className="mb-4">
                        Nos reservamos el derecho a modificar esta Política de Privacidad en cualquier momento. Te notificaremos cualquier cambio importante a través del sitio web o por correo electrónico.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">8. Contacto</h2>
                    <p className="mb-4">
                        Si tienes preguntas sobre esta política o deseas ejercer tus derechos, puedes contactarnos en:
                    </p>
                    <li className="pl-4">✉️ <strong>privacidad@undersounds.com</strong></li>
                    <li className="pl-4">📍 Dirección física: [Dirección de la tienda, si aplica]</li>
                </CardContent>
                <CardContent id="cookieConfig">
                    <p className="text-3xl font-semibold mb-5" >Configuración de cookies</p>
                    <p className="mb-6">
                        En <strong>Undersounds</strong>, utilizamos cookies y tecnologías similares para mejorar tu experiencia como usuario, analizar el tráfico de nuestro sitio y personalizar el contenido que te mostramos, incluyendo recomendaciones musicales y publicidad.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">1. Responsable del tratamiento</h2>
                    <p className="mb-4">
                        <strong>Undersounds Music S.L.</strong><br />
                        CIF: Q9080985F<br />
                        Dirección: Avenida de la Universidad S/N, Norte, 10003, Cáceres<br />
                        Correo electrónico: <a href="mailto:privacidad@undersounds.com" className="text-blue-600 underline">privacidad@undersounds.com</a>
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">2. Finalidades del tratamiento</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li><strong>Cookies esenciales:</strong> Garantizar el funcionamiento básico del sitio web (login, seguridad, carrito, etc.).</li>
                        <li><strong>Cookies analíticas:</strong> Obtener estadísticas agregadas de navegación para mejorar el rendimiento.</li>
                        <li><strong>Cookies de personalización:</strong> Recordar preferencias como idioma o géneros musicales.</li>
                        <li><strong>Cookies de marketing:</strong> Mostrar anuncios personalizados dentro y fuera de Undersounds.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-2">3. Base legal del tratamiento</h2>
                    <p className="mb-4">
                        - Las cookies <strong>esenciales</strong> se basan en el <em>interés legítimo</em> de Undersounds.<br />
                        - Las cookies <strong>analíticas, de personalización y marketing</strong> requieren tu <em>consentimiento</em>, que puedes modificar en cualquier momento.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">4. Comunicación y cesión de datos</h2>
                    <p className="mb-4">
                        Algunos datos pueden compartirse con terceros para servicios tecnológicos, analíticos o publicitarios:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>Google Analytics</li>
                        <li>Meta (Facebook/Instagram Ads)</li>
                        <li>Spotify, YouTube</li>
                        <li>Proveedores de pago y logística (si corresponde)</li>
                    </ul>
                    <p className="mb-4">
                        Estos terceros actúan como encargados del tratamiento bajo acuerdos de confidencialidad y conforme al RGPD.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">5. Plazo de conservación</h2>
                    <p className="mb-4">
                        Las cookies pueden eliminarse al cerrar el navegador o permanecer activas hasta 2 años, salvo que las elimines antes manualmente.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">6. Derechos del usuario</h2>
                    <p className="mb-4">
                        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a:
                        <a href="mailto:privacidad@undersounds.com" className="text-blue-600 underline"> privacidad@undersounds.com</a>.
                        También puedes retirar tu consentimiento desde el <strong>Centro de Configuración de Cookies</strong>.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">7. Desactivación de cookies</h2>
                    <p className="mb-10">
                        Puedes gestionar o eliminar cookies desde nuestro Centro de Configuración o desde las preferencias de tu navegador web.
                    </p>
                </CardContent>
                <CardContent id="accesibility">
                    <p className="text-3xl font-semibold mb-5" >Accesibilidad</p>
                    <p className="mb-6">
                        En <strong>Undersounds</strong> estamos comprometidos con garantizar que nuestra plataforma de venta de música, tanto física como digital, sea accesible para todas las personas, incluidas aquellas con discapacidades visuales, auditivas, cognitivas y motoras.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">1. Nuestro compromiso</h2>
                    <p className="mb-4">
                        Buscamos cumplir con las pautas de accesibilidad WCAG 2.1 (Web Content Accessibility Guidelines) en el nivel AA, como estándar mínimo. Nuestro objetivo es proporcionar una experiencia de usuario inclusiva y equitativa para todos los usuarios, sin importar sus capacidades o el dispositivo que utilicen.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">2. Funcionalidades de accesibilidad implementadas</h2>
                    <ul className="list-disc list-inside mb-4">
                        <li>Compatibilidad con lectores de pantalla (navegación semántica, etiquetas ARIA).</li>
                        <li>Contrastes de color adecuados entre texto y fondo.</li>
                        <li>Soporte de navegación por teclado en todo el sitio.</li>
                        <li>Texto escalable sin pérdida de contenido o funcionalidad.</li>
                        <li>Controles accesibles para reproducción y compra de música.</li>
                        <li>Evitar contenido intermitente o parpadeante que pueda provocar molestias visuales.</li>
                    </ul>

                    <h2 className="text-xl font-semibold mt-6 mb-2">3. Limitaciones conocidas</h2>
                    <p className="mb-4">
                        Estamos en constante desarrollo, por lo que pueden existir secciones que aún no cumplen al 100% con todos los estándares. Si encuentras algún problema de accesibilidad, te invitamos a comunicarlo.
                    </p>

                    <h2 className="text-xl font-semibold mt-6 mb-2">4. Contacto para sugerencias o reportes</h2>
                    <p className="mb-10">
                        Si necesitas ayuda para navegar el sitio o quieres reportar un problema de accesibilidad, escríbenos a: <a href="mailto:accesibilidad@undersounds.com" className="text-blue-600 underline">accesibilidad@undersounds.com</a>.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}