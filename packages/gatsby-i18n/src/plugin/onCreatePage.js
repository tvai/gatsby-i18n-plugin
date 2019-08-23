import path from 'path';

const onCreatePage = ({ page, actions }, pluginOptions) => {
  const { createPage, deletePage } = actions;
  const {
    fallbackLng,
    availableLngs,
    siteUrl,
    debug,
    redirectFallback = true,
  } = pluginOptions;

  if (page.path.includes('dev-404')) {
    return Promise.resolve();
  }

  return new Promise(resolve => {
    if (redirectFallback) {
      const redirect = path.resolve('./.cache/@tvai/redirect.js');
      const redirectPage = {
        ...page,
        component: redirect,
        context: {
          ...page.context,
          availableLngs,
          fallbackLng,
          debug,
          lng: null,
          routed: false,
          redirectPage: page.path,
          redirectFallback,
          siteUrl,
        },
      };

      deletePage(page);
      createPage(redirectPage);
    }

    availableLngs.forEach(lng => {
      const localePage = {
        ...page,
        path:
          lng == fallbackLng && !redirectFallback
            ? page.path
            : `/${lng}${page.path}`,
        context: {
          ...page.context,
          availableLngs,
          fallbackLng,
          lng,
          routed: true,
          originalPath: page.path,
          redirectFallback,
          siteUrl,
          debug,
        },
      };

      createPage(localePage);
    });

    resolve();
  });
};

export default onCreatePage;
