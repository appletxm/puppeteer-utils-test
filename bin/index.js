#!/usr/bin/env node

const doAnalyse = require('../scripts/util-analyse-bin-params')
const generateCfg = require('../scripts/bin-generate-cfg')
const { commitMessage } = require('../scripts/index')

function trigger() {
  const analyseResult = doAnalyse()
  // console.info('analyseResult:', analyseResult)

  const { rawCfg, action } = analyseResult
  const cfgOut = generateCfg(rawCfg)

  // console.info('check cfgOut:', cfgOut)

  if (action === 'commitMessage') {
    commitMessage(cfgOut)
  }
}

trigger()
