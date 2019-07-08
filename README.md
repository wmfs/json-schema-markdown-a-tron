# json-schema-markdown-a-tron
[![CircleCI](https://circleci.com/gh/wmfs/json-schema-markdown-a-tron.svg?style=svg)](https://circleci.com/gh/wmfs/json-schema-markdown-a-tron)
> Turn a JSON-Schema object into markdown string

# Installation

``` bash
npm install @wmfs/json-schema-markdown-a-tron --save
```

## <a name="Usage"></a> Usage

``` javascript

const getMarkdown = require('@wmfs/json-schema-markdown-a-tron')

const output = getMarkdown(
  {
    "$id": "https://example.com/person.schema.json",
    "$schema": "http://json-schema.org/draft-07/schema#",
    "title": "Person",
    "type": "object",
    "properties": {
      "firstName": {
        "type": "string",
        "description": "The person's first name."
      },
      "lastName": {
        "type": "string",
        "description": "The person's last name."
      },
      "age": {
        "description": "Age in years which must be equal to or greater than zero.",
        "type": "integer",
        "minimum": 0
      }
    }
  }
)

// Results
// output.markdown = Markdown string.
// output.title = Schema title, if there is one.
// output.description = Schema description, if there is one.
// output.example = Schema example, if there is one.

```

## <a name='license'></a>License
[MIT](https://github.com/wmfs/json-schema-markdown-a-tron/blob/master/LICENSE)
