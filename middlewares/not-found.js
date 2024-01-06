const notFound = (req, res, next) => {
    res.status(404).json({ message: 'Not Found' });
    next();
}

module.exports = notFound;