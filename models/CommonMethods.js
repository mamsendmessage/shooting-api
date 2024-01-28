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
}
module.exports = CommonMethods;
