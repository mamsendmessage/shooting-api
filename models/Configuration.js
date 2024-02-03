class Configuration {
    constructor(ID, Type, TimePerShot, TimeToRefill, NumberOfSkeets, Config) {
        this.ID = ID;
        this.Type = Type;
        this.TimePerShot = TimePerShot;
        this.TimeToRefill = TimeToRefill;
        this.Config = Config;
        this.NumberOfSkeet = NumberOfSkeets;
    }
}

module.exports = Configuration;