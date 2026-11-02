import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

function setMetaContent(selector, content) {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute('content', content);
}

/*
  Sets the browser tab title and meta description for each page.
  Note: this is a client-rendered site, so search engines see these after JavaScript runs.
  Google handles this well; some social-media link previews only read index.html.
*/
export function usePageMeta(title, description) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.brandName}` : siteConfig.seo.defaultTitle;
    const metaDescription = description || siteConfig.seo.defaultDescription;

    document.title = fullTitle;
    setMetaContent('meta[name="description"]', metaDescription);
    setMetaContent('meta[property="og:title"]', fullTitle);
    setMetaContent('meta[property="og:description"]', metaDescription);
  }, [title, description]);
}
