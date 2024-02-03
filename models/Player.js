const { toDateFromDB } = require("./CommonMethods");

class Player {
    constructor(ID, Name, NationalityId, Age, MobileNumber, Photo, CreationDate) {
        this.ID = ID;
        this.Name = Name;
        this.NationalityId = NationalityId;
        this.Age = Age;
        this.MobileNumber = MobileNumber;
        this.Photo = Photo && Photo.length > 0 ? Photo : null;
        this.CreationDate = toDateFromDB(CreationDate);
    }
}

module.exports = Player;