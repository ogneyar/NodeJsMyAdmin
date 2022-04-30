#!/usr/bin/env node
const { exec } = require('child_process')
const { PORT } = require('../utils/consts')

require('..')

exec(`start http://localhost:${PORT}`, () => {})

console.log("njma run\r\n")