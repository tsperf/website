const description = 'A suite of open-source tools that help you visualise potential performance issues, detect regressions, decode compiler measurements and much more.'

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts', '@nuxt/eslint', '@nuxtjs/plausible'],
  srcDir: 'src',
  runtimeConfig: {
    public: {
      supabase: {
        host: 'https://tolzxagdkwvomdmumxrx.supabase.co',
        key: '',
      },
    },
  },
  plausible: { domain: 'tsperf.dev' },
  eslint: { config: { stylistic: true } },
  app: {
    head: {
      title: 'TypeScript performance made easy',
      link: [{ rel: 'icon', href: '/favicon.png' }],
      meta: [
        { name: 'description', content: description },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://tsperf.dev/' },
        { property: 'og:title', content: 'TypeScript performance made easy' },
        { property: 'og:description', content: description },
        { property: 'og:image', content: 'https://tsperf.dev/og.png' },
        { property: 'twitter:url', content: 'https://tsperf.dev/' },
        { property: 'twitter:title', content: 'TypeScript performance made easy' },
        { property: 'twitter:description', content: description },
        { property: 'twitter:image', content: 'https://tsperf.dev/og.png' },
        { property: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },
})
