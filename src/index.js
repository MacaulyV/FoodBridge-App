// src/index.js
require('dotenv').config();

const express       = require('express');
const cors          = require('cors');
const fs            = require('fs');
const path          = require('path');
const yaml          = require('js-yaml');
const swaggerUi     = require('swagger-ui-express');

const userRoutes     = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');
const errorHandler   = require('./middlewares/errorHandler');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Serve arquivos de upload sob /uploads
app.use(
    '/uploads',
    express.static(path.resolve(__dirname, '../uploads'))
);

// Swagger UI
const swaggerFile = path.resolve(__dirname, '../swagger.yaml');
const swaggerYml  = fs.readFileSync(swaggerFile, 'utf8');
const swaggerDoc  = yaml.load(swaggerYml);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Rotas
app.use('/users', userRoutes);
app.use('/donations', donationRoutes);

// Handler de erros
app.use(errorHandler);

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 API rodando em http://localhost:${PORT}`);
    console.log(`📚 Docs em http://localhost:${PORT}/api-docs`);
});
