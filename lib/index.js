const _ = require('lodash')

module.exports = function jsonSchemaMarkdownATron (schema, suppliedOptions) {
  console.log(JSON.stringify(schema, null, 2))
  let options = _.defaults(
    suppliedOptions || {},
    {
      baseHeaderIndentDepth: 1
    }
  )

  function indent (depthOffset) {
    let hashes = ''
    for (let i = 0; i < options.baseHeaderIndentDepth + depthOffset; i++) {
      hashes += '#'
    }
    return hashes
  }

  function getTopLevelPropertyMarkdown (propertyList) {
    let md = ''
    propertyList.forEach(
      (property) => {
        md += `* \`${property.key}\`\n`
      }
    )
    md += '\n'
    return md
  }

  console.log('************** OPTIONS **********************')
  console.log(options)
  const result = {
    title: schema.title,
    description: schema.description,
    example: schema.example
  }
  let md = ''

  // Generate top-level things
  const topLevelRequired = []
  const topLevelOptional = []
  // Split into required/optional
  const required = schema.required || '[]'
  for (const [key, originalProperty] of Object.entries(schema.properties)) {
    const property = _.cloneDeep(originalProperty)
    property.key = key
    if (required.indexOf(key) === -1) {
      topLevelOptional.push(property)
    } else {
      topLevelRequired.push(property)
    }
  }
  // Add required section
  if (topLevelRequired.length > 0) {
    md += `${indent(0)} Required\n\n`
    md += getTopLevelPropertyMarkdown(topLevelRequired)
  }
  // Add optional section
  if (topLevelOptional.length > 0) {
    md += `${indent(0)} Optional\n\n`
    md += getTopLevelPropertyMarkdown(topLevelOptional)
  }

  result.markdown = md
  return result
}
