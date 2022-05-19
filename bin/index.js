#!/usr/bin/env node

'use strict'

const NODE_ENV = process.env.NODE_ENV

if (NODE_ENV === 'development') {
  require('../src')
} else {
  require('../lib/cli')
}
