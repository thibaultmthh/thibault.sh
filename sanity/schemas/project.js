export default {
    title: 'Project',
    name: 'project',
    type: 'document',
    fields: [
        {
            title: 'Title',
            name: 'title',
            type: 'string',
            validation: Rule => Rule.required()
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            },
            validation: Rule => Rule.required()
        },
        {
            title: 'Short description',
            name: 'shortDescription',
            type: 'text',
            validation: Rule => Rule.required()
        },
        {
            title: 'Description',
            name: 'description',
            type: 'array',
            of: [{ type: 'block' }],
            validation: Rule => Rule.required()
        },
        {
            title: 'Image',
            name: 'image',
            type: 'image',
            options: {
                hotspot: true
            },
            validation: Rule => Rule.required()
        },
        {
            title: 'Tags',
            name: 'tags',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'tag' }] }],
            validation: Rule => Rule.required()
        },
        {
            title: 'Project Type',
            name: 'projectType',
            type: 'reference',
            to: [{ type: 'projectType' }],
            validation: Rule => Rule.required()
        },
        {
            title: "Date started",
            name: "dateStarted",
            type: "date",
            validation: Rule => Rule.required()
        },
        {
            title: "Date finished",
            name: "dateFinished",
            type: "date",
        }
    ],
}