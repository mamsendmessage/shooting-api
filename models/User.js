const { toDateFromDB } = require("./CommonMethods");

class User {
    constructor(ID, Name, Email, Password, MobileNumber, CreationDate) {
        this.ID = ID;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.MobileNumber = MobileNumber;
        this.CreationDate = toDateFromDB(CreationDate);
    }
}

module.exports = User;