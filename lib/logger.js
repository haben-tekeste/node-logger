import fs from 'fs/promises'
import path from 'path'
import LogConfig from "./config/log-config.js"
import { check_and_create_dir, get_caller_info } from './utils/helpers.js'
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
        this.#log_file_handle = await fs.open(path.join(log_dir_path,file_name),"a+")
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

    async #log(msg, log_level){
        // dont' write to the file if
// 1. The `log_level` argument is less than the `#config.level` value
// 2. If the `fd` (file descriptor) is either 0 or -1, which means the file
// descriptor is closed or not opened yet.
        if (log_level < this.#config.level || !this.#log_file_handle.fd) {
            return;
            }

        // Make sure we're doing the writing before checking for rolling creation
            await this.#write_to_handle(msg, log_level)
            // check rolling
            await this.#rolling_check()

            
            
    }

    async #write_to_handle(msg, log_level){
        const date_iso = new Date().toISOString();
            const log_level_string = LogLevel.to_string(log_level)

            //additional info to the log message
            const log_msg = `[${date_iso}] [${log_level_string}]: ${get_caller_info()}
             ${msg}\n`;
            
            await this.#log_file_handle.write(log_msg)
    }

/**
 * checkes if current log file needs to be rolled over
 */
    async #rolling_check(){
      const {time_threshold, size_threshold} =  this.#config.rolling_config

      // get log file state 
      const {size, birthtimeMs} = this.#log_file_handle.stat()

      const current_time = new Date().getTime()

      // check if file needs rolling
        if (size >= size_threshold || (current_time - birthtimeMs) >= (time_threshold * 1000)){
            await this.#log_file_handle.close()
            await this.#log_file_handle.init()
        }
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