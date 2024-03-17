const fs = require("fs");
const { v4: uuidv4, } = require('uuid');
const moment = require('moment');
const LoggerService = require("../services/LoggerService");
Date.prototype.toJSON = function () {
    return moment(this).format('YYYY-MM-DD HH:mm:ss');
};

class CommonMethods {

    static getCurrentDateTimeForDB() {
        const currentDate = new Date();
        return currentDate.toISOString(); // Convert to UTC string format
    }

    static convertDBDateTimeToLocal(dateTimeFromDB) {
        const dbDate = new Date(dateTimeFromDB);
        const localDate = new Date(dbDate.toLocaleString("en-US", { timeZone: "Your_Local_Timezone" }));
        return localDate; // Local timezone date/time
    }

    static toDateFromDB(CreationDate) {
        let t_date = null;
        if (CreationDate !== null && CreationDate !== undefined) {
            const startTimestring = new Date(CreationDate).toUTCString().slice(0, 24);
            t_date = new Date(startTimestring);
        }
        return t_date;
    }
    static isToday(date) {
        if (!date) {
            return false;
        }
        const today = new Date();
        const tCurrentYear = today.getFullYear();
        const tCurrentMonth = today.getMonth();
        const tCurrentDay = today.getDay();

        if (tCurrentYear == date.getFullYear() && tCurrentMonth == date.getMonth() && tCurrentDay == date.getDay()) {
            return true;
        }
        return false;
    }



    static getNowDate() {
        return new Date()
    }

    static SavePlayerImage(pBase64Image) {
        try {
            if (pBase64Image && pBase64Image.length > 0) {
                const tImageName = `images/${uuidv4()}.png`;
                var base64Data = pBase64Image.replace(/^data:image\/png;base64,/, "");
                fs.writeFileSync(tImageName, base64Data, 'base64');
                return tImageName;
            } else {
                return "";
            }
        } catch (error) {
            LoggerService.Log(error);
            return "";
        }
    }



    static SavePlayerDocument(pBase64Document) {
        try {
            if (pBase64Document && pBase64Document.length > 0) {
                // Extract the MIME type from the Base64 string
                const matches = pBase64Document.match(/^data:([A-Za-z-+\/]+);base64,/);
                if (!matches || matches.length !== 2) {
                    throw new Error('Invalid base64 string');
                }

                const mimeType = matches[1];
                const extension = mimeType.split('/')[1]; // Extract file extension from MIME type

                const tDocumentName = `documents/${uuidv4()}.${extension == 'plain' ? 'txt' : extension}`;
                var base64Data = pBase64Document.replace(/^data:([A-Za-z-+\/]+);base64,/, "");
                fs.writeFileSync(tDocumentName, base64Data, 'base64');
                return tDocumentName;
            } else {
                return "";
            }
        } catch (error) {
            LoggerService.Log(error);
            return "";
        }
    }
}
module.exports = CommonMethods;
