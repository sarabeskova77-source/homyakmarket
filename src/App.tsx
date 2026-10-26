import { useState, useEffect, useRef } from 'react';

// Изображения хомяков
const hamsterImages = [
  'https://image.qwenlm.ai/generated-images/c7cf43c3-ced5-4b39-a864-f7c06d51799c/_result.png',
  'https://image.qwenlm.ai/generated-images/1a95fb3a-fd8f-4352-9d70-beb7b9c83523/_result.png',
  'https://image.qwenlm.ai/generated-images/59c4ba1e-688a-4108-9d14-b17fbd8ac1e1/_result.png',
  'https://image.qwenlm.ai/generated-images/fff75f4a-7fc2-427c-a28a-1ede5805c76c/_result.png',
  'https://image.qwenlm.ai/generated-images/234a3266-fc26-4332-ad68-b2479fc41e5e/_result.png',
  'https://image.qwenlm.ai/generated-images/f6871cbe-81a2-4290-830b-f6356e216c7f/_result.png',
  'https://image.qwenlm.ai/generated-images/8c9fd646-aef9-4122-96f2-58deec7fc178/_result.png',
  'https://image.qwenlm.ai/generated-images/451b21e0-a5ac-4009-8330-abd9533211ff/_result.png',
  'https://image.qwenlm.ai/generated-images/b3865e2e-585b-4007-a2b9-0b27025820c4/_result.png',
  'https://image.qwenlm.ai/generated-images/7cdccee5-fcaf-4901-b13b-124edc66e493/_result.png',
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
}

const initialHamsters: Hamster[] = [
  { id: 1, name: 'Зефир', breed: 'Сирийский золотистый', description: 'Классический золотистый сирийский хомяк с мягкой плюшевой шубкой. Очень дружелюбный и ручной.', price: 1500, age: '2 месяца', gender: 'Мальчик', image: hamsterImages[0], available: true, quantity: 3 },
  { id: 2, name: 'Снежок', breed: 'Джунгарский белый', description: 'Белоснежный джунгарский хомяк с чёрными глазами-бусинками. Компактный и очень милый.', price: 1200, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[1], available: true, quantity: 5 },
  { id: 3, name: 'Облачко', breed: 'Тедди-бэр белый', description: 'Длинношёрстный белый хомяк, похожий на маленького плюшевого мишку. Невероятно мягкий!', price: 2000, age: '2 месяца', gender: 'Девочка', image: hamsterImages[2], available: true, quantity: 2 },
  { id: 4, name: 'Песок', breed: 'Роборовского', description: 'Самый маленький хомяк в мире! Песочного цвета с белым брюшком. Шустрый и любопытный.', price: 1800, age: '2.5 месяца', gender: 'Мальчик', image: hamsterImages[3], available: true, quantity: 4 },
  { id: 5, name: 'Каштан', breed: 'Кэмпбелла агутти', description: 'Красивый хомяк Кэмпбелла с природным окрасом агутти. Спокойный характер.', price: 1300, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[4], available: true, quantity: 3 },
  { id: 6, name: 'Хвостик', breed: 'Китайский хомяк', description: 'Уникальный хомяк с длинным хвостом! Стройное тело и грациозные движения.', price: 2200, age: '4 месяца', gender: 'Девочка', image: hamsterImages[5], available: true, quantity: 2 },
  { id: 7, name: 'Пончик', breed: 'Сирийский пегий', description: 'Яркий пятнистый сирийский хомяк с чёрно-белым окрасом. Каждый узор уникален!', price: 1700, age: '2 месяца', gender: 'Мальчик', image: hamsterImages[6], available: true, quantity: 3 },
  { id: 8, name: 'Бархат', breed: 'Сирийский сатиновый', description: 'Блестящая шёлковая шерсть шоколадного цвета. Переливается на свету!', price: 2500, age: '3 месяца', gender: 'Девочка', image: hamsterImages[7], available: true, quantity: 1 },
  { id: 9, name: 'Карамель', breed: 'Сирийский кремовый', description: 'Нежный кремовый окрас, как карамелька. Очень ласковый и спокойный.', price: 1600, age: '2.5 месяца', gender: 'Девочка', image: hamsterImages[8], available: true, quantity: 4 },
  { id: 10, name: 'Полосатик', breed: 'Джунгарский полосатый', description: 'Классический джунгарик с тёмной полоской на спине. Активный и игривый.', price: 1100, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[9], available: true, quantity: 6 },
  { id: 11, name: 'Луна', breed: 'Сирийский чёрный', description: 'Редкий полностью чёрный сирийский хомяк. Загадочный и элегантный.', price: 2800, age: '2 месяца', gender: 'Девочка', image: hamsterImages[0], available: true, quantity: 1 },
  { id: 12, name: 'Ириска', breed: 'Джунгарский жемчужный', description: 'Серо-голубой окрас с жемчужным отливом. Очень редкая расцветка!', price: 2100, age: '3 месяца', gender: 'Девочка', image: hamsterImages[1], available: true, quantity: 2 },
  { id: 13, name: 'Тедди', breed: 'Тедди-бэр коричневый', description: 'Коричневый длинношёрстный хомяк. Выглядит как настоящий плюшевый мишка!', price: 2300, age: '2 месяца', gender: 'Мальчик', image: hamsterImages[2], available: true, quantity: 2 },
  { id: 14, name: 'Малыш', breed: 'Роборовского белый', description: 'Белоснежный карликовый хомяк Роборовского. Самый крошечный и быстрый!', price: 2000, age: '2.5 месяца', gender: 'Мальчик', image: hamsterImages[3], available: true, quantity: 3 },
  { id: 15, name: 'Шоколад', breed: 'Кэмпбелла коричневый', description: 'Тёмно-коричневый хомяк Кэмпбелла. Глубокий насыщенный окрас.', price: 1400, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[4], available: true, quantity: 4 },
  { id: 16, name: 'Соня', breed: 'Сирийский ван-окрас', description: 'Белый хомяк с цветным пятном на голове. Очень редкий и красивый окрас!', price: 3000, age: '2 месяца', gender: 'Девочка', image: hamsterImages[6], available: true, quantity: 1 },
  { id: 17, name: 'Бублик', breed: 'Сирийский рекс', description: 'Хомяк с кудрявой шерстью! Уникальная текстура меха.', price: 2600, age: '3 месяца', gender: 'Мальчик', image: hamsterImages[7], available: true, quantity: 2 },
  { id: 18, name: 'Персик', breed: 'Сирийский персиковый', description: 'Тёплый персиковый окрас, как спелый фрукт. Нежный и ласковый.', price: 1800, age: '2.5 месяца', gender: 'Девочка', image: hamsterImages[8], available: true, quantity: 3 },
  { id: 19, name: 'Дымка', breed: 'Джунгарский сизый', description: 'Голубовато-серый окрас с дымчатым отливом. Красивый и необычный.', price: 1500, age: '3 месяца', gender: 'Девочка', image: hamsterImages[9], available: true, quantity: 4 },
  { id: 20, name: 'Булочка', breed: 'Сирийский палевый', description: 'Светло-палевый окрас, как свежеиспечённая булочка. Очень мягкий характер.', price: 1400, age: '2 месяца', gender: 'Девочка', image: hamsterImages[0], available: true, quantity: 5 },
];

function App() {
  const [hamsters, setHamsters] = useState<Hamster[]>(initialHamsters);
  const [cart, setCart] = useState<number[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());
  const [heroVisible, setHeroVisible] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedHamster, setSelectedHamster] = useState<Hamster | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'breed'>('name');
  const [filterAvailable, setFilterAvailable] = useState<'all' | 'available' | 'unavailable'>('all');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    }, 120000); // 2 минуты

    return () => clearInterval(interval);
  }, []);

  // Таймер обратного отсчёта
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 120));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Hero анимация
  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 300);
  }, []);

  // Intersection Observer для анимации карточек
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = Number(entry.target.getAttribute('data-id'));
            setVisibleCards(prev => new Set([...prev, id]));
          }
        });
      },
      { threshold: 0.1 }
    );

    cardRefs.current.forEach(ref => {
      if (ref) observerRef.current?.observe(ref);
    });

    return () => observerRef.current?.disconnect();
  }, [hamsters]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      {/* Уведомление */}
      {notification && (
        <div className="fixed top-4 right-4 z-50 animate-bounce-in">
          <div className="bg-white rounded-xl shadow-2xl px-6 py-4 border-l-4 border-orange-500 flex items-center gap-3">
            <span className="text-lg font-medium text-gray-800">{notification}</span>
          </div>
        </div>
      )}

      {/* Модальное окно */}
      {selectedHamster && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-scale-in"
          onClick={() => setSelectedHamster(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="relative">
              <img src={selectedHamster.image} alt={selectedHamster.name}
                className="w-full h-72 object-cover rounded-t-3xl" />
              <button onClick={() => setSelectedHamster(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-all hover:scale-110 hover:rotate-90 duration-300">
                ✕
              </button>
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-3xl font-bold text-gray-800">{selectedHamster.name}</h2>
                <span className={`px-3 py-1 rounded-full text-white text-sm font-medium ${selectedHamster.available ? 'status-available' : 'status-unavailable'}`}>
                  {selectedHamster.available ? `В наличии (${selectedHamster.quantity})` : 'Нет в наличии'}
                </span>
              </div>
              <p className="text-lg text-amber-700 font-semibold mb-2">{selectedHamster.breed}</p>
              <p className="text-gray-600 mb-6 leading-relaxed">{selectedHamster.description}</p>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-scale-in"
          onClick={() => setShowCart(false)}>
          <div className="bg-white rounded-3xl max-w-lg w-full max-h-[80vh] overflow-y-auto shadow-2xl p-8"
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
                    <div key={index} className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl mb-3 animate-fade-in-left"
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
          <div className="flex items-center gap-2">
            <span className="text-3xl animate-wiggle">🐹</span>
            <span className="text-xl font-bold text-gradient">ХомякМаркет</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2">
              <span className="text-sm text-gray-600">Обновление через:</span>
              <span className="font-mono font-bold text-orange-600">{formatTime(timeLeft)}</span>
            </div>
            <button onClick={() => setShowCart(true)}
              className="relative bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-full font-medium hover:shadow-lg transition-all hover:scale-105 active:scale-95">
              🛒 Корзина
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-bounce-in">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero секция */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Фоновые элементы */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Плавающие эмодзи */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {['🐹', '🌻', '✨', '🥜', '💛', '🐾'].map((emoji, i) => (
            <div key={i} className="absolute text-4xl animate-float opacity-30"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}>
              {emoji}
            </div>
          ))}
        </div>

        <div className={`relative z-10 text-center px-4 transition-all duration-1000 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
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
            <a href="#catalog"
              className="btn-primary bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 animate-pulse-glow">
              🐹 Выбрать хомяка
            </a>
            <a href="#about"
              className="btn-primary bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg border-2 border-orange-300 hover:border-orange-500 hover:shadow-xl transition-all hover:scale-105">
              ℹ️ О нас
            </a>
          </div>

          {/* Статистика */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
            {[
              { num: '500+', label: 'Довольных клиентов' },
              { num: '20', label: 'Пород хомяков' },
              { num: '100%', label: 'Здоровые малыши' },
            ].map((stat, i) => (
              <div key={i} className={`text-center transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${0.5 + i * 0.2}s` }}>
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

      {/* Преимущества */}
      <section id="about" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 text-gradient">Почему выбирают нас?</h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: '🏥', title: 'Здоровье', desc: 'Все хомяки проверены ветеринаром' },
              { icon: '📦', title: 'Доставка', desc: 'Бережная доставка по всей России' },
              { icon: '📋', title: 'Документы', desc: 'Паспорт и родословная' },
              { icon: '💬', title: 'Поддержка', desc: 'Консультации 24/7' },
            ].map((item, i) => (
              <div key={i} className={`card-hover bg-white rounded-2xl p-6 text-center shadow-lg opacity-0 ${visibleCards.has(100 + i) ? 'animate-fade-in-up' : ''}`}
                ref={el => { cardRefs.current[100 + i] = el; }}
                data-id={100 + i}
                style={{ animationDelay: `${i * 0.15}s` }}>
                <div className="text-5xl mb-4 animate-float" style={{ animationDelay: `${i * 0.3}s` }}>{item.icon}</div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Каталог */}
      <section id="catalog" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-gradient mb-4">Наши хомяки</h2>
            <p className="text-gray-600 text-lg">Выберите своего пушистого друга из 20 пород</p>
          </div>

          {/* Фильтры */}
          <div className="flex flex-wrap gap-4 justify-center mb-10 animate-fade-in-up">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 Поиск по имени или породе..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-3 rounded-xl border-2 border-orange-200 focus:border-orange-500 focus:outline-none transition-all w-64 hover:shadow-md focus:shadow-lg"
              />
            </div>
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

          {/* Таймер обновления */}
          <div className="flex justify-center mb-8">
            <div className="bg-white rounded-2xl shadow-lg px-6 py-3 flex items-center gap-3 animate-pulse-glow">
              <span className="text-2xl animate-spin-slow">⏰</span>
              <div>
                <p className="text-xs text-gray-500">Наличие обновится через</p>
                <p className="font-mono font-bold text-xl text-orange-600">{formatTime(timeLeft)}</p>
              </div>
            </div>
          </div>

          {/* Карточки хомяков */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredHamsters.map((hamster, index) => (
              <div
                key={hamster.id}
                ref={el => { cardRefs.current[hamster.id] = el; }}
                data-id={hamster.id}
                className={`card-hover bg-white rounded-2xl overflow-hidden shadow-lg opacity-0 ${visibleCards.has(hamster.id) ? 'animate-slide-up-fade' : ''}`}
                style={{ animationDelay: `${(index % 8) * 0.1}s` }}
              >
                {/* Изображение */}
                <div className="relative overflow-hidden h-56 cursor-pointer" onClick={() => setSelectedHamster(hamster)}>
                  <img
                    src={hamster.image}
                    alt={hamster.name}
                    className="w-full h-full object-cover card-image"
                  />
                  {/* Overlay при hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-white font-medium">Подробнее →</span>
                  </div>
                  {/* Бейдж наличия */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-white text-xs font-bold availability-transition ${hamster.available ? 'status-available' : 'status-unavailable'}`}>
                    {hamster.available ? `✓ ${hamster.quantity} шт.` : '✕ Нет'}
                  </div>
                  {/* Бейдж породы */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700">
                    {hamster.breed.split(' ')[0]}
                  </div>
                </div>

                {/* Информация */}
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{hamster.name}</h3>
                    <span className="text-sm text-gray-500">{hamster.gender === 'Мальчик' ? '♂️' : '♀️'}</span>
                  </div>
                  <p className="text-sm text-amber-700 font-medium mb-2">{hamster.breed}</p>
                  <p className="text-xs text-gray-500 mb-3 line-clamp-2">{hamster.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-black text-orange-600">{hamster.price} ₽</span>
                    {hamster.available ? (
                      <button
                        onClick={() => addToCart(hamster.id)}
                        className="btn-primary bg-gradient-to-r from-orange-500 to-amber-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:shadow-lg transition-all hover:scale-105 active:scale-95"
                      >
                        В корзину
                      </button>
                    ) : (
                      <span className="px-4 py-2 bg-gray-100 text-gray-400 rounded-xl text-sm font-medium">
                        Нет в наличии
                      </span>
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
              <p className="text-gray-400">Попробуйте изменить параметры поиска</p>
            </div>
          )}
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-20 px-4 bg-gradient-to-r from-orange-100 to-amber-100">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-16 text-gradient">Отзывы наших клиентов</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: 'Анна К.', text: 'Купили сирийского хомячка Зефира! Он такой милый и ручной. Дети в восторге!', rating: 5 },
              { name: 'Михаил П.', text: 'Отличный магазин! Хомяк здоровый, активный. Консультанты помогли с выбором клетки.', rating: 5 },
              { name: 'Елена С.', text: 'Уже второй хомяк из этого магазина. Качество на высоте, рекомендую всем!', rating: 5 },
            ].map((review, i) => (
              <div key={i} className={`bg-white rounded-2xl p-6 shadow-lg card-hover opacity-0 ${visibleCards.has(200 + i) ? 'animate-fade-in-up' : ''}`}
                ref={el => { cardRefs.current[200 + i] = el; }}
                data-id={200 + i}
                style={{ animationDelay: `${i * 0.2}s` }}>
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: review.rating }).map((_, j) => (
                    <span key={j} className="text-yellow-400 text-xl animate-bounce-in" style={{ animationDelay: `${j * 0.1}s` }}>⭐</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{review.text}"</p>
                <p className="font-bold text-gray-800">— {review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA секция */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-orange-500 to-amber-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="absolute text-4xl animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}>🐹</div>
            ))}
          </div>
          <div className="relative z-10">
            <h2 className="text-4xl font-black text-white mb-4">Готовы завести друга?</h2>
            <p className="text-white/90 text-lg mb-8">Звоните нам или приезжайте в магазин — наши хомяки ждут вас!</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="tel:+79001234567" className="btn-primary bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105">
                📞 +7 (900) 123-45-67
              </a>
              <a href="#catalog" className="btn-primary bg-orange-700 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl transition-all hover:scale-105 border-2 border-white/30">
                🐹 Каталог
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl animate-wiggle">🐹</span>
                <span className="text-xl font-bold">ХомякМаркет</span>
              </div>
              <p className="text-gray-400 text-sm">Лучший магазин хомяков в России. Здоровые малыши от проверенных заводчиков.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-orange-400 transition-colors cursor-pointer">Сирийские хомяки</li>
                <li className="hover:text-orange-400 transition-colors cursor-pointer">Джунгарские хомяки</li>
                <li className="hover:text-orange-400 transition-colors cursor-pointer">Карликовые хомяки</li>
                <li className="hover:text-orange-400 transition-colors cursor-pointer">Редкие породы</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li className="hover:text-orange-400 transition-colors cursor-pointer">О компании</li>
                <li className="hover:text-orange-400 transition-colors cursor-pointer">Доставка</li>
                <li className="hover:text-orange-400 transition-colors cursor-pointer">Гарантии</li>
                <li className="hover:text-orange-400 transition-colors cursor-pointer">Контакты</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Контакты</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>📞 +7 (900) 123-45-67</li>
                <li>📧 info@homyakmarket.ru</li>
                <li>📍 Москва, ул. Пушкина, 10</li>
                <li>🕐 Пн-Вс: 10:00 - 20:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 ХомякМаркет. Все права защищены. Сделано с ❤️ к хомякам</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
