class AuthenticationMiddleware {
  static authenticateToken(req, res, next) {
    // let authorization = req.headers.authorization;
    // const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    // if (!token) {
    //   return res.sendStatus(401);
    // }
    // const result = verifyAccessToken(token);

    // if (!result.success) {
    //   return res.status(403).json({ error: result.error });
    // }
    // req.user = result.data;
    next();
  }
}

module.exports = AuthenticationMiddleware;
