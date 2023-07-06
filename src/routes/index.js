import { Router } from 'express';
import { indexController } from '../controllers/indexController.js';
import { sendCreatedResponse, sendOkResponse, sendResponseNoContent } from '../utils/responses.js';
import { deleteMessageController, getMessageController, postMessageController } from '../controllers/messageController.js';
import { postVisitController } from '../controllers/visitController.js';
import { getStatsController } from '../controllers/statsController.js';
import { postUserController } from '../controllers/userController.js';
import { postLoginController } from '../controllers/loginController.js';

export default (config) => {
  const routes = Router();

  routes.get("/",
    indexController,
    (result, req, res, next) => sendOkResponse(result, req, res, next)
  )

  routes.post("/login", 
    (req, res, next) => postLoginController(req, res, next, config),
    (result, req, res, next) => sendCreatedResponse(result, req, res, next)
  );

  routes.post("/user",
    (req, res, next) => postUserController(req, res, next, config),
    (result, req, res, next) => sendCreatedResponse(result, req, res, next)
  );

  routes.get("/message", 
    (req, res, next) => getMessageController(req, res, next, config),
    (result, req, res, next) => sendOkResponse(result, req, res, next)
  );
  
  routes.post("/message",
    (req, res, next) => postMessageController(req, res, next, config),
    (result, req, res, next) => sendCreatedResponse(result, req, res, next)
  );
  
  routes.delete("/message",
    (req, res, next) => deleteMessageController(req, res, next, config),
    (result, req, res, next) => sendResponseNoContent(result, req, res, next)
  );
  
  routes.post("/visit",
    (req, res, next) => postVisitController(req, res, next, config),
    (result, req, res, next) => sendCreatedResponse(result, req, res, next)
  );
  
  routes.get("/stats",
    (req, res, next) => getStatsController(req, res, next, config),
    (result, req, res, next) => sendOkResponse(result, req, res, next)
  );
  

  return routes;
};