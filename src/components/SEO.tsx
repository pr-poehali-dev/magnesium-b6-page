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

    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Чем хелат магния лучше других форм?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Хелатная форма имеет биодоступность до 95% против 30-40% у оксида магния. Магний связан с аминокислотами, что обеспечивает максимальное усвоение без побочных эффектов со стороны ЖКТ."
          }
        },
        {
          "@type": "Question",
          "name": "Есть ли побочные эффекты?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Хелат магния — самая безопасная форма. В отличие от оксида или цитрата, не вызывает расстройств ЖКТ. Возможна индивидуальная непереносимость компонентов (крайне редко)."
          }
        },
        {
          "@type": "Question",
          "name": "Когда будет результат?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Первые эффекты (улучшение сна, снижение тревожности) — через 7-10 дней. Полный эффект по энергии, концентрации, устранению судорог — через 3-4 недели регулярного приёма."
          }
        },
        {
          "@type": "Question",
          "name": "Можно ли принимать беременным?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Магний безопасен при беременности и лактации, но дозировку должен определить врач. Проконсультируйтесь с вашим акушером-гинекологом перед началом приёма."
          }
        },
        {
          "@type": "Question",
          "name": "Совместим ли с другими добавками?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Да, хорошо сочетается с витамином D, омега-3, цинком. Не рекомендуется одновременный приём с высокими дозами кальция (снижает усвоение магния) — разнесите приёмы на 2-3 часа."
          }
        }
      ]
    };

    const script4 = document.createElement('script');
    script4.type = 'application/ld+json';
    script4.text = JSON.stringify(faqSchema);
    document.head.appendChild(script4);

    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "PharmExpert - Магний Хелат",
      "url": window.location.origin,
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${window.location.origin}/search?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    const script5 = document.createElement('script');
    script5.type = 'application/ld+json';
    script5.text = JSON.stringify(websiteSchema);
    document.head.appendChild(script5);

  }, [productData, organizationData]);

  return null;
};

export default SEO;