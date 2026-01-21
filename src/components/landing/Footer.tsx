const Footer = () => {
  return (
    <footer className="bg-[#3A3529] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#5BC0DE] to-[#339edc] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h3 className="text-2xl font-bold">PharmExpert</h3>
            </div>
            <p className="text-white/70">Экспертный подход к вашему здоровью</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Контакты</h4>
            <p className="text-white/70 mb-2">Email: info@pharmexpert.ru</p>
            <p className="text-white/70">Телефон: 8 (928) 773-05-53</p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Информация</h4>
            <p className="text-white/70 mb-2">Доставка и оплата</p>
            <p className="text-white/70">Политика конфиденциальности</p>
          </div>
        </div>
        <div className="border-t border-white/20 pt-8 text-center text-white/60 text-sm">
          <p className="mb-2">© 2024 PharmExpert. Все права защищены.</p>
          <p>БАД. Не является лекарственным средством. Перед применением проконсультируйтесь со специалистом.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
