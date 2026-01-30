const Footer = () => {
  return (
    <footer className="bg-[#3A3529] text-white py-8 md:py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-[#5BC0DE] to-[#339edc] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg md:text-xl">P</span>
              </div>
              <h3 className="text-xl md:text-2xl font-bold">PharmExpert</h3>
            </div>
            <p className="text-sm md:text-base text-white/70">Экспертный подход к вашему здоровью</p>
          </div>
          <div>
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4">Контакты</h4>
            <p className="text-sm md:text-base text-white/70 mb-2 break-words">Email: info@pharmexpert.ru</p>
            <p className="text-sm md:text-base text-white/70">Телефон: 8 (928) 773-05-53</p>
          </div>
          <div>
            <h4 className="text-base md:text-lg font-bold mb-3 md:mb-4">Информация</h4>
            <p className="text-sm md:text-base text-white/70 mb-2">Доставка и оплата</p>
            <p className="text-sm md:text-base text-white/70">Политика конфиденциальности</p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-6 md:pt-8 text-center text-white/60 text-xs md:text-sm">
          <p className="mb-2">© 2024 PharmExpert. Все права защищены.</p>
          <p className="leading-relaxed">БАД. Не является лекарственным средством. Перед применением проконсультируйтесь со специалистом.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;