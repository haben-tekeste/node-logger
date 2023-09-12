import fs from 'fs'
import LogLevel from "../utils/log-level.js"
import RollingConfig from './rolling-config.js';

export default class LogConfig{

    // log level
    #level = LogLevel.Info;

    // 
    #rolling_config;

    //prefix that will added to new files
    #file_prefix = "Logtar_"

    constructor(){
        this.#rolling_config = RollingConfig.with_defaults();
    }

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
                    log_config = log_config.with_rolling_config(json[key])
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