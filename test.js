import {Logger, LogConfig} from "./index.js"

const logger = Logger.with_config(LogConfig.from_file("./config.json"))
await logger.init()