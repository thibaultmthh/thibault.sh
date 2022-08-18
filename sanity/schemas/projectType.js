export default {
    title: 'Project Type',
    name: 'projectType',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        },
    ]
}