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
    let counter = 0
    propertyList.forEach(
      (property) => {
        // TODO: Handle simple arrays like [string]
        // TODO: Perhaps move to sub-bullet if title is "large"? Threshold option?
        // TODO: Handle list of objects, and make "type" a link to it. So generate anchors too.
        if (counter > 0) {
          md += '\n----\n\n'
        }

        md += `${indent(1)} \`${property.key}\`\n\n`

        counter++

        let desc = ''
        if (property.title) {
          desc += property.title.trim()
          if (desc[desc.length] !== '.') {
            desc += '. '
          }
        }
        if (property.description) {
          desc += property.description.trim()
          if (desc[desc.length - 1] !== '.') {
            desc += '.'
          }
        }
        desc = desc.trim()

        if (desc !== '') {
          md += `${desc}\n\n`
        }

        md += `* **Type:** \`${property.type}\`\n`

        if (property.format) {
          md += `* **Format:** [\`${property.format}\`](https://json-schema.org/understanding-json-schema/reference/string.html#format)\n`
        }

        // if (property.example) {
        //   md += `* **Example:** \`${property.examples}\`\n`
        // }

        if (property.default) {
          md += `* **Default:** \`${JSON.stringify(property.default)}\`\n`
        }

        if (property.enum) {
          md += `* **Values:**\n`
          property.enum.forEach(
            v => {
              md += `  * \`${v}\`\n`
            }
          )
        }
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
    example: schema.example || 'No example!'
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
    md += `${indent(0)} Required properties\n\n`
    md += getTopLevelPropertyMarkdown(topLevelRequired)
  }
  // Add optional section
  if (topLevelOptional.length > 0) {
    md += `${indent(0)} Optional properties\n\n`
    md += getTopLevelPropertyMarkdown(topLevelOptional)
  }

  result.markdown = md
  return result
}
