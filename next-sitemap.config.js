/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.SITE_URL || 'https://thibault.sh',
    generateRobotsTxt: true, // (optional)

}

export default config