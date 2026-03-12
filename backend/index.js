const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('./services/logger');
const { hashEmail, openDB } = require('./services/db');
const { errorHandler } = require('./services/errorHandler');
const requestValidator = require('./services/requestValidator');
const { body } = require('express-validator');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.set('trust proxy', 1);

// Logging
morgan.token('real-ip', (req) => {
	return req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.ip;
});

morgan.token('local-time', () => {
	const timezone = 'America/Mexico_City';
	const now = new Date();
	return now.toLocaleString('en-US', {
		timeZone: timezone,
		month: 'short',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit',
		hour12: false
	}).replace(/,/, '');
});

app.use(morgan(':status :response-time ms (:local-time) :real-ip :method :url :res[content-length]', {
	stream: logger.stream
}));

// CORS
const corsOptions = {
	origin: function (origin, callback) {
		if (!origin) return callback(null, true);
		if (origin.includes('showcase.elcilantro.site')) return callback(null, true);
		return callback(new Error('Not allowed by CORS'));
	},
	credentials: true,
	optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// ============================================
// ROUTES
// ============================================

app.get('/health', async (req, res) => {
	try {
		const db = openDB();
		const rows = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';").all();
		const tables = rows.map(r => r.name);

		if (tables.length === 1) {
			return res.status(200).send("(•◡•)");
		}

		return res.status(500).send("(╯°□°）╯︵ ┻━┻");
	} catch (err) {
		errorHandler(err, res);
	}
});

app.post('/email-check', [
	body('email').isEmail().normalizeEmail().withMessage('Invalid email format')
], requestValidator, async (req, res) => {
	let db;
	try {
		db = openDB();
		const { email } = req.body;
		const correo_hash = hashEmail(email);
		const existing = db.prepare("SELECT id FROM contacts WHERE correo_hash = ?").get(correo_hash);

		if (existing) {
			return res.status(200).json({ exists: true });
		}
		return res.status(200).json({ exists: false });
	} catch (err) {
		errorHandler(err, res);
	} finally {
		if (db) db.close();
	}
});

app.post('/submit', [
	body('email').isEmail().normalizeEmail().withMessage('Invalid email format'),
	body('nombre').notEmpty().withMessage('Name is required'),
	body('organizacion').notEmpty().withMessage('Organization is required'),
	body('telefono').notEmpty().withMessage('Phone is required'),
	body('rol').notEmpty().withMessage('Role is required'),
	body('pais').notEmpty().withMessage('Country is required'),
	body('resultados').notEmpty().withMessage('Results are required')
], requestValidator, async (req, res) => {
	let db;
	try {
		db = openDB();
		const { email, nombre, organizacion, telefono, rol, pais, resultados } = req.body;
		const correo_hash = hashEmail(email);
		const fecha = new Date().toISOString();

		const query = db.prepare(`INSERT INTO contacts (
			nombre,
			organizacion,
			correo,
			correo_hash,
			telefono,
			rol,
			pais,
			fecha,
			resultados
			) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
		`).run(nombre, organizacion, email, correo_hash, telefono, rol, pais, fecha, JSON.stringify(resultados));
		
		if (query.changes === 1) {
			return res.status(201).json({ message: 'Data submitted successfully' });
		}
		return res.status(500).json({ message: 'Failed to submit data' });
	} catch (err) {
		errorHandler(err, res);
	} finally {
		if (db) db.close();
	}
});


// 404 Handler
app.use('/', (req, res) => {
    res.status(404).send('(≖_≖ )');
});

// Start server
async function start() {
	try {
		app.listen(PORT, () => {
			logger.info(`Server running on port ${PORT}`);
		});
	} catch (err) {
		logger.error('Error starting server:', err);
		process.exit(1);
	}
}

// Graceful shutdown

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);

async function shutdown() {
	logger.info('Shutting down server...');
	process.exit(0);
}

start();