/* eslint-env mocha */

// const chai = require('chai')
// const expect = chai.expect
const getMarkdown = require('../lib')
const simpleExample = require('./fixtures/simple-example')

describe('Fire-up the JSON-Schema-Markdown-a-tron', function () {
  this.timeout(process.env.TIMEOUT || 5000)

  it('should convert simple example', () => {
    const result = getMarkdown(
      simpleExample,
      {
        baseHeaderIndentDepth: 2
      }

    )
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    console.log(result.markdown)
    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
  })
})
