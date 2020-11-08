const status = (req, res, next) => {
  try {
    const success = true;
    req.test = { success };
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { status };
