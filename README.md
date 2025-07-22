# Toast Component - Module Federation Remote

This project exposes a reusable Toast component through Module Federation with Rspack and Zephyr.

## Toast Features

- ✅ Support for 4 types: `success`, `error`, `warning`, `info`
- 🎨 Styled with Tailwind CSS v3
- ⏱️ Configurable auto-dismiss timer
- 🎭 Smooth entrance and exit animations
- 📍 Positioned in the top-right corner
- 🎯 Full TypeScript typing support
- 🐛 Debug mode for troubleshooting

## How to Use in Another Project

### 1. Configure Module Federation in your host project

In your `rspack.config.js` or `webpack.config.js`:

```javascript
new ModuleFederationPlugin({
  name: 'host',
  remotes: {
    'remoteToast': 'remoteToast@http://localhost:8080/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
  },
})
```

### 2. Import and use the component

```typescript
import React, { useState } from 'react';
// @ts-ignore
import Toast from 'remoteToast/Toast';

function App() {
  const [showToast, setShowToast] = useState(false);

  return (
    <div>
      <button onClick={() => setShowToast(true)}>
        Show Toast
      </button>
      
      <Toast
        message="Operation successful!"
        type="success"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
        duration={3000}
        debugMode={true}
      />
    </div>
  );
}
```

## Toast Component Props

```typescript
interface ToastProps {
  message?: string;           // Message to display (default: "Toast notification")
  type?: "success" | "error" | "warning" | "info"; // Toast type (default: "info")
  duration?: number;          // Duration in ms (optional - if not set, toast stays until manually closed)
  onClose?: () => void;       // Callback when toast closes
  isVisible?: boolean;        // Visibility control (default: false)
  debugMode?: boolean;        // Enable debug logs (default: false)
}
```

## Styling

The component uses Tailwind CSS for styling. Ensure that your host project has Tailwind configured or include the compiled CSS styles.

## Development Scripts

```bash
# Install dependencies
pnpm install

# Start development server
pnpm start

# Build for production
pnpm run build

# Build for development  
pnpm run build:dev

# Start the built application
pnpm run build:start
```

## Development Server

- **Local**: [http://localhost:8080](http://localhost:8080)
- **Remote Entry**: [http://localhost:8080/remoteEntry.js](http://localhost:8080/remoteEntry.js)
- **Zephyr Cloud**: Automatically deployed on Zephyr for development

## Exposed Components

This remote exposes one component through Module Federation:

**`./Toast`** - The main Toast component (`src/Toast.tsx`)

## Troubleshooting Visibility Issues

If you experience issues with the Toast component not being visible in your host application:

### Common Issues & Solutions

1. **Z-index conflicts**: The Toast uses `z-index: 9999` with fallback inline styles to ensure visibility
2. **CSS conflicts**: Use `debugMode={true}` to see detailed rendering logs in the console
3. **Duration issues**: If not specifying a duration, the toast will stay visible until closed manually
4. **Component loading**: Check browser console for any Module Federation loading errors

### Debug Mode

Enable debug mode to see detailed logs:

```typescript
<Toast debugMode={true} ... />
```

This will log:

- Component prop changes
- Render cycles
- Timer operations
- Visibility state changes

## Technologies

- **React 19** - UI Framework
- **Rspack 1.2** - Fast bundler  
- **Module Federation** - Micro-frontends architecture
- **Zephyr** - Deployment and optimization
- **Tailwind CSS 3.4** - Styling
- **TypeScript 5.7** - Static typing
- **pnpm** - Package manager
- **clsx** - Conditional class names utility

## Project Structure

```text
src/
├── Toast.tsx              # Main Toast component
├── App.tsx                # Demo application
├── index.ts               # Main entry point
└── index.css             # Tailwind CSS imports

rspack.config.ts          # Rspack configuration with Module Federation
compilation.config.js      # Custom compilation messages
postcss.config.js         # PostCSS configuration for Tailwind
tailwind.config.js        # Tailwind CSS configuration
package.json              # Dependencies and scripts
```

## Demo

The project includes a demo page that shows all available toast types. Visit [http://localhost:8080](http://localhost:8080) to see the interactive demonstration.
