import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

const FloatingTelegramButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <a
      href="https://t.me/badpoehalibot"
      target="_blank"
      rel="noopener noreferrer"
      className={`fixed bottom-6 right-6 z-50 bg-[#339edc] hover:bg-[#2889c4] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'
      }`}
      aria-label="Написать в Telegram"
    >
      <Icon name="MessageCircle" size={28} />
    </a>
  );
};

export default FloatingTelegramButton;
