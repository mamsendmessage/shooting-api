const jwt = require("jsonwebtoken");
const secret = "a73ad30bc80c98ef659cc87f5fadf40d0257c68ea12de8c743157a183523fc5f";
const options = { expiresIn: "1d" };

class AuthenticationManager {
  static generateAccessToken(user) {
    const payload = {
      id: user.ID,
      email: user.Email,
      mobileNuber: user.MobileNuber,
      expiresIn: options.expiresIn,
    };
    return jwt.sign(payload, secret, options);
  }

  static verifyAccessToken(token) {
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = AuthenticationManager;
