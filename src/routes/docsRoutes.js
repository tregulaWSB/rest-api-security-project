const express = require('express');
const router = express.Router();
const swaggerUi = require('swagger-ui-express');
const yaml = require('js-yaml');
const fs = require('node:fs');
const path = require('node:path');

const swaggerDocument = yaml.load(
  fs.readFileSync(path.join(__dirname, '../docs/openapi.yaml'), 'utf8')
);

const swaggerOptions = {
  customSiteTitle: 'REST API Security Project — Docs',
  swaggerOptions: {
    persistAuthorization: true
  }
};

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(swaggerDocument, swaggerOptions));

module.exports = router;
