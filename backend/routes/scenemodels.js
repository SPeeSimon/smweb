const express = require("express");
const Query = require("../pg");
const util = require("util");

var router = express.Router();

function toNumber(x) {
  var n = Number(x || 0);
  return isNaN(n) ? 0 : n;
}

var selectSignsWithinSql =
  "SELECT si_id, ST_Y(wkb_geometry) AS ob_lat, ST_X(wkb_geometry) AS ob_lon, \
           si_heading, si_gndelev, si_definition \
           FROM fgs_signs \
           WHERE ST_Within(wkb_geometry, ST_GeomFromText($1,4326)) \
           LIMIT 400";

var selectNavaidsWithinSql =
  "SELECT na_id, ST_Y(na_position) AS na_lat, ST_X(na_position) AS na_lon, \
           na_type, na_elevation, na_frequency, na_range, na_multiuse, na_ident, na_name, na_airport_id, na_runway \
           FROM fgs_navaids \
           WHERE ST_Within(na_position, ST_GeomFromText($1,4326)) \
           LIMIT 400";

router.get("/signs/", function (request, response, next) {
  var east = toNumber(request.query.e);
  var west = toNumber(request.query.w);
  var north = toNumber(request.query.n);
  var south = toNumber(request.query.s);

  Query({
    name: "Select Signs Within",
    text: selectSignsWithinSql,
    values: [
      util.format("POLYGON((%d %d,%d %d,%d %d,%d %d,%d %d))", west, south, west, north, east, north, east, south, west, south),
    ],
  })
    .then((result) => {
      response.json({
        type: "FeatureCollection",
        features: result.rows.map(rowToSignsFeature),
      });
    })
    .catch((err) => {
      return response.status(500).send("Database Error");
    });
});

function rowToSignsFeature(row) {
  return {
    type: "Feature",
    id: row["si_id"],
    geometry: {
      type: "Point",
      coordinates: [row["ob_lon"], row["ob_lat"]],
    },
    properties: {
      id: row["si_id"],
      heading: row["si_heading"],
      definition: row["si_definition"],
      gndelev: row["si_gndelev"],
    },
  };
}

function rowToNavaidFeature(row) {
  return {
    type: "Feature",
    id: row["si_id"],
    geometry: {
      type: "Point",
      coordinates: [row["na_lon"], row["na_lat"]],
    },
    properties: {
      id: row["na_id"],
      type: row["na_type"],
      elevation: row["na_elevation"],
      frequency: row["na_frequency"],
      range: row["na_range"],
      multiuse: row["na_multiuse"],
      ident: row["na_ident"],
      name: row["na_name"],
      airport: row["na_airport_id"],
      runway: row["na_runway"],
    },
  };
}

router.get("/navaids/within/", function (request, response, next) {
  var east = toNumber(request.query.e);
  var west = toNumber(request.query.w);
  var north = toNumber(request.query.n);
  var south = toNumber(request.query.s);

  Query({
    name: "Select Navaids Within",
    text: selectNavaidsWithinSql,
    values: [
      util.format("POLYGON((%d %d,%d %d,%d %d,%d %d,%d %d))", west, south, west, north, east, north, east, south, west, south),
    ],
  })
    .then((result) => {
      response.json({
        type: "FeatureCollection",
        features: result.rows.map(rowToNavaidFeature),
      });
    })
    .catch((err) => {
      return response.status(500).send("Database Error");
    });
});


router.get("/navdb/airport/:icao", function (request, response, next) {
  if (!request.params.icao.match(/^[A-Za-z0-9]*$/)) {
    return response.json({});
  }
  Query({
    name: "ModelsSearchByAuthor",
    //      text: "SELECT pr_id, pr_runways, pr_name, pr_type FROM fgs_procedures WHERE pr_airport = UPPER($1);",
    text: "select ST_AsGeoJSON(wkb_geometry) as rwy from apt_runway where icao=UPPER($1);",
    values: [request.params.icao],
  })
    .then((result) => {
      var j = {
        runwaysGeometry: {
          type: "GeometryCollection",
          geometries: result.rows.map((row) => JSON.parse(row.rwy)),
        },
        procedures: [],
      };
      response.json(j);
    })
    .catch((error) => {
      return response.status(500).send("Database Error");
    });
});

module.exports = router;
