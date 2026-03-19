# 🚀 Evaluación de Madurez en IA Generativa

Plataforma interactiva para evaluar el nivel de madurez tecnológica en Inteligencia Artificial Generativa (GenAI), con una aplicación de evaluación pública y un portal administrativo para visualizar resultados y exportar datos.

## Estructura del repositorio

- `backend/` — API mínima en Node.js y capa de datos
	- `index.js`, `package.json`, `pm2.config.cjs`
	- `db/` — archivos de base de datos y ayudas (se usa SQLite en los servicios)
	- `services/` — módulos auxiliares: `db.js`, `logger.js`, `requestValidator.js`, `errorHandler.js`

	Importante: para ejecutar en producción se debe generar el archivo `pm2.config.cjs` dentro de la carpeta `backend/` con al menos las variables `PORT` y `JWT_SECRET` definidas. Ejemplo mínimo:

```javascript
module.exports = {
	apps: [
		{
			name: 'aws-assessment-backend',
			script: 'index.js',
			env_production: {
				PORT: '50900',
				JWT_SECRET: 'REEMPLAZAR_POR_UN_SECRETO_FUERTE'
			}
		}
	]
};
```

No incluyas secretos en el control de versiones; utiliza gestores de secretos o variables de entorno en tu entorno de despliegue.

- `eval/` — Aplicación pública de evaluación (React + Vite)
	- `src/` — interfaz de evaluación, preguntas, assets, i18n y estilos
	- `src/App.jsx` — flujo de la evaluación, validaciones del formulario, cálculo de resultados y envío al backend
	- `src/assets/` — imágenes usadas por la app de evaluación (`AWS-white.png`, `awscolor.png`, `fondo.jpg`)
	- `package.json` y `vite.config.js` para desarrollo local y build

- `portal/` — Aplicación administrativa / portal (React + Vite)
	- `src/` — UI del portal, login, tabla de entradas, panel de detalles y exportación CSV
	- `src/components/DetailsModal.jsx` — panel de detalles y visualización radar
	- `src/locales/` — traducciones para el portal (en/es)
	- `package.json` y `vite.config.js`

## Cómo ejecutar localmente

1. Backend

```bash
cd backend
npm install
npm start  # o: node index.js / pm2 start pm2.config.cjs
```

2. Aplicación de evaluación (`eval`)

```bash
cd eval
npm install
npm run dev
# o para producción: npm run build
```

3. Portal administrativo (`portal`)

```bash
cd portal
npm install
npm run dev
# o para producción: npm run build
```

## Notas

- La app de evaluación (`eval`) envía los resultados al endpoint `/submit` del backend; el payload incluye campos de usuario (`nombre`, `organizacion`, `correo`, `telefono`, `rol`, `pais`, `estado`) y el objeto de resultados calculados.
- El portal (`portal`) utiliza un token proporcionado por la API durante el login para peticiones autenticadas a `/portal` y permite exportar las entradas a CSV directamente desde la interfaz.
- Las traducciones para inglés y español se encuentran en `src/locales` de cada app.