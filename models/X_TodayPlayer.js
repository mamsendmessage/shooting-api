const { toDateFromDB } = require("./CommonMethods");
class X_TodayPlayer {
    constructor(UserId, TicketId, Photo, Name, GameType, PlayerLevel, State, TicketType, UserType, LaneId, LaneName, LaneNumber, CreationDate) {
        this.UserId = UserId;
        this.TicketId = TicketId;
        this.Photo = Photo;
        this.Name = Name;
        this.GameType = GameType;
        this.PlayerLevel = PlayerLevel;
        this.State = State;
        this.TicketType = TicketType;
        this.UserType = UserType;
        this.LaneId = LaneId;
        this.LaneName = LaneName;
        this.LaneNumber = LaneNumber;
        this.CreationDate = toDateFromDB(CreationDate);
    }
}

module.exports = X_TodayPlayer;