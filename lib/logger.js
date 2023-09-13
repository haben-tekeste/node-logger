import fs from 'fs/promises'
import path from 'path'
import LogConfig from "./config/log-config.js"
import { check_and_create_dir } from './utils/helpers.js'
import LogLevel from "./utils/log-level.js"


export default class Logger {
    // set default value of level to be LogLevel.Info for 
    // every new instance
     #config

     //
     #log_file_handle;
    
    constructor(log_config){
        // create config with the argument 
        // if config not provided use default
        
        log_config = log_config || LogConfig.with_defaults()
        LogConfig.assert(log_config)
        this.#config = log_config
    }

    async init(){
        const log_dir_path = check_and_create_dir("logs")
        const file_name = this.#config.file_prefix + new Date().toISOString().replace(/[\.:]+/,"-") + ".log";
        this.#log_file_handle = await fs.open(path.join('logs',file_name,"a+"))
    }
    
    get level(){
        return this.#config.level
    }

    static with_config(log_config){
        return new Logger(log_config)

    }

    get file_prefix(){
        return this.#config.file_prefix
    }

    get time_threshold(){
        return this.#config.rolling_config.time_threshold
    }

    get size_threshold(){
        return this.#config.rolling_config.size_threshold
    }

    #log(msg, log_level){
        if (log_level < this.#config.level) {
            return;
            }
       
        console.log("%s: %s:", msg, LogLevel.to_string(log_level))
    }

    debug(msg){
       this.#log(msg, LogLevel.Debug)
    }
    info(msg){
        this.#log(msg, LogLevel.Info)
    }
    warn(msg){
        this.#log(msg, LogLevel.Warn)
    }
    error(msg){
        this.#log(msg, LogLevel.Error)
    }
    critical(msg){
        this.#log(msg, LogLevel.Critical)
    }

    }