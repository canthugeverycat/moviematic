const DELAY_MS = 1000;

module.exports = (req, res, next) => setTimeout(next, DELAY_MS);
