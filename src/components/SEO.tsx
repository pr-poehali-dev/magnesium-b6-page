import { useEffect } from 'react';

interface ProductSchema {
  name: string;
  description: string;
  image: string;
  brand: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability: string;
    priceValidUntil: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

interface SEOProps {
  productData?: ProductSchema;
  organizationData?: {
    name: string;
    url: string;
    logo: string;
  };
}

const SEO = ({ productData, organizationData }: SEOProps) => {
  useEffect(() => {
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
    existingScripts.forEach(script => script.remove());

    if (productData) {
      const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": productData.name,
        "description": productData.description,
        "image": productData.image,
        "brand": {
          "@type": "Brand",
          "name": productData.brand
        },
        "offers": {
          "@type": "Offer",
          "url": window.location.href,
          "priceCurrency": productData.offers.priceCurrency,
          "price": productData.offers.price,
          "availability": productData.offers.availability,
          "priceValidUntil": productData.offers.priceValidUntil
        },
        ...(productData.aggregateRating && {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": productData.aggregateRating.ratingValue,
            "reviewCount": productData.aggregateRating.reviewCount
          }
        })
      };

      const script1 = document.createElement('script');
      script1.type = 'application/ld+json';
      script1.text = JSON.stringify(productSchema);
      document.head.appendChild(script1);
    }

    if (organizationData) {
      const orgSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": organizationData.name,
        "url": organizationData.url,
        "logo": organizationData.logo
      };

      const script2 = document.createElement('script');
      script2.type = 'application/ld+json';
      script2.text = JSON.stringify(orgSchema);
      document.head.appendChild(script2);
    }

    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "Главная",
        "item": window.location.origin
      }]
    };

    const script3 = document.createElement('script');
    script3.type = 'application/ld+json';
    script3.text = JSON.stringify(breadcrumbSchema);
    document.head.appendChild(script3);

  }, [productData, organizationData]);

  return null;
};

export default SEO;
