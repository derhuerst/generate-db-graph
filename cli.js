#!/usr/bin/env node
'use strict'

const minimist = require('minimist')
const {stringify} = require('ndjson')
const fs = require('fs')
const path = require('path')
const {isatty} = require('tty')
const differ = require('ansi-diff-stream')

const pkg = require('./package.json')
const walk = require('.')

const argv = minimist(process.argv.slice(2))

if (argv.help || argv.h) {
	process.stdout.write(`
Usage:
    generate-db-graph <station-id>
Examples:
    generate-db-graph 8011102 # start at Berlin Gesundbrunnen
\n`)
	process.exit(0)
}

if (argv.version || argv.v) {
	process.stdout.write(`generate-db-graph v${pkg.version}\n`)
	process.exit(0)
}

const showError = (err) => {
	console.error(err)
	process.exit(1)
}

const isNumber = /^\d{6,}$/
const startId = argv._[0] + ''
if (!isNumber.test(startId)) showError('station-id must be a valid IBNR.')

const nodes = stringify()
nodes
.on('error', showError)
.pipe(fs.createWriteStream('nodes.ndjson'))
.on('error', showError)

const edges = stringify()
edges
.on('error', showError)
.pipe(fs.createWriteStream('edges.ndjson'))
.on('error', showError)

const clearReports = isatty(process.stderr.fd)
let reporter = process.stderr
if (clearReports) {
	reporter = differ()
	reporter.pipe(process.stderr)
}

const report = ({stations, edges, queued}) => {
	reporter.write([
		stations + (stations === 1 ? ' node' : ' nodes'),
		edges + (edges === 1 ? ' edge' : ' edges'),
		queued + ' queued'
	].join(', ') + (clearReports ? '' : '\n'))
}

walk(startId, nodes, edges, report, (err) => {
	nodes.end()
	edges.end()
	if (err) showError(err)
})
