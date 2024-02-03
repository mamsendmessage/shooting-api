const fs = require("fs");
const { v4: uuidv4, } = require('uuid');
const LoggerService = require("../services/LoggerService");
class CommonMethods {
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


    static SavePlayerImage(pBase64Image) {
        try {
            const tImageName = `images/${uuidv4()}.png`;
            var base64Data = pBase64Image.replace(/^data:image\/png;base64,/, "");
            fs.writeFileSync(tImageName, base64Data, 'base64');
            return tImageName;
        } catch (error) {
            LoggerService.Log(error);
            return "";
        }
    }

    

    static SavePlayerDocument(pBase64Document) {
        try {
            const tDocumentName = `documents/${uuidv4()}.png`;
            var base64Data = pBase64Document.split(';')[1].replace(/^base64,/, "");
            fs.writeFileSync(tDocumentName, base64Data, 'base64');
            return tDocumentName;
        } catch (error) {
            LoggerService.Log(error);
            return "";
        }
    }
}
module.exports = CommonMethods;
