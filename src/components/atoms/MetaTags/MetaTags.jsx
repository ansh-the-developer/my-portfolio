import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MetaTags = ({
  title,
  description,
  canonical,
  ogType = "website",
  ogImage = "/aj_logo_512.png",
  schema
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Set Title
    document.title = title || "Aman Joshi | Portfolio";

    // Helper to find or create meta tag
    const setMetaTag = (attrName, attrValue, content) => {
      let element = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attrName, attrValue);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // 2. Set Meta Description
    if (description) {
      setMetaTag("name", "description", description);
    }

    // 3. Set Canonical Link
    const canonicalUrl = canonical || `https://amanthedeveloper.netlify.app${location.pathname}`;
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", canonicalUrl);

    // 4. Set Open Graph (Facebook / LinkedIn) Tags
    setMetaTag("property", "og:title", title);
    if (description) {
      setMetaTag("property", "og:description", description);
    }
    setMetaTag("property", "og:url", canonicalUrl);
    setMetaTag("property", "og:type", ogType);
    setMetaTag("property", "og:image", `https://amanthedeveloper.netlify.app${ogImage}`);

    // 5. Set Twitter/X Card Tags
    setMetaTag("name", "twitter:card", "summary_large_image");
    setMetaTag("name", "twitter:title", title);
    if (description) {
      setMetaTag("name", "twitter:description", description);
    }
    setMetaTag("name", "twitter:image", `https://amanthedeveloper.netlify.app${ogImage}`);

    // 6. Set JSON-LD Schema
    const existingSchemas = document.querySelectorAll('script[type="application/ld+json"].dynamic-seo-schema');
    existingSchemas.forEach((el) => el.remove());

    if (schema) {
      const schemasArray = Array.isArray(schema) ? schema : [schema];
      schemasArray.forEach((schemaObj) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.className = "dynamic-seo-schema";
        script.text = JSON.stringify(schemaObj);
        document.head.appendChild(script);
      });
    }
  }, [title, description, canonical, ogType, ogImage, schema, location.pathname]);

  return null;
};

export default MetaTags;
