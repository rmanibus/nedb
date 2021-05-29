/* eslint-disable one-var */
/**
 * Way data is stored for this database
 * For a Node.js/Node Webkit database it's the file system
 * For a browser-side database it's localforage which chooses the best option depending on user browser (IndexedDB then WebSQL then localStorage)
 *
 * This version is the Node.js/Node Webkit version
 * It's essentially fs, mkdirp and crash safe write and read functions
 */

import fs from "fs";
import mkdirp from "mkdirp";
import async from "async";
import path from "path";

const storage = {};

storage.exists = fs.exists;
storage.rename = fs.rename;
storage.writeFile = fs.writeFile;
storage.unlink = fs.unlink;
storage.appendFile = fs.appendFile;
storage.readFile = fs.readFile;
storage.mkdirp = mkdirp;

/**
 * Explicit name ...
 */
storage.ensureFileDoesntExist = (file, callback) => {
  storage.exists(file, (exists) => {
    if (!exists) {
      return callback(null);
    }
    return storage.unlink(file, (err) => callback(err));
  });
};

/**
 * Flush data in OS buffer to storage if corresponding option is set
 * @param {String} options.filename
 * @param {Boolean} options.isDir Optional, defaults to false
 * If options is a string, it is assumed that the flush of the file (not dir) called options was requested
 */
storage.flushToStorage = (options, callback) => {
  let filename;
  let flags;
  if (typeof options === "string") {
    filename = options;
    flags = "r+";
  } else {
    filename = options.filename;
    flags = options.isDir ? "r" : "r+";
  }

  // Windows can't fsync (FlushFileBuffers) directories. We can live with this as it cannot cause 100% dataloss
  // except in the very rare event of the first time database is loaded and a crash happens
  if (
    flags === "r" &&
    (process.platform === "win32" || process.platform === "win64")
  ) {
    return callback(null);
  }

  return fs.open(filename, flags, (err, fd) => {
    if (err) {
      return callback(err);
    }
    return fs.fsync(fd, (errFS) => {
      fs.close(fd, (errC) => {
        if (errFS || errC) {
          const e = new Error("Failed to flush to storage");
          e.errorOnFsync = errFS;
          e.errorOnClose = errC;
          return callback(e);
        }
        return callback(null);
      });
    });
  });
};

/**
 * Fully write or rewrite the datafile, immune to crashes during the write operation (data will not be lost)
 * @param {String} filename
 * @param {String} data
 * @param {Function} cb Optional callback, signature: err
 */
storage.crashSafeWriteFile = (filename, data, cb) => {
  const callback = cb || (() => {});
  const tempFilename = `${filename}~`;

  async.waterfall(
    [
      async.apply(storage.flushToStorage, {
        filename: path.dirname(filename),
        isDir: true,
      }),
      (cb) => {
        storage.exists(filename, (exists) => {
          if (exists) {
            return storage.flushToStorage(filename, (err) => cb(err));
          }
          return cb();
        });
      },
      (cb) => {
        storage.writeFile(tempFilename, data, (err) => cb(err));
      },
      async.apply(storage.flushToStorage, tempFilename),
      (cb) => {
        storage.rename(tempFilename, filename, (err) => cb(err));
      },
      async.apply(storage.flushToStorage, {
        filename: path.dirname(filename),
        isDir: true,
      }),
    ],
    (err) => callback(err)
  );
};

/**
 * Ensure the datafile contains all the data, even if there was a crash during a full file write
 * @param {String} filename
 * @param {Function} callback signature: err
 */
storage.ensureDatafileIntegrity = (filename, callback) => {
  const tempFilename = `${filename}~`;

  storage.exists(filename, (filenameExists) => {
    // Write was successful
    if (filenameExists) {
      return callback(null);
    }

    return storage.exists(tempFilename, (oldFilenameExists) => {
      // New database
      if (!oldFilenameExists) {
        return storage.writeFile(filename, "", "utf8", (err) => {
          callback(err);
        });
      }
      // Write failed, use old version
      return storage.rename(tempFilename, filename, (err) => callback(err));
    });
  });
};

export default storage;
