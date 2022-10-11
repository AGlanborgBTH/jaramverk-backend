const logreq = (req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
}

module.exports={logreq}
