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
            // const response = await axios.get(pUrl);
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
            lanes.push(tLane);
            return tLane;
        }
    }

    static async startGame(pLaneId, pLevelId, pTicketId) {
        const tConfig = await ConfigurationImplementation.GetAllConfigurationByType(pLevelId);
        const tParsedConfig = JSON.parse(tConfig.Config);
        this.AddLaneQueue(pLaneId, tParsedConfig.Skeets, pTicketId);
        let callCount = 0;
        this.callAPI(callCount, tConfig.TimePerShot, tConfig.TimeToRefill, pLaneId)
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
            }
        }
        callCount++;
        // After every 2 calls, wait an additional 15 seconds
        if (callCount % 2 === 0) {
            setTimeout(async () => {
                await this.callAPI(callCount, timePerShoot, timeToRefill, pLaneId);
                this.SocketIO.sockets.emit('TimeUpdate', { laneId: pLaneId, timer: timeToRefill });
                // emit event to lane page
            }, timeToRefill * 1000);
        } else {
            setTimeout(async () => {
                await this.callAPI(callCount, timePerShoot, timeToRefill, pLaneId);
            }, timePerShoot * 1000);
        }
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