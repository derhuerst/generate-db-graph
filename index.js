'use strict'

const walk = require('discover-db-stations')

// todo: filterStations, filterLines, projection

const createWalker = (startId, nodes, edges, report, cb) => {
	const s = walk(startId)

	const onNode = (node) => {
		nodes.write({
			id: node.id,
			label: node.name,
			metadata: node.coordinates
		})
	}

	const onEdge = (edge) => {
		edges.write({
			source: edge.from.id,
			target: edge.to.id,
			relation: edge.line.product || edge.line.mode,
			metadata: {
				line: edge.line.name,
				time: edge.duration
			}
		})
	}

	const onError = (err) => {
		if (err.isHafasError) return
		cb(err)
		s.removeListener('error', onError)
	}
	s.on('error', onError)

	s.once('end', cb)
	s.on('stats', report)
	s.on('data', onNode)
	s.on('edge', onEdge)
}

module.exports = createWalker
