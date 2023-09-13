import fs_sync from 'fs/promises'
import path from 'path'

/**
 * @returns {fs.sync.Pathlike} the path to the directory
 */

export function check_and_create_dir(path_to_dir){
    const log_dir = path.resolve(require.main.path, path_to_dir)
    if (!fs_sync.existingSync(log_dir)){
        fs_sync.mkdirSync(log_dir, {recursive:true})
    }
    return log_dir
}