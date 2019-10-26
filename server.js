const express = require("express");
const app = express();
const elasticsearch = require("elasticsearch");
const cors = require("cors");
const bodyParser = require("body-parser");

app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());

const client = new elasticsearch.Client({
  host:
    "https://site:c91c9ef2be3304a7c7a9bcbf14e97a12@thorin-us-east-1.searchly.com",
  //"http://localhost:9200",
  log: "error"
});

client.ping({ requestTimeout: 30000 }, function(error) {
  if (error) {
    console.error("elasticsearch cluster is down!");
  } else {
    console.log("Everything is ok");
  }
});

app.get("/search", function(req, res) {
  let body = {};
  let serviceArray = JSON.parse(req.query["service"]);
  let queryString = "";
  for (let i = 0; i < serviceArray.length; i++) {
    queryString += "(" + serviceArray[i] + ")";
    if (i !== serviceArray.length - 1) {
      queryString += " AND ";
    }
  }
  if (req.query["service"] === "[]") {
    body = {
      size: 4,
      from: parseInt(req.query["pageNumber"]),
      query: {
        bool: {
          must: {
            match_all: {}
          }
        }
      },
      sort: [
        {
          _geo_distance: {
            location: { lat: req.query["lat"], lon: req.query["lon"] },
            order: "asc",
            unit: "km"
          }
        }
      ]
    };
  } else {
    body = {
      size: 4,
      from: parseInt(req.query["pageNumber"]),

      query: {
        query_string: {
          query: queryString,
          default_field: "services",
          auto_generate_synonyms_phrase_query: false,
          fuzzy_transpositions: false,
          allow_leading_wildcard: false,
          fuzzy_max_expansions: 0,
          boost: 0,
          enable_position_increments: false,
          fuzziness: 0,
          quote_field_suffix: ".exact",
          phrase_slop: 0,
          default_operator: "AND",
          max_determinized_states: 0,
          minimum_should_match: 0
        }
      },
      sort: [
        {
          _geo_distance: {
            location: { lat: req.query["lat"], lon: req.query["lon"] },
            order: "asc",
            unit: "km"
          }
        }
      ]
    };
  }

  client
    .search({ index: "location295", body: body, type: "characters_list" })
    .then(results => {
      res.send({
        data: { result: results.hits.hits, total: results.hits.total }
      });
    })
    .catch(err => {
      console.log("here is the error", err);
      res.send([]);
    });
});

app.listen(app.get("port"), function() {
  console.log("Your node.js server is running on PORT: ", app.get("port"));
});
