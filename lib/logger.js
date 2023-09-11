import {LogConfig} from "./config/log-config"

export class Logger {
    // set default value of level to be LogLevel.Infor for 
    // every new instance
     #config
    
    constructor(log_config){
        // create config with the argument 
        // if config not provided use default
        log_config = log_config || LogConfig.with_defaults()
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