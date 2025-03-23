# Undersounds - Frontend

# Presentación

## Descripción
Este es un proyecto desarrollado para la asignatura Programación en Internet, impartida en el Grado de Ingeniería Informática en Ingeniería del Software de la Universidad de Extremadura.

Undersounds pretende ser una plataforma digital para la distribución y venta de música, que permite a los usuarios adquirir música en diferentes formatos: digital, CD, vinilo y cassette.

Este repositorio aloja el frontend usado en el proyecto. A continuación se explica el flujo de trabajo establecido en el repositorio, así como el despliegue y funcionamiento del sistema.

## Tecnologías utilizadas
Para desarrollo y empaquetado web:
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vite.dev/)
- [shadcn](https://ui.shadcn.com/)

Automatizaciones y análisis de errores
- [GitHub Actions](https://github.com/features/actions)

Despliegue:
- [Vercel](https://vercel.com/)

# Despliegue a través de Vercel - [enlace](https://undersounds.vercel.app)
Puedes visualizar la rama main del repositorio en vivo desde [aquí](https://undersounds.vercel.app).

# Instalación y despliegue
A continuación se detallan los pasos para instalar y desplegar la aplicación de forma local.

## Requisitos previos
- Node.js (v16.0.0 o superior)
- npm (v8.0.0 o superior)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/rdereparadores/undersounds-frontend
cd undersounds-frontend
```

2. Instala las dependencias requeridas:
```bash
npm install --legacy-peer-deps
```

## Despliegue
Para desplegar la aplicación:
```bash
npm run dev
```
Esto iniciará el servidor en modo desarrollador en `http://localhost:5173`

## Compilación para producción
Para generar los archivos de distribución para producción:
```bash
npm run build
```
Esto generará los archivos compilados en el directorio `dist/`

# Flujo de trabajo Git
El repositorio utiliza GitHub Actions para automatizar la compilación y examen de errores en cada push. Consulta [build.yaml](.github/workflows/build.yaml) para más detalles.