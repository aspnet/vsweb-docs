<properties
			pageTitle="JSON"
			description="The JSON editor in Visual Studio is the first of its kind to fully support JSON Schema."
			slug="json"
			keywords="json, jsonp, javascript object notation"
/>

## Auto-completion
Writing JSON documents has never been easier than with the Visual Studio JSON editor.

You can even type the colon before the closing quote of a property name to save a few keystrokes.

![Basic JSON auto-completion](_assets/json-basic-auto-completion.gif)

## JSON Schema
The JSON editor in Visual Studio is the first of its kind to fully support the [JSON Schema](http://json-schema.org) standard. You get [IntelliSense](http://go.microsoft.com/fwlink/?LinkId=532997) and validation for some of the most common JSON file formats.

This example shows what it's like working with a 
[Web Manifest](http://www.w3.org/TR/appmanifest/) JSON document.

![JSON Schema based Intellisense](_assets/json-schema-intellisense.gif)

## Tooltips
Information from the referenced JSON Schema is displayed as hover tooltips to help make it clear what the various properties mean.

![JSON tootips](_assets/json-tooltips.gif)

## Comments
Most modern JSON parsers support comments, and so does Visual Studio. Simply hit the global keyboard shortcut `Ctrl+K+C` to add a comment, or `Ctrl+K+U` to uncomment the line or selection.

![JSON comments](_assets/json-comments.gif)

## Validation
The editor helps you keep track of syntax errors and other potential issues, such as duplicate properties.

![JSON validation](_assets/json-validation.gif)

## For JSON Schema authors
You get great support for writing JSON Schema documents.

### JSON Pointers
Visual Studio provides full IntelliSense for [JSON Pointer](http://tools.ietf.org/html/rfc6901) references. It works for pointers in the current document as well as remote references.

![JSON Pointers](_assets/json-pointer.gif)

### Inline $ref references
Inline `$ref` references make it easy to refactor your JSON Schema.

![JSON inline references](_assets/json-inline-reference.gif)

### Go to definition
You can hit `F12` on any `$ref` or `$schema` property to navigate
to its source origin - in both local and remote files.

### Open source
All the JSON Schema files that provide IntelliSense and validation are open source at [SchemaStore.org](http://schemastore.org).

<aside role="complementary">

## Related resources

<section>

### More information

- [JSON-Schema.org](http://json-schema.org)
- [SchemaStore.org](http://schemastore.org)
- [Understanding JSON Schema](http://spacetelescope.github.io/understanding-json-schema/)
</section>

<section>

### Relevant extensions

- [Web Essentials](https://visualstudiogallery.msdn.microsoft.com/ee6e6d8c-c837-41fb-886a-6b50ae2d06a2)
- [JSON Schema Generator](https://visualstudiogallery.msdn.microsoft.com/b4515ef8-a518-41ca-b48c-bb1fd4e6faf7)
</section>

</aside>