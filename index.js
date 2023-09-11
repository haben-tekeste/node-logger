import fs from 'fs'

class LogLevel  {
    static Debug = 0;
    static Info = 1;
    static Warn = 2;
    static Error = 3;
    static Critical = 4;

    // verifies the log level is valid and supported
    static assert(log_level){
        if (![
            LogLevel.Debug, LogLevel.Info, LogLevel.Critical, LogLevel.Error, LogLevel.Warn
        ].includes(log_level)
            )
            {
                throw new Error (`Unsupported param ${JSON.stringify(log_level)}. Log level must be an instance of LogLevel.`)
            }
    }

}

class LogConfig{

    // log level
    #level = LogLevel.Info;

    // 
    #rolling_config;

    //prefix that will added to new files
    #file_prefix = "Logtar_"

    static assert(log_config){
        // if there's an argument, check whether the `log_config` is an instance
        // of the `LogConfig` class? If there's no argument, no checks required
        //as we'll be using defaults.
        if (arguments.length > 0 && !(log_config instanceof LogConfig)){
            throw new Error(`log_config must be instance of LogConfig. Unsupported para ${JSON.stringify(log_config)}`)
        }

    }

    // build with default values
    static with_defaults(){
        return new LogConfig()
    }
    
    // Validate the `log_level` argument, set it to the private `#level` variable
    // and return this instance of the class back. So that other methods can mutate
    // the same object, instead of creating a new one.

    /**
     * @param {LogLevel} log_level to be set
     * @returns {LogConfig} current instance
     */
    with_log_level(log_level){
        LogLevel.assert(log_level);
        this.#level = log_level;
        return this;
    }

    with_rolling_config(rolling_config){
        this.#rolling_config = RollingConfig.from_json(rolling_config)
        return this;
    }

    with_file_prefix(file_prefix){
        if (typeof file_prefix != "string"){
            throw new Error(`file_prefix must be a string. Unsupported param ${JSON.stringify(file_prefix)}`)
        }
        this.#file_prefix = file_prefix;
        return this;
    }

    // build object from json
    // i.e json = {level: LogLevel.Debug}
    static from_json(json){
        let log_config = new LogConfig();

        // 
        Object.keys(json).forEach((key) => {
            switch (key) {
                case "level":
                    log_config = log_config.with_log_level(json[key])
                    break;
                 case "rolling_config":
                    log_config = log_config.with_rolling_config[json[key]]
                    break;
                  case "file_prefix":
                    log_config = log_config.with_file_prefix(json[key])
                    break;
            }
        })
        return log_config
    }

    /** 
    * @param {string} file_path The path to the config file.
    * @returns {LogConfig} A new instance of LogConfig with values from the config file.
    * @throws {Error} If the file_path is not a string.
    */

    static from_file(file_path){
        // `fs.readFileSync` throws an error if the path is invalid.
        // It takes care of the OS specific path handling for us. No need to
        // validate paths by ourselves.
        const file_contents = fs.readFileSync(file_path)

        // call from_json method to handle It
        return LogConfig.from_json(JSON.parse(file_contents))
    }


    get level(){
        return this.#level;
    }

    get rolling_config(){
        return this.#rolling_config
    }

    get file_prefix(){
        return this.#file_prefix
    }
}

class Logger {
    // set default value of level to be LogLevel.Infor for 
    // every new instance
     #config
    
    constructor(log_config){
        // create config with the argument 
        // if config not provided use default
        log_config = log_config || LogConfig.wih_defaults()
        LogConfig.assert(log_config)
        this.#config = log_config
    }
    
    get level(){
        return this.#config.level
    }

    static with_config(log_config){
        return new Logger(log_config)

    }

    }

class RollingSizeOptions{
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
        if (typeof size_threshold !== number || size_threshold < RollingSizeOptions.OneKB ){
            throw new Error(`size_threshold must be at least 1KB. Unsupported param ${JSON.stringify(size_threshold)}`)
        }
    }
}

class RollingTimeOptions{
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

class RollingConfig{
    #time_threshold = RollingTimeOptions.Hourly;
    #size_threshold = RollingSizeOptions.FiveMB;

    static assert(rolling_config){
        if (!(rolling_config instanceof RollingConfig)){
            throw new Error(`rolling_config must be an instance of RollingConfig. Unsupported param ${rolling_config}`)
        }
    }

    // helper method for creating instance
    // i.e use the method instead of new RollingConfig()
    // RollingConfig.with_Defaults() to create one with default values
    static with_defaults(){
        return new RollingConfig()
    }

    // builder method to set size threshold
    with_size_threshold(size_threshold){
        RollingSizeOptions.assert(size_options)
        this.#size_threshold =  size_threshold;
        return this;
    }

    // builder method to set time threshold
    with_time_threshold(time_threshold){
        RollingTimeOptions.assert(time_option)
        this.#time_threshold = time_threshold
        return this
    }

    // build from json object
    static from_json(json){
        let rolling_config = new RollingConfig()

        Object.key(json).forEach(key => {
            switch (key) {
                case "size_threshold":
                    rolling_config = rolling_config.with_size_threshold(json[key])
                    break;
                case "time_threshold":
                    rolling_config = rolling_config.with_time_threshold(json[key])
                    break;
            }
        });
        return rolling_config;
    }
}

const config = LogConfig.from_file("./config.demo.json")
const logger = Logger.with_config(config)
console.log(logger.level)

export {LogLevel, Logger}

