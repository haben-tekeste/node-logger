export default class LogLevel  {
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

    static to_string(log_level){
        const levelMap = {
            [this.Debug] : "DEBUG",
            [this.Info] : "INFO",
            [this.Critical] : "CRITICAL",
            [this.Warn] : "WARN",
            [this.Error] :"ERROR"
        }
        if (levelMap.hasOwnProperty(log_level)){
            return levelMap[log_level]
        }
        throw new Error(`Unsupported log level ${log_level}`)
    }

}