module.exports = {
  apiUrl: process.env.NEXT_PUBLIC_DEV_API_URL,
  googleApiKey: process.env.GOOGLE_MAP_API_KEY,
  domainName: '',
  hasDomainName: process.env.DEV_HAS_DOMAIN_NAME == 'true',
  stripe: process.env.NEXT_PUBLIC_STRIPE_TEST,
  app: {
    htmlAttributes: { lang: 'en' },
    title: 'Test',
    titleTemplate: 'Test - %s',
    meta: [
      {
        name: 'description',
        content: 'The best react universal starter boilerplate in the world.'
      }
    ],
    links: [
      'https://fonts.googleapis.com/css?family=Tangerine',
      '/css/main.css'
    ]
  }
};
