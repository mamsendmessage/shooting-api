const { toDateFromDB } = require("./CommonMethods");

class User {
    constructor(ID, Name, Email, Password, MobileNumber, CreationDate, RoleId) {
        this.ID = ID;
        this.Name = Name;
        this.Email = Email;
        this.Password = Password;
        this.MobileNumber = MobileNumber;
        this.CreationDate = toDateFromDB(CreationDate);
        this.RoleId = RoleId;
    }
}

module.exports = User;