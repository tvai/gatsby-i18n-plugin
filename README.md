# gatsby-i18n

> [Gatsby2](https://github.com/gatsbyjs/gatsby) plugin that provides i18n support.

## Packages

This repository is a monorepo managed with [Lerna](https://github.com/lerna/lerna). [Several packages](/packages) are published to npm from the same codebase.

## Installation (for gatsby-plugin-i18next)

```sh
yarn add @tvai/gatsby-plugin-i18next
# npm install --save @tvai/gatsby-plugin-i18next
```

## Notes

Forked from a fork of the [original repo](https://github.com/ikhudo/gatsby-i18n-plugin). The original implementation required all lang routes to have a prefix in the url, eg: `/en/post`, a 2nd fork added some tweaks that allowed for redirectFallback to be set to true or false, allowing the user to choose whether to generate default fallback language with a url prefix or not.

There's 2 main issues that the fork patches:

1. Using the original plugin, or setting `redirectFallback: true`, works fine. However, this means that the root index.html that `gatsby build` generates will not contain the fully generated html (that usually includes your SEO tags), as an index.html with redirect component replaces it. This means crawlers such as Facebook's Debugger may not see the full index.html and interpret tags accurately. (If you are hosting your Gatsby site on Netlify, you may be able to fix that by enabling Netlify's pre-render).

2. After disabling redirectFallback, the Link behaviour needs to adapt so that it continues to work correctly. Disabling redirectFallback also prevents the lang cookie from being saved. (You could easily manually control which url to route the user to on one of your main entry points after custom location/browser language detection work).

The react-i18next package dependency is also relatively outdated and needs to be updated. However, this fork doesn't handle that yet, as the hotfixes above were needed urgently.

# Options

You can pass options to the plugin:

- availableLngs (Array [required])
- fallbackLng (String [required])
- redirectFallback (Boolean [required])
- siteUrl (String [optional])

For example:

```js
module.exports = {
  plugins: [
    {
      resolve: `@tvai/gatsby-plugin-i18next`,
      options: {
        availableLngs: ['en', 'de'],
        fallbackLng: 'en',
        siteUrl: 'https://www.example.com/',
      },
    },
    
    // Ensure that Gatsby knows to retrieve files from your locale folder.
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `locale`,
        path: `${__dirname}/locale`
      }
    },
  ],
};
```

locale folder:

- place at root of Gatsby project alongside `src`.

```
locale
  en
    messages.json
  es
    messages.json
public
src
```


### gatsby-starter-i18next (Orig)

[Demo](https://hupe1980.github.io/gatsby-i18n/gatsby-starter-i18next) [Source](/starters/gatsby-starter-i18next)

- i18next integration
- automatic browser-language detection and redirection
- language switcher
- hreflang
- ...

## License

[MIT](LICENSE)
