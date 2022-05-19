'use strict'

const fs = require('fs')
const path = require('path')

const file = path.resolve('./static/webpack-assets.json')
const webpackFingerprints = JSON.parse(fs.readFileSync(file, 'utf8'))
const serverFile = webpackFingerprints.server.js

require('./' + serverFile)
