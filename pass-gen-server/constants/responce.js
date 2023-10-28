function ok(message, data = null) {
  this.status(200).json({
    message,
    data,
  });
}

function notFound(message) {
  this.status(404).json({
    message,
  });
}

function forbidden(message, data = null) {
  const responce = { message };
  if (data) responce["data"] = data;
  this.status(401).json(responce);
}

function unauthorized(message, data = null) {
  const responce = { message };
  if (data) responce["data"] = data;
  this.status(403).json(responce);
}

const responce = (req, res, next) => {
  res["ok"] = ok;
  res["forbidden"] = forbidden;
  res["notFound"] = notFound;
  res["unauthorized"] = unauthorized;
  next();
};

module.exports = { responce };
