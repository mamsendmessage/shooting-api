const CommonMethods = require("./CommonMethods");
const { toDateFromDB } = require("./CommonMethods");

class Ticket {
    constructor(ID, UserId, LaneId, GameTypeId, PlayerLevelId, SessionTimeId, State, TicketType, UserType, CreationDate, LastModificationDate, GamePeriod) {
        this.ID = ID;
        this.UserId = UserId;
        this.LaneId = LaneId;
        this.GameTypeId = GameTypeId;
        this.PlayerLevelId = PlayerLevelId;
        this.SessionTimeId = SessionTimeId;
        this.State = State;
        this.TicketType = TicketType;
        this.UserType = UserType;
        this.CreationDate = CreationDate;
        this.LastModificationDate = LastModificationDate;
        this.GamePeriod = GamePeriod;
    }
}
module.exports = Ticket;