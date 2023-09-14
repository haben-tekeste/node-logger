import fs from 'fs'
import path from 'path'

/**
 * @returns {fs.sync.Pathlike} the path to the directory
 */

export function check_and_create_dir(path_to_dir){
    const log_dir = path.resolve(process.cwd(), path_to_dir)
    if (!fs.existsSync(log_dir)){
        fs.mkdirSync(log_dir, {recursive:true})
    }
    return log_dir
}

export function get_caller_info(){
    const error = {}
    Error.captureStackTrace(error)

    const caller_frame = error.stack.split("\n")[5]
    const meta_data = caller_frame.split("at ").pop()
    return meta_data
}