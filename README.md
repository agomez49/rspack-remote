# Toast Component - Module Federation Remote

Este proyecto expone un componente Toast reutilizable a través de Module Federation con rspack y Zephyr.

## Características del Toast

- ✅ Soporte para 4 tipos: `success`, `error`, `warning`, `info`
- 🎨 Estilizado con Tailwind CSS
- ⏱️ Auto-dismiss configurable
- 🎭 Animaciones suaves de entrada y salida
- 📍 Posicionado en la esquina superior derecha
- 🎯 TypeScript con tipos completos

## Como Usar en Otro Proyecto

### 1. Configurar Module Federation en tu proyecto host

En tu `rspack.config.js` o `webpack.config.js`:

```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    'rspack_remote': 'create_mf_app_host@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

### 2. Importar y usar el componente

```typescript
import React, { useState } from 'react';
// @ts-ignore
import { Toast, ToastProps } from 'rspack_remote/Toast';

function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <button onClick={() => setShowToast(true)}>
        Show Toast
      </button>
      
      <Toast
        message="¡Operación exitosa!"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
      />
    </div>
  );
}
```

## Props del Componente Toast

```typescript
interface ToastProps {
  message?: string;           // Mensaje a mostrar (default: "Toast notification")
  type?: "success" | "error" | "warning" | "info"; // Tipo de toast (default: "info")
  duration?: number;          // Duración en ms (default: 3000)
  onClose?: () => void;       // Callback cuando se cierra
  isVisible?: boolean;        // Control de visibilidad (default: false)
}
```

## Estilos

El componente usa Tailwind CSS para los estilos. Asegúrate de que tu proyecto host tenga Tailwind configurado o incluye los estilos CSS compilados.

## Scripts de Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm start

# Construir para producción
pnpm run build
```

## Servidor de Desarrollo

- **Local**: http://localhost:3001
- **Remote Entry**: http://localhost:3001/remoteEntry.js
- **Zephyr Cloud**: Desplegado automáticamente en Zephyr para desarrollo

## Tecnologías

- **React 19** - Framework de UI
- **rspack** - Bundler rápido
- **Module Federation** - Micro-frontends
- **Zephyr** - Deployment y optimización
- **Tailwind CSS v4** - Estilos
- **TypeScript** - Tipado estático
- **pnpm** - Gestor de paquetes

## Demo

El proyecto incluye una página de demo que muestra todos los tipos de toast disponibles. Visita http://localhost:3001 para ver la demostración interactiva.
