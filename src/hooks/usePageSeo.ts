import { useEffect } from 'react';

type JsonLdValue = Record<string, unknown> | Array<Record<string, unknown>>;

interface PageSeoConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noindex?: boolean;
  jsonLd?: JsonLdValue;
}

const toAbsoluteUrl = (value?: string) => {
  if (!value) return undefined;

  try {
    return new URL(value, window.location.href).toString();
  } catch {
    return value;
  }
};

export const usePageSeo = ({
  title,
  description,
  image,
  url,
  type = 'website',
  noindex = false,
  jsonLd,
}: PageSeoConfig) => {
  const serializedJsonLd = jsonLd ? JSON.stringify(jsonLd) : undefined;

  useEffect(() => {
    const head = document.head;
    const cleanups: Array<() => void> = [];
    const absoluteImage = toAbsoluteUrl(image);
    const canonicalUrl = url ?? window.location.href;

    const previousTitle = document.title;
    document.title = title;
    cleanups.push(() => {
      document.title = previousTitle;
    });

    const setMetaTag = (attribute: 'name' | 'property', key: string, content: string) => {
      let element = head.querySelector(`meta[${attribute}="${key}"]`) as HTMLMetaElement | null;
      const created = !element;

      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        head.appendChild(element);
      }

      const previousContent = element.getAttribute('content');
      element.setAttribute('content', content);

      cleanups.push(() => {
        if (created) {
          element?.remove();
          return;
        }

        if (previousContent === null) {
          element?.removeAttribute('content');
          return;
        }

        element?.setAttribute('content', previousContent);
      });
    };

    const setCanonicalLink = (href: string) => {
      let element = head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      const created = !element;

      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', 'canonical');
        head.appendChild(element);
      }

      const previousHref = element.getAttribute('href');
      element.setAttribute('href', href);

      cleanups.push(() => {
        if (created) {
          element?.remove();
          return;
        }

        if (previousHref === null) {
          element?.removeAttribute('href');
          return;
        }

        element?.setAttribute('href', previousHref);
      });
    };

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, nofollow' : 'index, follow');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('name', 'twitter:card', absoluteImage ? 'summary_large_image' : 'summary');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);

    if (absoluteImage) {
      setMetaTag('property', 'og:image', absoluteImage);
      setMetaTag('name', 'twitter:image', absoluteImage);
    }

    setCanonicalLink(canonicalUrl);

    if (serializedJsonLd) {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-page-seo', 'true');
      script.text = serializedJsonLd;
      head.appendChild(script);

      cleanups.push(() => {
        script.remove();
      });
    }

    return () => {
      cleanups.reverse().forEach((cleanup) => cleanup());
    };
  }, [description, image, noindex, serializedJsonLd, title, type, url]);
};
