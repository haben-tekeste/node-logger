import { RollingSizeOptions, RollingTimeOptions } from "../utils/rolling-options";

export class RollingConfig{
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