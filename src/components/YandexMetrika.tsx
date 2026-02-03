import { useEffect } from 'react';

declare global {
  interface Window {
    ym?: (id: number, method: string, params?: Record<string, unknown>) => void;
  }
}

const YandexMetrika = () => {
  useEffect(() => {
    const id = 106587459;

    (function(m,e,t,r,i,k,a){
      m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();
      for (let j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
      k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
    })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=106587459', 'ym');

    window.ym?.(id, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: "dataLayer",
      referrer: document.referrer,
      url: location.href,
      accurateTrackBounce: true,
      trackLinks: true
    });

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt=""/></div>`;
    document.body.appendChild(noscript);

  }, []);

  return null;
};

export default YandexMetrika;