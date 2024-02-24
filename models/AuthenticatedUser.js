class AuthenticatedUser {
    constructor(pId, pToken, Name, RoleId) {
        this.ID = pId;
        this.Token = pToken;
        this.Name = Name;
        this.RoleId = RoleId
    }
}

module.exports = AuthenticatedUser;