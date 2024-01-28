
class CacheModel {
    constructor() {
        this.tickets = [];
        this.players = [];
        this.lanes = [];
    }
}

class CacheService {
    static cache = new CacheModel();
    constructor() {

    }
}
module.exports = CacheService;