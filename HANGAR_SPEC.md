# ESPECIFICACIÓN TÉCNICA: MÓDULO HANGAR (PORTAFOLIO)

## 1. Contexto Global
El proyecto "Lotos OS" es un portafolio personal con estética Cyberpunk/Sci-Fi.
- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Estilos:** Ya existen variables en `globals.css` (.glass-panel, --accent-green, etc).
- **Restricción:** NO MODIFICAR `app/layout.tsx` (El Shell es sagrado).

## 2. Requerimientos de Datos (Mock Data)
Archivo objetivo: `lib/data/projects.ts`
Debes exportar una constante `PROJECTS` tipada.

### Interface Project:
- `id`: string
- `title`: string
- `description`: string (Max 120 caracteres)
- `techStack`: string[] (Array de tecnologías)
- `links`: { demo: string, repo: string }
- `featured`: boolean

### Datos Iniciales (Mock):
Generar 4 proyectos con temática Cyber-Seguridad / Dev:
1. "NEURAL SENTRY" (Python/AI)
2. "CRYPTO-GRID" (Web3/Finance)
3. "ECHO PROTOCOL" (P2P Chat)
4. "AUTOMATA CORE" (DevOps)

## 3. Requerimientos de UI (Componente)
Archivo objetivo: `components/ui/ProjectCard.tsx`

### Diseño Visual:
- Contenedor: Usar clase `.glass-panel` existente.
- Borde: `border border-white/5` (sutil) que cambia a `border-accent-green/50` en hover.
- Tipografía: Títulos en fuente monoespaciada (`font-mono`).
- Tags: Pills pequeñas con fondo `bg-accent-blue/10` y texto `text-accent-blue`.

### Comportamiento (Framer Motion):
- `whileHover`: Escalar ligeramente (1.02) y aumentar brillo.
- Iconos: Usar `lucide-react` (Github, ExternalLink) para los botones de acción.

## 4. Requerimientos de Página
Archivo objetivo: `app/hangar/page.tsx`

### Layout:
- Grid Responsive: 1 columna (móvil), 2 columnas (tablet), 3 columnas (desktop).
- Gap: `gap-6`.

### Animación de Entrada:
- Implementar `staggerChildren` (efecto cascada).
- Las tarjetas no deben aparecer de golpe, deben deslizarse hacia arriba (`fadeInUp`).