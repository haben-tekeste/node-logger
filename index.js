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

    with_rollling_config(rolling_config){
        this.#rolling_config = RollingConfig.from_json(rolling_config)
    }

    with_file_prefix(file_prefix){
        if (typeof file_prefix != string){
            throw new Error(`file_prefix must be a string. Unsupported param ${JSON.stringify(file_prefix)}`)
        }
        this.#file_prefix = file_prefix;
        return this;
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
        return this.#level
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
    
const logger = new Logger(LogLevel.Info)
console.log(logger.level)

export {LogLevel, Logger}

