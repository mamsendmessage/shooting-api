const { toDateFromDB } = require("./CommonMethods");

class Lane {
    constructor(ID, Name, Number, CreationDate) {
        this.ID = ID;
        this.Name = Name;
        this.Number = Number;
        this.CreationDate = toDateFromDB(CreationDate);
    }
}

module.exports = Lane;