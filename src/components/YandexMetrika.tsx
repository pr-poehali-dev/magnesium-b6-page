import { useEffect } from 'react';

declare global {
  interface Window {
    ym?: (id: number, method: string, params?: Record<string, unknown>) => void;
  }
}

const YandexMetrika = () => {
  useEffect(() => {
    const metrikaId = import.meta.env.VITE_YANDEX_METRIKA_ID;
    
    if (!metrikaId) {
      console.warn('YANDEX_METRIKA_ID не установлен');
      return;
    }

    const id = parseInt(metrikaId, 10);
    if (isNaN(id)) {
      console.error('YANDEX_METRIKA_ID должен быть числом');
      return;
    }

    (function (m, e, t, r, i, k, a) {
      m[i] = m[i] || function () {
        (m[i].a = m[i].a || []).push(arguments);
      };
      m[i].l = 1 * new Date().getTime();
      for (let j = 0; j < document.scripts.length; j++) {
        if (document.scripts[j].src === r) {
          return;
        }
      }
      k = e.createElement(t);
      a = e.getElementsByTagName(t)[0];
      k.async = 1;
      k.src = r;
      a.parentNode.insertBefore(k, a);
    })(window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

    window.ym?.(id, "init", {
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
      trackHash: true
    });

    const noscript = document.createElement('noscript');
    noscript.innerHTML = `<div><img src="https://mc.yandex.ru/watch/${id}" style="position:absolute; left:-9999px;" alt=""/></div>`;
    document.body.appendChild(noscript);

  }, []);

  return null;
};

export default YandexMetrika;
