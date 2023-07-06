import express from 'express'
import configuration from './config/index.js'
import routes from './routes/index.js'
import { error404, errorHandler } from "./utils/errors.js"
import bodyParser from 'body-parser';

const app = express();

// CONFIGURATION -------------------------------------------------------------------------
const config = configuration(app);

// MIDDLEWARE ----------------------------------------------------------------------------
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PATCH,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Client-Version');
    next();
});

// ROUTES --------------------------------------------------------------------------------
const r1 = routes(config);
app.use('/', r1);

// APPLICATION LAUNCHER ------------------------------------------------------------------
// 404 - Not found
app.use(function (req, res) {
    const err   = error404();
    const error = errorHandler({err, code: "NOT_FOUND"}, config.environment);
    res.status(error.code).json(error);
});

const server = app.listen(process.env.PORT || config.port, () => {
    const listeningPort = process.env.PORT || config.port;
    console.log('Server listening on port ' + listeningPort);
});

export { app, server };