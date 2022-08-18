export default {
    title: 'Tag',
    name: 'tag',
    type: 'document',
    fields: [
        {
            title: "tag",
            name: "tag",
            type: "string",
            validation: Rule => Rule.required()
        }
    ]
}