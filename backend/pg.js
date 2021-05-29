"use strict";

var pg = require("pg");

console.log("connecting to", `${process.env.PGUSER}@${process.env.PGHOST}:${process.env.PGPORT}/${process.env.PGDATABASE}`);
var pool = new pg.Pool({
  // use .env for connection details with values for: PGHOST, PGPORT, PGDATABASE, PGUSER, PGPASSWORD
  max: 10, // max number of clients in the pool
  connectionTimeoutMillis: 5000,
  idleTimeoutMillis: 3000, // how long a client is allowed to remain idle before being closed
});


pool.on("error", function (err, client) {
  // if an error is encountered by a client while it sits idle in the pool
  // the pool itself will emit an error event with both the error and
  // the client which emitted the original error
  // this is a rare occurrence but can happen if there is a network partition
  // between your application and the database, the database restarts, etc.
  // and so you might want to handle it and at least log it out
  console.error("WARNING: idle client received error", err.messag);
});


function Query(options, cb) {
  pool.connect((err, client, done) => {
    if (err) {
      console.error("error fetching client from pool", err);
      return cb(err);
    }

    client.query(options, function (err, result) {
      //call `done()` to release the client back to the pool
      done();

      if (err) {
        console.error("error running query", err);
        return cb(err);
      }

      return cb(null, result);
    });
  });
}

module.exports = Query;
