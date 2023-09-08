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
    with_log_level(log_level){
        LogLevel.assert(log_level);
        this.#level = log_level;
        return this;
    }

    with_rollling_config(rolling_config){
        this.#rolling_config = RollingConfig.from_json(rolling_config)
    }

    with_file_prefix(file_prefix){
        if (type of file_prefix != string){
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
    
const logger = new Logger(LogLevel.Info)
console.log(logger.level)

export {LogLevel, Logger}

