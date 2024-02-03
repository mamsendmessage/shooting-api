const fs = require('fs');
class LoggerService {
  static Log(error) {
    console.log(error);
    fs.writeFileSync('/logs.log', JSON.stringify(error));

  }
}

module.exports = LoggerService;
