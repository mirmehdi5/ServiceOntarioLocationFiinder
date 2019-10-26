const elasticsearch = require("elasticsearch");
const fs = require("fs");

const client = new elasticsearch.Client({
  // hosts: ["http://localhost:9200"]
  hosts: [
    "https://site:c91c9ef2be3304a7c7a9bcbf14e97a12@thorin-us-east-1.searchly.com"
  ]
});

client.indices.create(
  {
    index: "location295",
    body: {
      mappings: {
        characters_list: {
          properties: {
            city: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            displayNumber: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            id: {
              type: "long"
            },
            intersection: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            location: {
              type: "geo_point"
            },
            locationGuid: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            locationTypeId: {
              type: "long"
            },
            name: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            override: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              }
            },
            schedules: {
              properties: {
                id: {
                  type: "long"
                },
                name: {
                  type: "text",
                  fields: {
                    keyword: {
                      type: "keyword",
                      ignore_above: 256
                    }
                  }
                },
                openings: {
                  properties: {
                    dayOfMonth: {
                      type: "long"
                    },
                    dayOfWeek: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256
                        }
                      }
                    },
                    duration: {
                      type: "long"
                    },
                    eventType: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256
                        }
                      }
                    },
                    hour: {
                      type: "long"
                    },
                    id: {
                      type: "long"
                    },
                    leadTimeDays: {
                      type: "long"
                    },
                    minute: {
                      type: "long"
                    },
                    month: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256
                        }
                      }
                    },
                    notificationMsgEn: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256
                        }
                      }
                    },
                    notificationMsgFr: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256
                        }
                      }
                    },
                    recurrence: {
                      type: "text",
                      fields: {
                        keyword: {
                          type: "keyword",
                          ignore_above: 256
                        }
                      }
                    },
                    repeats: {
                      type: "boolean"
                    },
                    scheduleId: {
                      type: "long"
                    },
                    weekdayOccurrence: {
                      type: "long"
                    }
                  }
                }
              }
            },
            services: {
              type: "text",
              fields: {
                keyword: {
                  type: "keyword",
                  ignore_above: 256
                }
              },
              analyzer: "keyword"
            },
            waitTime: {
              type: "long"
            }
          }
        }
      }
    }
  },
  function(error, response, status) {
    if (error) {
      console.log(error);
    } else {
      console.log("created a new index", response);
    }
  }
);

const bulkIndex = function bulkIndex(index, type, data) {
  let bulkBody = [];

  data.forEach(item => {
    bulkBody.push({
      index: {
        _index: index,
        _type: type
      }
    });
    bulkBody.push(item);
  });

  client
    .bulk({ body: bulkBody })
    .then(response => {
      let errorCount = 0;
      response.items.forEach(item => {
        if (item.index && item.index.error) {
          console.log(++errorCount, item.index.error);
        }
      });
      console.log(
        `Successfully indexed ${data.length - errorCount}
         out of ${data.length} items`
      );
    })
    .catch(console.err);
};

async function indexData() {
  const articlesRaw = await fs.readFileSync("./temploc1.json");
  const articles = JSON.parse(articlesRaw);
  console.log(`${articles.length} items parsed from data file`);
  bulkIndex("location295", "characters_list", articles);
}

// async function indexCityData() {
//   const articlesRaw = await fs.readFileSync("./cities.json");
//   const articles = JSON.parse(articlesRaw);
//   console.log(`${articles.length} items parsed from data file`);
//   bulkIndex("cities2", "characters_list", articles);
// }

indexData();
