class AuthenticatedUser {
    constructor(pId, pToken,Name) {
        this.ID = pId;
        this.Token = pToken;
        this.Name = Name;
    }
}

module.exports = AuthenticatedUser;