const axios = require('axios');
const socket = require('socket.io');
const ConfigurationImplementation = require('./configurationImplementation');
const Queue = require('../models/Queue');
class CommunicationService {
    static lanesQueues = [];
    constructor() {
        this.lanesQueues = [];
    }
    static AddLaneQueue(pLaneId, pSkeets, pTicketId) {
        pSkeets = pSkeets.sort((a, b) => a.Order - b.Order);
        const tQueue = new Queue(pSkeets);
        const tLane = { ID: pLaneId, queue: tQueue, state: 1, ticketId: pTicketId }
        CommunicationService.lanesQueues.push(tLane);
    }

    static IsLaneLaneQueueEmpty(pLaneId) {
        const tLane = this.lanesQueues.find((item) => item.ID == pLaneId);
        if (tLane) {
            if (tLane.queue.isEmpty()) {
                this.SocketIO.sockets.emit('FinishTicket', { laneId: pLaneId, ticketId: tLane.ticketId });
                return true;
            }
            return false;
        } else {
            return false;
        }
    }

    static DeleteLaneQueue(pLaneId) {
        this.lanesQueues = this.lanesQueues.filter((item) => item.ID != pLaneId);
    }

    static GetLane(pLaneId) {
        const tLane = this.lanesQueues.find((item) => item.ID == pLaneId);
        return tLane;
    }

    static PauseLaneQueue(pLaneId) {
        const tLane = this.lanesQueues.find((item) => item.ID == pLaneId);
        tLane.state = -1;

    }

    static ResumeLaneQueue(pLaneId) {
        const tLane = this.lanesQueues.find((item) => item.ID == pLaneId);
        tLane.state = 1;

    }

    static async httpGet(pUrl) {
        try {
            console.log('Call API at ' + new Date().toTimeString());
            const response = await axios.get(pUrl);
        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    static GetLaneQueue(planeId) {
        const tLane = this.lanesQueues.find((item) => item.ID == planeId);
        if (tLane) {
            return tLane;
        } else {
            const tQueue = new Queue();
            const tLane = { ID: planeId, queue: tQueue }
            this.lanesQueues.push(tLane);
            return tLane;
        }
    }

    static async startCompetitionGame() {
        try {
            const tConfig = await ConfigurationImplementation.GetAllConfigurationByType(null);
            let tSkeets = [];
            const tParsedConfig = JSON.parse(tConfig.Config);
            for (let index = 0; index < tParsedConfig.Configurations.length; index++) {
                const tConfiguration = tParsedConfig.Configurations[index];
                tSkeets = tSkeets.concat(tConfiguration.Skeets)
            }
            this.AddLaneQueue(-100, tSkeets, -1);
            let callCount = 0;
            setTimeout(async () => {
                this.callAPI2(callCount, tConfig.TimePerShot, -100);
            }, 3000);
        } catch (error) {
            console.error(error);
        }
    }

    static async startGame(pLaneId, pLevelId, pTicketId) {
        const tConfig = await ConfigurationImplementation.GetAllConfigurationByType(pLevelId);
        let tSkeets = [];
        const tParsedConfig = JSON.parse(tConfig.Config);
        if (pLevelId == null) {
            for (let index = 0; index < tParsedConfig.Configurations.length; index++) {
                const tConfiguration = tParsedConfig.Configurations[index];
                tSkeets = tSkeets.concat(tConfiguration.Skeets)
            }
        } else {
            tSkeets = tSkeets.concat(tParsedConfig.Skeets);
        }
        this.AddLaneQueue(pLaneId, tSkeets, pTicketId);
        let callCount = 0;
        setTimeout(async () => {
            this.callAPI(callCount, tConfig.TimePerShot, tConfig.TimeToRefill, pLaneId)
        }, 3000);
    }

    static async callAPI(callCount, timePerShoot, timeToRefill, pLaneId) {

        let tSkeets;
        if (this.IsLaneLaneQueueEmpty(pLaneId)) {
            return;
        } else {
            const tLane = this.GetLaneQueue(pLaneId);
            if (tLane.state == 1) {
                tSkeets = tLane.queue.dequeue();
            }
        }
        if (tSkeets) {
            for (let index = 0; index < tSkeets.API.length; index++) {
                const tUrl = tSkeets.API[index];
                await this.httpGet(tUrl);
                callCount++;
            }
        }
        if (callCount % 2 === 0) {
            this.SocketIO.sockets.emit('TimeToRefill', { laneId: pLaneId, timer: timeToRefill });
            setTimeout(async () => {
                await this.callAPI(callCount, timePerShoot, timeToRefill, pLaneId);
            }, (timeToRefill + 1) * 1000);
        } else {
            this.SocketIO.sockets.emit('TimePerShot', { laneId: pLaneId, timer: timePerShoot });
            setTimeout(async () => {
                await this.callAPI(callCount, timePerShoot, timeToRefill, pLaneId);
            }, (timePerShoot + 1) * 1000);
        }
    }

    static async callAPI2(callCount, timePerShoot, pLaneId) {

        let tSkeets;
        if (this.IsLaneLaneQueueEmpty(pLaneId)) {
            return;
        } else {
            const tLane = this.GetLaneQueue(pLaneId);
            tSkeets = tLane.queue.dequeue();
        }
        this.SocketIO.sockets.emit('TimePerShot', { laneId: tSkeets.LaneId, timer: timePerShoot });
        setTimeout(async () => {
            if (tSkeets) {
                for (let index = 0; index < tSkeets.API.length; index++) {
                    const tUrl = tSkeets.API[index];
                    console.log(JSON.stringify(tSkeets));
                    await this.httpGet(tUrl);
                    callCount++;
                }
            }
            await this.callAPI2(callCount, timePerShoot, pLaneId);
        }, (timePerShoot + 1) * 1000);
    }

    static InitializeSocketIO(server) {
        this.SocketIO = socket(server, {
            cors: {
                origin: '*',
            }
        });
        this.SocketIO.on('connection', (socket) => {
            console.log('A connection has been created with' + socket.id);
            socket.on('Change', (changes) => {
                this.SocketIO.sockets.emit('Change', changes);
            });
            socket.on('Create', (newData) => {
                this.SocketIO.sockets.emit('Create', newData);
            })
        })
    }

}

module.exports = CommunicationService;