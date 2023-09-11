export  class RollingSizeOptions{
    static OneKB = 1024;
    static FiveKB = 5 * 1024;
    static TenKB = 10 * 1024;
    static TwentyKB = 20 * 1024;
    static FiftyKB = 50 * 1024;
    static HundredKB = 100 * 1024;
    static HalfMB = 512 * 1024;
    static OneMB = 1024 * 1024;
    static FiveMB = 5 * 1024 * 1024;
    static TenMB = 10 * 1024 * 1024;
    static TwentyMB = 20 * 1024 * 1024;
    static FiftyMB = 50 * 1024 * 1024;
    static HundredMB = 100 * 1024 * 1024;

    static assert(size_threshold){
        if (typeof size_threshold !== "number" || size_threshold < RollingSizeOptions.OneKB ){
            throw new Error(`size_threshold must be at least 1KB. Unsupported param ${JSON.stringify(size_threshold)}`)
        }
    }
}

export  class RollingTimeOptions{
    static Minutely = 60; // Every 60 seconds
    static Hourly = 60 * this.Minutely;
    static Daily = 24 * this.Hourly;
    static Weekly = 7 * this.Daily;
    static Monthly = 30 * this.Daily;
    static Yearly = 12 * this.Monthly;

    static assert(time_option){
        if (![this.Minutely, this.Daily, this.Hourly, this.Monthly, this.Yearly].includes(time_option)){
            throw new Error(`time_option must be an instance of RollingConfig. Unsupported params ${JSON.stringify(time_option)}`)
        }
    }

}