const { toDateFromDB } = require("./CommonMethods");
class X_TodayPlayer {
    constructor(UserId, Photo, Name, GameType, PlayerLevel, State, TicketType, UserType,LaneId, CreationDate) {
        this.UserId = UserId;
        this.Photo = Photo;
        this.Name = Name;
        this.GameType = GameType;
        this.PlayerLevel = PlayerLevel;
        this.State = State;
        this.TicketType = TicketType;
        this.UserType = UserType;
        this.LaneId = LaneId;
        this.CreationDate = toDateFromDB(CreationDate);
    }
}

module.exports = X_TodayPlayer;