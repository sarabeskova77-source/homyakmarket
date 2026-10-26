import { useState, useEffect, useRef, type ReactNode } from 'react';

// 20 уникальных изображений хомяков
const hamsterImages = [
  'https://image.qwenlm.ai/generated-images/c7cf43c3-ced5-4b39-a864-f7c06d51799c/_result.png',  // Сирийский золотистый
  'https://image.qwenlm.ai/generated-images/1a95fb3a-fd8f-4352-9d70-beb7b9c83523/_result.png',  // Джунгарский белый
  'https://image.qwenlm.ai/generated-images/59c4ba1e-688a-4108-9d14-b17fbd8ac1e1/_result.png',  // Тедди-бэр белый
  'https://image.qwenlm.ai/generated-images/fff75f4a-7fc2-427c-a28a-1ede5805c76c/_result.png',  // Роборовского
  'https://image.qwenlm.ai/generated-images/234a3266-fc26-4332-ad68-b2479fc41e5e/_result.png',  // Кэмпбелла агутти
  'https://image.qwenlm.ai/generated-images/f6871cbe-81a2-4290-830b-f6356e216c7f/_result.png',  // Китайский
  'https://image.qwenlm.ai/generated-images/8c9fd646-aef9-4122-96f2-58deec7fc178/_result.png',  // Сирийский пегий
  'https://image.qwenlm.ai/generated-images/451b21e0-a5ac-4009-8330-abd9533211ff/_result.png',  // Сатиновый
  'https://image.qwenlm.ai/generated-images/b3865e2e-585b-4007-a2b9-0b27025820c4/_result.png',  // Кремовый
  'https://image.qwenlm.ai/generated-images/7cdccee5-fcaf-4901-b13b-124edc66e493/_result.png',  // Джунгарский полосатый
  'https://image.qwenlm.ai/generated-images/07cb050b-08d9-4196-afae-db90673c70c7/_result.png',  // Альбинос
  'https://image.qwenlm.ai/generated-images/1beb4f7f-b03b-40f0-8854-b38e7492588e/_result.png',  // Джунгарский жемчужный
  'https://image.qwenlm.ai/generated-images/0e8dd342-6977-4c55-97fc-39d35ca94a62/_result.png',  // Тедди-бэр коричневый
  'https://image.qwenlm.ai/generated-images/2a64ae7f-6e54-4fdf-8242-77d93749ced4/_result.png',  // Роборовского белый
  'https://image.qwenlm.ai/generated-images/d9c90bef-1029-44a1-871b-5f10a5d8b939/_result.png',  // Кэмпбелла коричневый
  'https://image.qwenlm.ai/generated-images/f080190b-fc93-4154-849c-5fb9e3ce6f6d/_result.png',  // Ван-окрас
  'https://image.qwenlm.ai/generated-images/b80fc1c9-29b4-46a9-95bc-c92d81a1ee7d/_result.png',  // Рекс
  'https://image.qwenlm.ai/generated-images/5d41d898-4e33-4889-8d40-e41a20086baa/_result.png',  // Персиковый
  'https://image.qwenlm.ai/generated-images/ec84f3d4-17de-47ef-8b82-a7701be61fdc/_result.png',  // Джунгарский сизый
  'https://image.qwenlm.ai/generated-images/3671ee6d-5903-41b6-8529-87986a7da0d0/_result.png',  // Палевый
];

interface Hamster {
  id: number;
  name: string;
  breed: string;
  description: string;
  price: number;
  age: string;
  gender: string;
  image: string;
  available: boolean;
  quantity: number;
  traits: string[];
}

const initialHamsters: Hamster[] = [
  { id: 1, name: 'Зефир', breed: 'Сирийский золотистый', description: 'Классический золотистый сирийский хомяк с мягкой плюшевой шубкой. Очень дружелюбный и ручной.', price: 1500, age: '2 месяца', gender: 'Мальчик', image: hamsterImages[0], available: true, quantity: 3, traits: ['Дружелюбный', 'Крупный', 'Ручной'] },
  { id: 2, name: 'Снежок', breed: 'Джунгарский белый', description: 'Белоснежный джунгарский хомяк с чёрными глазами-бусинками. Компактный и очень милый.', price: 1200, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[1], available: true, quantity: 5, traits: ['Компактный', 'Активный', 'Милый'] },
  { id: 3, name: 'Облачко', breed: 'Тедди-бэр белый', description: 'Длинношёрстный белый хомяк, похожий на маленького плюшевого мишку. Невероятно мягкий!', price: 2000, age: '2 месяца', gender: 'Девочка', image: hamsterImages[2], available: true, quantity: 2, traits: ['Пушистый', 'Ласковый', 'Тихий'] },
  { id: 4, name: 'Песок', breed: 'Роборовского', description: 'Самый маленький хомяк в мире! Песочного цвета с белым брюшком. Шустрый и любопытный.', price: 1800, age: '2.5 месяца', gender: 'Мальчик', image: hamsterImages[3], available: true, quantity: 4, traits: ['Крошечный', 'Быстрый', 'Любопытный'] },
  { id: 5, name: 'Каштан', breed: 'Кэмпбелла агутти', description: 'Красивый хомяк Кэмпбелла с природным окрасом агутти. Спокойный характер.', price: 1300, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[4], available: true, quantity: 3, traits: ['Спокойный', 'Неприхотливый', 'Общительный'] },
  { id: 6, name: 'Хвостик', breed: 'Китайский хомяк', description: 'Уникальный хомяк с длинным хвостом! Стройное тело и грациозные движения.', price: 2200, age: '4 месяца', gender: 'Девочка', image: hamsterImages[5], available: true, quantity: 2, traits: ['Грациозный', 'Редкий', 'Умный'] },
  { id: 7, name: 'Пончик', breed: 'Сирийский пегий', description: 'Яркий пятнистый сирийский хомяк с чёрно-белым окрасом. Каждый узор уникален!', price: 1700, age: '2 месяца', gender: 'Мальчик', image: hamsterImages[6], available: true, quantity: 3, traits: ['Яркий', 'Уникальный', 'Игривый'] },
  { id: 8, name: 'Бархат', breed: 'Сирийский сатиновый', description: 'Блестящая шёлковая шерсть шоколадного цвета. Переливается на свету!', price: 2500, age: '3 месяца', gender: 'Девочка', image: hamsterImages[7], available: true, quantity: 1, traits: ['Блестящий', 'Элегантный', 'Редкий'] },
  { id: 9, name: 'Карамель', breed: 'Сирийский кремовый', description: 'Нежный кремовый окрас, как карамелька. Очень ласковый и спокойный.', price: 1600, age: '2.5 месяца', gender: 'Девочка', image: hamsterImages[8], available: true, quantity: 4, traits: ['Нежный', 'Ласковый', 'Спокойный'] },
  { id: 10, name: 'Полосатик', breed: 'Джунгарский полосатый', description: 'Классический джунгарик с тёмной полоской на спине. Активный и игривый.', price: 1100, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[9], available: true, quantity: 6, traits: ['Классический', 'Активный', 'Игривый'] },
  { id: 11, name: 'Луна', breed: 'Сирийский альбинос', description: 'Редкий белый сирийский хомяк с красными глазами. Загадочный и элегантный.', price: 2800, age: '2 месяца', gender: 'Девочка', image: hamsterImages[10], available: true, quantity: 1, traits: ['Редкий', 'Загадочный', 'Нежный'] },
  { id: 12, name: 'Ириска', breed: 'Джунгарский жемчужный', description: 'Серо-голубой окрас с жемчужным отливом. Очень редкая расцветка!', price: 2100, age: '3 месяца', gender: 'Девочка', image: hamsterImages[11], available: true, quantity: 2, traits: ['Редкий окрас', 'Красивый', 'Ласковый'] },
  { id: 13, name: 'Тедди', breed: 'Тедди-бэр коричневый', description: 'Коричневый длинношёрстный хомяк. Выглядит как настоящий плюшевый мишка!', price: 2300, age: '2 месяца', gender: 'Мальчик', image: hamsterImages[12], available: true, quantity: 2, traits: ['Пушистый', 'Милый', 'Дружелюбный'] },
  { id: 14, name: 'Малыш', breed: 'Роборовского белый', description: 'Белоснежный карликовый хомяк Роборовского. Самый крошечный и быстрый!', price: 2000, age: '2.5 месяца', gender: 'Мальчик', image: hamsterImages[13], available: true, quantity: 3, traits: ['Белоснежный', 'Крошечный', 'Шустрый'] },
  { id: 15, name: 'Шоколад', breed: 'Кэмпбелла коричневый', description: 'Тёмно-коричневый хомяк Кэмпбелла. Глубокий насыщенный окрас.', price: 1400, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[14], available: true, quantity: 4, traits: ['Тёмный', 'Сильный', 'Спокойный'] },
  { id: 16, name: 'Соня', breed: 'Сирийский ван-окрас', description: 'Белый хомяк с цветным пятном на голове. Очень редкий и красивый окрас!', price: 3000, age: '2 месяца', gender: 'Девочка', image: hamsterImages[15], available: true, quantity: 1, traits: ['Эксклюзивный', 'Красивый', 'Ручной'] },
  { id: 17, name: 'Бублик', breed: 'Сирийский рекс', description: 'Хомяк с кудрявой шерстью! Уникальная текстура меха.', price: 2600, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[16], available: true, quantity: 2, traits: ['Кудрявый', 'Уникальный', 'Забавный'] },
  { id: 18, name: 'Персик', breed: 'Сирийский персиковый', description: 'Тёплый персиковый окрас, как спелый фрукт. Нежный и ласковый.', price: 1800, age: '2.5 месяца', gender: 'Девочка', image: hamsterImages[17], available: true, quantity: 3, traits: ['Тёплый окрас', 'Нежный', 'Ласковый'] },
  { id: 19, name: 'Дымка', breed: 'Джунгарский сизый', description: 'Голубовато-серый окрас с дымчатым отливом. Красивый и необычный.', price: 1500, age: '3 месяца', gender: 'Девочка', image: hamsterImages[18], available: true, quantity: 4, traits: ['Дымчатый', 'Красивый', 'Тихий'] },
  { id: 20, name: 'Булочка', breed: 'Сирийский палевый', description: 'Светло-палевый окрас, как свежеиспечённая булочка. Очень мягкий характер.', price: 1400, age: '2 месяца', gender: 'Девочка', image: hamsterImages[19], available: true, quantity: 5, traits: ['Светлый', 'Мягкий', 'Добрый'] },
];

type TabId = 'home' | 'catalog' | 'breeds' | 'buying' | 'reviews' | 'contacts';

interface Tab {
  id: TabId;
  label: string;
  icon: string;
}

const tabs: Tab[] = [
  { id: 'home', label: 'Главная', icon: '🏠' },
  { id: 'catalog', label: 'Каталог', icon: '🐹' },
  { id: 'breeds', label: 'О породах', icon: '📖' },
  { id: 'buying', label: 'Как купить', icon: '🛍️' },
  { id: 'reviews', label: 'Отзывы', icon: '💬' },
  { id: 'contacts', label: 'Контакты', icon: '📞' },
];

// Компонент анимированного появления для вкладок
function AnimatedTabContent({ children, tabId, activeTab }: { children: ReactNode; tabId: TabId; activeTab: TabId }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (activeTab === tabId) {
      setIsVisible(false);
      const timer = setTimeout(() => setIsVisible(true), 50);
      return () => clearTimeout(timer);
    }
  }, [activeTab, tabId]);

  if (activeTab !== tabId) return null;

  const getAnimationClass = () => {
    switch (tabId) {
      case 'home': return 'animate-tab-zoom';
      case 'catalog': return 'animate-tab-stagger';
      case 'breeds': return 'animate-tab-flip';
      case 'buying': return 'animate-tab-slide-right';
      case 'reviews': return 'animate-tab-fade-blur';
      case 'contacts': return 'animate-tab-bounce';
      default: return 'animate-tab-zoom';
    }
  };

  return (
    <div className={`${getAnimationClass()} ${isVisible ? 'tab-visible' : 'tab-hidden'}`}>
      {children}
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('home');
  const [hamsters, setHamsters] = useState<Hamster[]>(initialHamsters);
  const [cart, setCart] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedHamster, setSelectedHamster] = useState<Hamster | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'breed'>('name');
  const [filterAvailable, setFilterAvailable] = useState<'all' | 'available' | 'unavailable'>('all');
  const [prevTab, setPrevTab] = useState<TabId>('home');
  const [tabTransition, setTabTransition] = useState(false);

  // Обновление наличия каждые 2 минуты
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(120);
      setHamsters(prev => prev.map(h => {
        const rand = Math.random();
        if (rand < 0.3) {
          return { ...h, available: false, quantity: 0 };
        } else if (rand < 0.6) {
          const qty = Math.floor(Math.random() * 3) + 1;
          return { ...h, available: true, quantity: qty };
        } else {
          return { ...h, available: true, quantity: Math.floor(Math.random() * 5) + 3 };
        }
      }));
      showNotification('🔄 Наличие товаров обновлено!');
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  // Таймер
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 120));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  const addToCart = (id: number) => {
    setCart(prev => [...prev, id]);
    showNotification('🛒 Хомяк добавлен в корзину!');
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const switchTab = (tabId: TabId) => {
    if (tabId === activeTab) return;
    setPrevTab(activeTab);
    setTabTransition(true);
    setTimeout(() => {
      setActiveTab(tabId);
      setTabTransition(false);
    }, 300);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const filteredHamsters = hamsters
    .filter(h => {
      const matchesSearch = h.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.breed.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilter = filterAvailable === 'all' ||
        (filterAvailable === 'available' && h.available) ||
        (filterAvailable === 'unavailable' && !h.available);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.breed.localeCompare(b.breed);
    });

  const cartTotal = cart.reduce((sum, id) => {
    const hamster = hamsters.find(h => h.id === id);
    return sum + (hamster?.price || 0);
  }, 0);

  const breedInfo = [
    { name: 'Сирийский', image: hamsterImages[0], size: 'Крупный (13-18 см)', lifespan: '2-3 года', color: 'Золотистый, белый, чёрный, кремовый', character: 'Дружелюбный, ручной, спокойный', description: 'Самая популярная порода. Идеальна для начинающих. Легко приручается и любит общение.' },
    { name: 'Джунгарский', image: hamsterImages[1], size: 'Маленький (8-10 см)', lifespan: '1.5-2 года', color: 'Серый с полоской, белый, жемчужный', character: 'Активный, любопытный, быстрый', description: 'Компактный и шустрый. Отлично подходит для наблюдения. Может менять окрас зимой.' },
    { name: 'Роборовского', image: hamsterImages[3], size: 'Самый маленький (4-5 см)', lifespan: '3-3.5 года', color: 'Песочный, белый', character: 'Очень быстрый, пугливый, социальный', description: 'Самый миниатюрный хомяк. Лучше содержать парами. Больше для наблюдения, чем для рук.' },
    { name: 'Кэмпбелла', image: hamsterImages[4], size: 'Маленький (8-10 см)', lifespan: '1.5-2 года', color: 'Агутти, коричневый, белый', character: 'Общительный, активный, территориальный', description: 'Похож на джунгарика, но с другим характером. Может быть более агрессивным.' },
    { name: 'Китайский', image: hamsterImages[5], size: 'Средний (10-13 см)', lifespan: '2-3 года', color: 'Коричневый с тёмной полосой', character: 'Спокойный, умный, ловкий', description: 'Уникален длинным хвостом и стройным телом. Очень ловкий, может выбраться из клетки.' },
    { name: 'Тедди-бэр', image: hamsterImages[2], size: 'Крупный (13-18 см)', lifespan: '2-3 года', color: 'Белый, коричневый, золотистый', character: 'Ласковый, спокойный, пушистый', description: 'Разновидность сирийского с длинной шерстью. Выглядит как плюшевая игрушка.' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Уведомление */}
      {notification && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[100] animate-notification-in">
          <div className="bg-white rounded-2xl shadow-2xl px-8 py-4 border-l-4 border-orange-500 flex items-center gap-3">
            <span className="text-lg font-medium text-gray-800">{notification}</span>
          </div>
        </div>
      )}

      {/* Модальное окно хомяка */}
      {selectedHamster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-modal-in"
          onClick={() => setSelectedHamster(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-modal-content-in"
            onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedHamster.image} alt={selectedHamster.name}
                className="w-full h-72 object-cover rounded-t-3xl" />
              <button onClick={() => setSelectedHamster(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 hover:rotate-90 duration-300 shadow-lg">
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                <h2 className="text-3xl font-bold text-gray-800">{selectedHamster.name}</h2>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${selectedHamster.available ? 'status-available' : 'status-unavailable'}`}>
                  {selectedHamster.available ? `В наличии (${selectedHamster.quantity})` : 'Нет в наличии'}
                </span>
              </div>
              <p className="text-lg text-amber-700 font-semibold mb-2">{selectedHamster.breed}</p>
              <p className="text-gray-600 mb-4 leading-relaxed">{selectedHamster.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedHamster.traits.map((trait, i) => (
                  <span key={i} className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm font-medium">{trait}</span>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500">Возраст</p>
                  <p className="font-bold text-gray-800">{selectedHamster.age}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500">Пол</p>
                  <p className="font-bold text-gray-800">{selectedHamster.gender}</p>
                </div>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <p className="text-sm text-gray-500">Цена</p>
                  <p className="font-bold text-orange-600">{selectedHamster.price} ₽</p>
                </div>
              </div>
              {selectedHamster.available && (
                <button onClick={() => { addToCart(selectedHamster.id); setSelectedHamster(null); }}
                  className="btn-primary w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                  🛒 Добавить в корзину
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Корзина */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-modal-in"
          onClick={() => setShowCart(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl p-8 animate-modal-content-in"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">🛒 Корзина</h2>
              <button onClick={() => setShowCart(false)}
                className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all hover:rotate-90 duration-300">
                ✕
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-6xl mb-4 animate-float">🐹</p>
                <p className="text-gray-500">Корзина пуста</p>
              </div>
            ) : (
              <>
                {cart.map((id, index) => {
                  const hamster = hamsters.find(h => h.id === id);
                  if (!hamster) return null;
                  return (
                    <div key={index} className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl mb-3 animate-item-in"
                      style={{ animationDelay: `${index * 0.1}s` }}>
                      <img src={hamster.image} alt={hamster.name} className="w-14 h-14 rounded-full object-cover" />
                      <div className="flex-1">
                        <p className="font-bold text-gray-800">{hamster.name}</p>
                        <p className="text-sm text-gray-500">{hamster.breed}</p>
                      </div>
                      <p className="font-bold text-orange-600">{hamster.price} ₽</p>
                      <button onClick={() => removeFromCart(index)}
                        className="w-8 h-8 bg-red-100 text-red-500 rounded-full flex items-center justify-center hover:bg-red-200 transition-all hover:scale-110">
                        ✕
                      </button>
                    </div>
                  );
                })}
                <div className="border-t mt-4 pt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Итого:</span>
                    <span className="text-orange-600">{cartTotal} ₽</span>
                  </div>
                  <button className="btn-primary w-full mt-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                    ✅ Оформить заказ
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Навигация */}
      <nav className="fixed top-0 left-0 right-0 z-40 glass-effect animate-fade-in-down">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => switchTab('home')}>
            <span className="text-3xl animate-wiggle">🐹</span>
            <span className="text-xl font-bold text-gradient hidden sm:block">ХомякМаркет</span>
          </div>

          {/* Табы */}
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg scale-105'
                    : 'text-gray-600 hover:bg-orange-100 hover:text-orange-700'
                  }`}
              >
                <span className={`text-base ${activeTab === tab.id ? 'animate-tab-icon-pop' : ''}`}>{tab.icon}</span>
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center gap-2 bg-orange-100 rounded-full px-3 py-1.5">
              <span className="text-xs text-gray-600">Обновление:</span>
              <span className="font-mono font-bold text-orange-600 text-sm">{formatTime(timeLeft)}</span>
            </div>
            <button onClick={() => setShowCart(true)}
              className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white px-3 py-2 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105 active:scale-95">
              🛒
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Контент вкладок */}
      <main className={`pt-20 transition-all duration-300 ${tabTransition ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {/* ===== ВКЛАДКА 1: ГЛАВНАЯ ===== */}
        <AnimatedTabContent tabId="home" activeTab={activeTab}>
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Фоновые элементы */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
              <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
              <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Плавающие эмодзи */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {['🐹', '🌻', '✨', '🥜', '💛', '🐾', '🏠', '❤️'].map((emoji, i) => (
                <div key={i} className="absolute text-4xl animate-float opacity-20"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${15 + (i % 4) * 20}%`,
                    animationDelay: `${i * 0.4}s`,
                    animationDuration: `${3 + i * 0.3}s`
                  }}>
                  {emoji}
                </div>
              ))}
            </div>

            <div className="relative z-10 text-center px-4 animate-hero-content">
              <div className="mb-6">
                <span className="text-8xl md:text-9xl inline-block animate-float">🐹</span>
              </div>
              <h1 className="text-5xl md:text-7xl font-black mb-6">
                <span className="text-gradient">ХомякМаркет</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-4 max-w-2xl mx-auto leading-relaxed">
                Найди своего идеального пушистого друга!
              </p>
              <p className="text-lg text-gray-500 mb-8">
                20 пород • Здоровые малыши • Доставка по всей России
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button onClick={() => switchTab('catalog')}
                  className="btn-primary bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 animate-pulse-glow">
                  🐹 Выбрать хомяка
                </button>
                <button onClick={() => switchTab('breeds')}
                  className="btn-primary bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-orange-300 hover:border-orange-500 hover:shadow-xl transition-all hover:scale-105">
                  📖 О породах
                </button>
              </div>

              {/* Статистика */}
              <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
                {[
                  { num: '500+', label: 'Клиентов' },
                  { num: '20', label: 'Пород' },
                  { num: '100%', label: 'Здоровые' },
                ].map((stat, i) => (
                  <div key={i} className="text-center animate-stat-in" style={{ animationDelay: `${0.8 + i * 0.2}s` }}>
                    <p className="text-3xl font-black text-orange-600">{stat.num}</p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Скролл индикатор */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <div className="w-8 h-12 border-2 border-orange-400 rounded-full flex items-start justify-center p-2">
                <div className="w-2 h-3 bg-orange-400 rounded-full animate-float"></div>
              </div>
            </div>
          </section>

          {/* Преимущества на главной */}
          <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-black text-center mb-16 text-gradient">Почему выбирают нас?</h2>
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  { icon: '🏥', title: 'Здоровье', desc: 'Все хомяки проверены ветеринаром' },
                  { icon: '📦', title: 'Доставка', desc: 'Бережная доставка по всей России' },
                  { icon: '📋', title: 'Документы', desc: 'Паспорт и родословная' },
                  { icon: '💬', title: 'Поддержка', desc: 'Консультации 24/7' },
                ].map((item, i) => (
                  <div key={i} className="card-hover bg-white rounded-2xl p-6 text-center shadow-lg animate-advantage-in"
                    style={{ animationDelay: `${i * 0.15}s` }}>
                    <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{item.icon}</div>
                    <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="py-20 px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="absolute text-4xl animate-float"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}>🐹</div>
                ))}
              </div>
              <div className="relative z-10">
                <h2 className="text-4xl font-black text-white mb-4">Готовы завести друга?</h2>
                <p className="text-white/90 text-lg mb-8">Перейдите в каталог и выберите своего пушистого друга!</p>
                <button onClick={() => switchTab('catalog')}
                  className="btn-primary bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                  🐹 Перейти в каталог
                </button>
              </div>
            </div>
          </section>
        </AnimatedTabContent>

        {/* ===== ВКЛАДКА 2: КАТАЛОГ ===== */}
        <AnimatedTabContent tabId="catalog" activeTab={activeTab}>
          <section className="py-10 px-4 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-10 animate-catalog-header">
                <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Наши хомяки</h2>
                <p className="text-gray-600 text-lg">Выберите своего пушистого друга из 20 пород</p>
              </div>

              {/* Фильтры */}
              <div className="flex flex-wrap gap-4 justify-center mb-8 animate-catalog-filters">
                <input
                  type="text"
                  placeholder="🔍 Поиск..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-4 pr-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all w-56 hover:shadow-md focus:shadow-lg"
                />
                <select value={sortBy} onChange={e => setSortBy(e.target.value as any)}
                  className="px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all hover:shadow-md bg-white cursor-pointer">
                  <option value="name">По имени</option>
                  <option value="price">По цене</option>
                  <option value="breed">По породе</option>
                </select>
                <select value={filterAvailable} onChange={e => setFilterAvailable(e.target.value as any)}
                  className="px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all hover:shadow-md bg-white cursor-pointer">
                  <option value="all">Все</option>
                  <option value="available">В наличии</option>
                  <option value="unavailable">Нет в наличии</option>
                </select>
              </div>

              {/* Таймер */}
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-2xl shadow-lg px-6 py-3 flex items-center gap-3 animate-pulse-glow">
                  <span className="text-2xl animate-spin-slow">⏰</span>
                  <div>
                    <p className="text-xs text-gray-500">Наличие обновится через</p>
                    <p className="font-mono font-bold text-xl text-orange-600">{formatTime(timeLeft)}</p>
                  </div>
                </div>
              </div>

              {/* Карточки */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredHamsters.map((hamster, index) => (
                  <div key={hamster.id}
                    className="card-hover bg-white rounded-2xl overflow-hidden shadow-lg animate-catalog-card"
                    style={{ animationDelay: `${index * 0.08}s` }}>
                    <div className="relative overflow-hidden h-56 cursor-pointer" onClick={() => setSelectedHamster(hamster)}>
                      <img src={hamster.image} alt={hamster.name} className="w-full h-full object-cover card-image" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                        <span className="text-white font-medium">Подробнее →</span>
                      </div>
                      <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold availability-transition ${hamster.available ? 'status-available' : 'status-unavailable'}`}>
                        {hamster.available ? `✓ ${hamster.quantity}` : '✕ Нет'}
                      </div>
                      <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                        {hamster.breed.split(' ')[0]}
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-bold text-lg text-gray-800">{hamster.name}</h3>
                        <span className="text-sm">{hamster.gender === 'Мальчик' ? '♂️' : '♀️'}</span>
                      </div>
                      <p className="text-sm text-amber-700 font-medium mb-2">{hamster.breed}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {hamster.traits.slice(0, 2).map((trait, i) => (
                          <span key={i} className="px-2 py-0.5 bg-orange-50 text-orange-600 rounded-full text-xs">{trait}</span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-black text-orange-600">{hamster.price} ₽</span>
                        {hamster.available ? (
                          <button onClick={() => addToCart(hamster.id)}
                            className="btn-primary bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all hover:scale-105 active:scale-95">
                            В корзину
                          </button>
                        ) : (
                          <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-xl text-sm font-medium">Нет</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredHamsters.length === 0 && (
                <div className="text-center py-20 animate-fade-in-up">
                  <p className="text-6xl mb-4">🔍</p>
                  <p className="text-xl text-gray-500">Хомяки не найдены</p>
                </div>
              )}
            </div>
          </section>
        </AnimatedTabContent>

        {/* ===== ВКЛАДКА 3: О ПОРОДАХ ===== */}
        <AnimatedTabContent tabId="breeds" activeTab={activeTab}>
          <section className="py-10 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-breeds-header">
                <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">О породах хомяков</h2>
                <p className="text-gray-600 text-lg">Узнайте больше о каждой породе перед выбором</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {breedInfo.map((breed, i) => (
                  <div key={i} className="breed-card bg-white rounded-3xl overflow-hidden shadow-xl animate-breed-card"
                    style={{ animationDelay: `${i * 0.2}s` }}>
                    <div className="relative h-48 overflow-hidden">
                      <img src={breed.image} alt={breed.name} className="w-full h-full object-cover breed-card-image" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <h3 className="text-2xl font-black text-white">{breed.name}</h3>
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-600 mb-4">{breed.description}</p>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-orange-50 rounded-xl p-3">
                          <p className="text-xs text-gray-500">Размер</p>
                          <p className="font-bold text-sm text-gray-800">{breed.size}</p>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-3">
                          <p className="text-xs text-gray-500">Продолжительность</p>
                          <p className="font-bold text-sm text-gray-800">{breed.lifespan}</p>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-3">
                          <p className="text-xs text-gray-500">Окрас</p>
                          <p className="font-bold text-sm text-gray-800">{breed.color}</p>
                        </div>
                        <div className="bg-orange-50 rounded-xl p-3">
                          <p className="text-xs text-gray-500">Характер</p>
                          <p className="font-bold text-sm text-gray-800">{breed.character}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </AnimatedTabContent>

        {/* ===== ВКЛАДКА 4: КАК КУПИТЬ ===== */}
        <AnimatedTabContent tabId="buying" activeTab={activeTab}>
          <section className="py-10 px-4 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 animate-buying-header">
                <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Как купить хомяка</h2>
                <p className="text-gray-600 text-lg">Простой процесс в 5 шагов</p>
              </div>

              <div className="relative">
                {/* Линия прогресса */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-300 to-amber-300 hidden md:block"></div>

                {[
                  { step: 1, icon: '🔍', title: 'Выберите хомяка', desc: 'Изучите каталог и выберите понравившегося хомяка. Обратите внимание на породу, возраст и характер.' },
                  { step: 2, icon: '🛒', title: 'Добавьте в корзину', desc: 'Нажмите кнопку "В корзину" на карточке выбранного хомяка. Можно добавить несколько.' },
                  { step: 3, icon: '📋', title: 'Оформите заказ', desc: 'Перейдите в корзину и заполните данные для доставки. Укажите адрес и контактные данные.' },
                  { step: 4, icon: '💳', title: 'Оплатите', desc: 'Выберите удобный способ оплаты: карта, наличные при получении или онлайн-перевод.' },
                  { step: 5, icon: '🎉', title: 'Получите малыша!', desc: 'Мы бережно доставим хомяка в специальной переноске с инструкцией по уходу.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 mb-8 animate-buying-step" style={{ animationDelay: `${i * 0.2}s` }}>
                    <div className="flex-shrink-0 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-2xl shadow-lg animate-step-pulse"
                        style={{ animationDelay: `${i * 0.3}s` }}>
                        {item.icon}
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-lg flex-1 card-hover">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-bold text-orange-500 bg-orange-100 px-3 py-1 rounded-full">Шаг {item.step}</span>
                        <h3 className="text-xl font-bold text-gray-800">{item.title}</h3>
                      </div>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Доп информация */}
              <div className="mt-12 bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl p-8 animate-buying-extra">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">📦 Что входит в стоимость</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { icon: '🐹', text: 'Здоровый хомяк с паспортом' },
                    { icon: '📋', text: 'Инструкция по уходу' },
                    { icon: '🥜', text: 'Стартовый набор корма' },
                    { icon: '🏠', text: 'Временная переноска' },
                    { icon: '🏥', text: 'Ветеринарный осмотр' },
                    { icon: '💬', text: 'Поддержка 30 дней' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm font-medium text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center mt-8">
                <button onClick={() => switchTab('catalog')}
                  className="btn-primary bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                  🐹 Перейти к выбору
                </button>
              </div>
            </div>
          </section>
        </AnimatedTabContent>

        {/* ===== ВКЛАДКА 5: ОТЗЫВЫ ===== */}
        <AnimatedTabContent tabId="reviews" activeTab={activeTab}>
          <section className="py-10 px-4 min-h-screen">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12 animate-reviews-header">
                <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Отзывы клиентов</h2>
                <p className="text-gray-600 text-lg">Что говорят наши покупатели о своих питомцах</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { name: 'Анна К.', city: 'Москва', text: 'Купили сирийского хомячка Зефира! Он такой милый и ручной. Дети в восторге, не отходят от клетки!', rating: 5, hamster: 'Зефир', date: '2 недели назад' },
                  { name: 'Михаил П.', city: 'Санкт-Петербург', text: 'Отличный магазин! Хомяк здоровый, активный. Консультанты помогли с выбором клетки и корма.', rating: 5, hamster: 'Каштан', date: '1 месяц назад' },
                  { name: 'Елена С.', city: 'Казань', text: 'Уже второй хомяк из этого магазина. Качество на высоте, рекомендую всем любителям пушистиков!', rating: 5, hamster: 'Облачко', date: '3 недели назад' },
                  { name: 'Дмитрий В.', city: 'Новосибирск', text: 'Заказывал Роборовского — крошечный и невероятно быстрый! Доставка была очень бережной.', rating: 5, hamster: 'Песок', date: '1 неделю назад' },
                  { name: 'Ольга М.', city: 'Екатеринбург', text: 'Тедди-бэр — это чудо! Такой пушистый, как настоящая игрушка. Спасибо за замечательного питомца!', rating: 5, hamster: 'Тедди', date: '2 месяца назад' },
                  { name: 'Сергей Л.', city: 'Краснодар', text: 'Джунгарский хомяк очень активный и забавный. Наблюдать за ним — одно удовольствие!', rating: 4, hamster: 'Полосатик', date: '1 месяц назад' },
                  { name: 'Наталья Р.', city: 'Самара', text: 'Кремовый хомяк — самый ласковый! Дети засыпают, держа его на руках. Очень рекомендую!', rating: 5, hamster: 'Карамель', date: '3 дня назад' },
                  { name: 'Алексей Д.', city: 'Ростов-на-Дону', text: 'Китайский хомяк — это что-то! С хвостом, грациозный как маленькая мышка. Редкая порода!', rating: 5, hamster: 'Хвостик', date: '2 недели назад' },
                  { name: 'Марина Т.', city: 'Воронеж', text: 'Пегий сирийский — каждый рисунок уникален! Наш Пончик — настоящий красавец.', rating: 5, hamster: 'Пончик', date: '1 месяц назад' },
                ].map((review, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-lg card-hover animate-review-card"
                    style={{ animationDelay: `${i * 0.1}s` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-300 to-amber-300 rounded-full flex items-center justify-center text-xl font-bold text-white">
                        {review.name[0]}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{review.name}</p>
                        <p className="text-xs text-gray-500">{review.city} • {review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <span key={j} className={`text-lg ${j < review.rating ? 'text-yellow-400' : 'text-gray-200'}`}>⭐</span>
                      ))}
                    </div>
                    <p className="text-gray-600 mb-3 italic">"{review.text}"</p>
                    <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Купил:</span>
                      <span className="text-sm font-medium text-orange-600">{review.hamster}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Средний рейтинг */}
              <div className="mt-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-8 text-center text-white animate-reviews-summary">
                <p className="text-5xl font-black mb-2">4.9</p>
                <div className="flex justify-center gap-1 mb-2">
                  {[1,2,3,4,5].map(i => <span key={i} className="text-2xl">⭐</span>)}
                </div>
                <p className="text-white/80">На основе 500+ отзывов</p>
              </div>
            </div>
          </section>
        </AnimatedTabContent>

        {/* ===== ВКЛАДКА 6: КОНТАКТЫ ===== */}
        <AnimatedTabContent tabId="contacts" activeTab={activeTab}>
          <section className="py-10 px-4 min-h-screen">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12 animate-contacts-header">
                <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Контакты</h2>
                <p className="text-gray-600 text-lg">Свяжитесь с нами любым удобным способом</p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Контактная информация */}
                <div className="space-y-6">
                  {[
                    { icon: '📞', title: 'Телефон', value: '+7 (900) 123-45-67', sub: 'Ежедневно с 10:00 до 20:00', color: 'from-green-400 to-emerald-400' },
                    { icon: '📧', title: 'Email', value: 'info@homyakmarket.ru', sub: 'Ответим в течение 2 часов', color: 'from-blue-400 to-cyan-400' },
                    { icon: '📍', title: 'Адрес', value: 'г. Москва, ул. Пушкина, 10', sub: 'Метро Чистые пруды', color: 'from-red-400 to-pink-400' },
                    { icon: '💬', title: 'Мессенджеры', value: 'WhatsApp, Telegram', sub: '@homyakmarket', color: 'from-purple-400 to-violet-400' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white rounded-2xl p-5 shadow-lg card-hover animate-contact-item"
                      style={{ animationDelay: `${i * 0.15}s` }}>
                      <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center text-2xl shadow-md flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.title}</p>
                        <p className="font-bold text-gray-800">{item.value}</p>
                        <p className="text-xs text-gray-400">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Форма обратной связи */}
                <div className="bg-white rounded-3xl p-8 shadow-xl animate-contact-form">
                  <h3 className="text-2xl font-bold text-gray-800 mb-6">Напишите нам</h3>
                  <div className="space-y-4">
                    <input type="text" placeholder="Ваше имя"
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all hover:shadow-md focus:shadow-lg" />
                    <input type="tel" placeholder="Телефон"
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all hover:shadow-md focus:shadow-lg" />
                    <input type="email" placeholder="Email"
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all hover:shadow-md focus:shadow-lg" />
                    <textarea placeholder="Ваш вопрос..." rows={4}
                      className="w-full px-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all hover:shadow-md focus:shadow-lg resize-none"></textarea>
                    <button className="btn-primary w-full bg-gradient-to-r from-orange-500 to-amber-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all hover:scale-[1.02]">
                      📨 Отправить
                    </button>
                  </div>
                </div>
              </div>

              {/* Режим работы */}
              <div className="bg-gradient-to-r from-orange-100 to-amber-100 rounded-3xl p-8 animate-contacts-schedule">
                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">🕐 Режим работы</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { day: 'Пн-Пт', time: '10:00 - 20:00', status: 'open' },
                    { day: 'Суббота', time: '10:00 - 18:00', status: 'open' },
                    { day: 'Воскресенье', time: '11:00 - 17:00', status: 'open' },
                    { day: 'Праздники', time: '12:00 - 16:00', status: 'limited' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white rounded-xl p-4 text-center shadow-sm">
                      <p className="font-bold text-gray-800 mb-1">{item.day}</p>
                      <p className="text-sm text-gray-600">{item.time}</p>
                      <span className={`inline-block mt-2 px-2 py-0.5 rounded-full text-xs font-medium ${item.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {item.status === 'open' ? 'Открыто' : 'Сокращённо'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Соцсети */}
              <div className="mt-8 text-center animate-contacts-social">
                <p className="text-gray-600 mb-4">Мы в социальных сетях:</p>
                <div className="flex justify-center gap-4">
                  {['📱 VK', '📸 Instagram', '▶️ YouTube', '✈️ Telegram'].map((social, i) => (
                    <button key={i} className="bg-white px-4 py-2 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 hover:-translate-y-1 text-sm font-medium text-gray-700">
                      {social}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </AnimatedTabContent>
      </main>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🐹</span>
              <span className="font-bold">ХомякМаркет</span>
            </div>
            <p className="text-gray-400 text-sm text-center">© 2024 ХомякМаркет. Все права защищены. Сделано с ❤️ к хомякам</p>
            <div className="flex gap-4 text-gray-400 text-sm">
              <span className="hover:text-orange-400 cursor-pointer transition-colors">Политика</span>
              <span className="hover:text-orange-400 cursor-pointer transition-colors">Условия</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
