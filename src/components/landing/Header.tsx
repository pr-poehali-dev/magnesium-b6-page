import Icon from '@/components/ui/icon';

const Header = () => {
  return (
    <header className="bg-white border-b border-border py-4 px-4 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-[#5BC0DE] to-[#339edc] rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">P</span>
          </div>
          <h1 className="text-2xl font-bold text-[#339edc]">PharmExpert</h1>
        </div>
        <p className="text-sm text-muted-foreground hidden md:block">Экспертный подход к вашему здоровью</p>
      </div>
    </header>
  );
};

export default Header;
