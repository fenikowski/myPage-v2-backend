const sendOkResponse = (result, req, res) => {
    res.status(200).json(result)
};

const sendCreatedResponse = (result, req, res) => {
    res.status(201).json(result);
};

const sendResponseNoContent = (result, req, res) => {
    res.status(204).json(result);
};

const sendResponseServerError = (res, err) => {
    res.status(500).json(err);
};

const sendResponseBadRequest = (res, err) => {
    res.status(400).json(err);
};

const sendResponseNotFound = (res, err) => {
    res.status(404).json(err);
};

const sendResponseUnprocessableEntity = (res, err) => {
    res.status(422).json(err);
};

const sendResponseUnauthorized = (res, error) => {
    res.status(401).json(error);
};

export {
    sendOkResponse,
    sendCreatedResponse,
    sendResponseNoContent,
    sendResponseBadRequest,
    sendResponseServerError,
    sendResponseNotFound,
    sendResponseUnprocessableEntity,
    sendResponseUnauthorized 
};