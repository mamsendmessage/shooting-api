const { toDateFromDB } = require("./CommonMethods");

class Ticket {
    constructor(ID, UserId, LaneId, GameTypeId, PlayerLevelId, SesstionTimeId, State, CreationDate, LastModificationDate) {
        this.ID = ID;
        this.UserId = UserId;
        this.LaneId = LaneId;
        this.GameTypeId = GameTypeId;
        this.PlayerLevelId = PlayerLevelId;
        this.SesstionTimeId = SesstionTimeId;
        this.State = State;
        this.CreationDate = toDateFromDB(CreationDate);
        this.LastModificationDate = toDateFromDB(LastModificationDate);
    }
}
module.exports = Ticket;