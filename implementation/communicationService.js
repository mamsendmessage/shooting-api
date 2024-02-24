const axios = require('axios');
const socket = require('socket.io');
const ConfigurationImplementation = require('./configurationImplementation');

class CommunicationService {

    lanes = [];

    static async httpGet(pUrl) {
        try {
            console.log('Call API at ' + new Date().toTimeString());
            // const response = await axios.get(pUrl);
        } catch (error) {
            console.error('API call failed:', error);
        }
    }

    static async startGame(planeId, pLevelId) {

        if (lanes.find((item) => item.ID == pLevelId)) {

        } else {
            lanes.push({ ID: planeId, queue: {} });
        }

        const tQueue = [];
        const tConfig = await ConfigurationImplementation.GetAllConfigurationByType(pLevelId);
        const tParsedConfig = JSON.parse(tConfig.Config);
        const skeets = [
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            'api_endpoint_1',
            'api_endpoint_2',
            // Add more API endpoints here as needed
        ];
        tQueue = tParsedConfig.Skeets;
        let callCount = 0;
        let apiIndex = 0;
        this.callAPI(callCount, apiIndex, tConfig.TimePerShot, tConfig.TimeToRefill, planeId, tParsedConfig.Skeets)
    }

    static async callAPI(callCount, apiIndex, timePerShoot, timeToRefill, planeId, skeets) {

        if (apiIndex == skeets.length) {
            return;
        }

        const tSkeet = skeets[apiIndex];
        for (let index = 0; index < tSkeet.API.length; index++) {
            const tUrl = tSkeet.API[index];
            await this.httpGet(tUrl);
        }
        callCount++;
        apiIndex = (apiIndex + 1) % skeets.length;
        // After every 2 calls, wait an additional 15 seconds
        if (callCount % 2 === 0) {
            setTimeout(async () => {
                await this.callAPI(callCount, apiIndex, timePerShoot, timeToRefill, planeId, skeets);
                this.SocketIO.sockets.emit('TimeUpdate', { laneId: planeId, timer: timeToRefill });
                // emit event to lane page
            }, timeToRefill * 1000);
        } else {
            setTimeout(async () => {
                await this.callAPI(callCount, apiIndex, timePerShoot, timeToRefill, planeId, skeets);
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