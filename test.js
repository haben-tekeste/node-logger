import {Logger, LogConfig} from "./index.js"

const logger = Logger.with_config(LogConfig.from_file("./config.json"))
console.log(logger.file_prefix)
console.log(logger.time_threshold)
console.log(logger.size_threshold)
console.log(logger.level)