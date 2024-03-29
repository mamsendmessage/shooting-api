const { toDateFromDB } = require("./CommonMethods");

class Player {
    constructor(ID, Name, NationalityId, Age, MobileNumber, Photo, CreationDate, pDocument, PassportsNo, MembershipNo, MembershipExpiry) {
        this.ID = ID;
        this.Name = Name;
        this.NationalityId = NationalityId;
        this.Age = Age;
        this.MobileNumber = MobileNumber;
        this.Photo = Photo && Photo.length > 0 ? Photo : null;
        this.Document = pDocument && pDocument.length > 0 ? pDocument : '';
        this.CreationDate = toDateFromDB(CreationDate);
        this.PassportsNo = PassportsNo;
        this.MembershipNo = MembershipNo;
        this.MembershipExpiry = toDateFromDB(MembershipExpiry);
    }
}

module.exports = Player;