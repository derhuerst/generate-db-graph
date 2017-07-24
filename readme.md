# generate-db-graph

**Generate a [JSON graph](http://jsongraphformat.info) of Deutsch Bahn public transport.**

[![npm version](https://img.shields.io/npm/v/generate-db-graph.svg)](https://www.npmjs.com/package/generate-db-graph)
![ISC-licensed](https://img.shields.io/github/license/derhuerst/generate-db-graph.svg)
[![chat on gitter](https://badges.gitter.im/derhuerst.svg)](https://gitter.im/derhuerst)


## Installing

```shell
npm install -g generate-db-graph
# or with ad-hoc install
npx generate-db-graph <station-id>
```


## Usage

```
Usage:
    generate-db-graph <station-id>
Examples:
    generate-db-graph 8011102 # start at Berlin Gesundbrunnen
```

This tool generates data in the [JSON Graph Format](https://github.com/jsongraph/json-graph-specification/blob/master/README.rst#json-graph-specification). Note that instead of storing all nodes and edges in one JSON file, **it will create `nodes.ndjson` and `edges.ndjson`. These are [ndjson](http://ndjson.org)-encoded lists of all nodes and edges**, respectively.


## Contributing

If you **have a question**, **found a bug** or want to **propose a feature**, have a look at [the issues page](https://github.com/derhuerst/generate-db-graph/issues).
