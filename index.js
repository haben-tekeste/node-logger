class LogLevel {
    static Debug = 0;
    static Info = 1;
    static Warn = 2;
    static Error = 3;
    static Critical = 4;

    // verifies the log level is valid and supported
    static assert(log_level){
        if (log_level !== LogLevel.Debug || 
            log_level !== LogLevel.Info ||
            log_level !== LogLevel.Warn ||
            log_level !== LogLevel.Error ||
            log_level !== LogLevel.Critical  
            )
            {
                throw new Error (`Unsupported param ${JSON.stringify(log_level)}. Log level must be an instance of LogLevel.`)
            }
    }

}


export default LogLevel


