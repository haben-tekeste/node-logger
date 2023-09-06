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


class Logger {
    // set default value of level to be LogLevel.Debug for 
    // every new instance
     #level = LogLevel.Debug;
    
    
    constructor(log_level){
        // set log level only when provided
        // else will be set by default to LogLevel.Debug
        if (arguments.length){
            // throw error if log_level is Unsupported
            LogLevel.assert(log_level)
            this.#level = log_level;
        }

    }
    
    get level(){
        return this.#level
    }
    }
    
const logger = new Logger(LogLevel.Info)
console.log(logger.level)

export {LogLevel, Logger}

