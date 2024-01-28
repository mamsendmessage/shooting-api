const CacheServic = require('../services/CacheService');
const TicketImp = require('../implementation/ticketImplementation');
const PlayerImp = require('../implementation/playerImplementation');
const LaneImp = require('../implementation/laneImplementation');

class ConfigurationService {
    constructor() {

    }

    static async loadData() {
        CacheServic.cache.tickets = await TicketImp.GetAllTickets();
        CacheServic.cache.players = await PlayerImp.GetAllPlayers();
        CacheServic.cache.lanes = await LaneImp.GetAllLanes();
    }
}
module.exports = ConfigurationService;