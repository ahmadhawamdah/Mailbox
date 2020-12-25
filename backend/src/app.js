const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');

const auth = require('./auth');
const emails = require('./emails');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.safeLoad(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.post('/auth', auth.authenticate);

// axios.post('http://localhost:3000/authenticate');
// app.post('/', auth.authenticate,
//     function(req, res) {
//       res.redirect(307, '3000/auth');
//     });

app.use(
    OpenApiValidator.middleware({
      apiSpec: apiSpec,
      validateRequests: true,
      validateResponses: true,
    }),
);

// Your routes go here
app.get('/v0/mail', auth.check, emails.getAll);
// app.get('/v0/mail/:id', auth.check, emails.getById);
// app.post('/v0/mail', auth.check, emails.postMail);
// app.put('/v0/mail/:id', auth.check, emails.moveMail);

// app.get('/v0/mail', emails.getAll);
app.get('/v0/mail/:id', emails.getById);
app.post('/v0/mail', auth.check, emails.postMail);
app.put('/v0/mail/:id', emails.moveMail);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
