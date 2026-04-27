const errorHandler = (err, req, res, next) => {
  if (err.name === 'CustomError') {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  console.error(`[ERROR] ${req.method} ${req.path}`, err);
  return res.status(500).json({ msg: 'internal server error' });
};

module.exports = { errorHandler };
