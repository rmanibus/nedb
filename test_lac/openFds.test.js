import fs from "fs";
import async from "async";
import Nedb from "../lib/datastore.js";

const db = new Nedb({ filename: "./workspace/openfds.db", autoload: true });
const N = 64;
let i;
let fds;

function multipleOpen(filename, N, callback) {
  async.whilst(
    () => i < N,
    (cb) => {
      fs.open(filename, "r", (err, fd) => {
        i += 1;
        if (fd) {
          fds.push(fd);
        }
        return cb(err);
      });
    },
    callback
  );
}

async.waterfall([
  // Check that ulimit has been set to the correct value
  (cb) => {
    i = 0;
    fds = [];
    multipleOpen("./test_lac/openFdsTestFile", 2 * N + 1, (err) => {
      if (!err) {
        console.log("No error occured while opening a file too many times");
      }
      fds.forEach((fd) => {
        fs.closeSync(fd);
      });
      return cb();
    });
  },
  (cb) => {
    i = 0;
    fds = [];
    multipleOpen("./test_lac/openFdsTestFile2", N, (err) => {
      if (err) {
        console.log(
          `An unexpected error occured when opening file not too many times: ${err}`
        );
      }
      fds.forEach((fd) => {
        fs.closeSync(fd);
      });
      return cb();
    });
  },
  // Then actually test NeDB persistence
  () => {
    db.remove({}, { multi: true }, (err) => {
      if (err) {
        console.log(err);
      }
      db.insert({ hello: "world" }, (err) => {
        if (err) {
          console.log(err);
        }

        i = 0;
        async.whilst(
          () => i < 2 * N + 1,
          (cb) => {
            db.persistence.persistCachedDatabase((err) => {
              if (err) {
                return cb(err);
              }
              i += 1;
              return cb();
            });
          },
          (err) => {
            if (err) {
              console.log(
                `Got unexpected error during one peresistence operation: ${err}`
              );
            }
          }
        );
      });
    });
  },
]);
