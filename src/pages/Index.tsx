import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [userTokens, setUserTokens] = useState(500);

  const cars = [
    { id: 1, name: 'Speedster X1', status: 'available', tokens: 100, speed: 85, control: 90 },
    { id: 2, name: 'Turbo Racer', status: 'busy', tokens: 150, speed: 95, control: 80 },
    { id: 3, name: 'Drift Master', status: 'available', tokens: 120, speed: 80, control: 95 },
  ];

  const achievements = [
    { id: 1, name: 'Первый заезд', description: 'Завершите первую гонку', progress: 100, icon: 'Flag' },
    { id: 2, name: 'Коллекционер', description: 'Протестируйте все машинки', progress: 66, icon: 'Car' },
    { id: 3, name: 'Мастер дрифта', description: 'Проедьте 10 поворотов', progress: 40, icon: 'Zap' },
    { id: 4, name: 'Марафонец', description: 'Наездите 1000 метров', progress: 75, icon: 'Trophy' },
  ];

  const timeSlots = [
    { time: '10:00', available: true },
    { time: '11:00', available: false },
    { time: '12:00', available: true },
    { time: '13:00', available: true },
    { time: '14:00', available: false },
    { time: '15:00', available: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      <nav className="border-b border-border backdrop-blur-sm bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Icon name="Gamepad2" className="text-primary" size={32} />
              <h1 className="text-2xl font-bold neon-text">ROBORACE</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <button onClick={() => setActiveSection('home')} className="hover:text-primary transition-colors">Главная</button>
              <button onClick={() => setActiveSection('garage')} className="hover:text-primary transition-colors">Гараж</button>
              <button onClick={() => setActiveSection('stream')} className="hover:text-primary transition-colors">Трансляция</button>
              <button onClick={() => setActiveSection('achievements')} className="hover:text-primary transition-colors">Достижения</button>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-accent/20 border-accent text-accent font-bold px-4 py-2">
                <Icon name="Coins" size={16} className="mr-2" />
                {userTokens} токенов
              </Badge>
              <Avatar className="border-2 border-primary">
                <AvatarFallback className="bg-primary/20 text-primary font-bold">РГ</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <div className="space-y-8 animate-fade-in">
            <div className="relative h-[500px] rounded-lg overflow-hidden neon-glow">
              <img 
                src="https://cdn.poehali.dev/projects/b61925f7-387d-4fe3-a3ba-1915fbc10d87/files/3c9a1a1d-3ad3-44eb-9842-da22d2056b0e.jpg" 
                alt="Racing Arena"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="text-5xl font-bold mb-4 neon-text">Управляй машинкой в реальном времени</h2>
                <p className="text-xl text-muted-foreground mb-6">Получи контроль над Arduino-машинкой через прямую трансляцию с камеры</p>
                <div className="flex gap-4">
                  <Button size="lg" className="neon-glow" onClick={() => setActiveSection('garage')}>
                    <Icon name="Rocket" className="mr-2" size={20} />
                    Начать гонку
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => setActiveSection('stream')}>
                    <Icon name="Play" className="mr-2" size={20} />
                    Смотреть трансляцию
                  </Button>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-primary/30 bg-card/50 backdrop-blur hover:scale-105 transition-transform">
                <CardHeader>
                  <Icon name="Car" className="text-primary mb-2" size={40} />
                  <CardTitle>Выбирай машинку</CardTitle>
                  <CardDescription>3 уникальные модели с разными характеристиками</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-secondary/30 bg-card/50 backdrop-blur hover:scale-105 transition-transform">
                <CardHeader>
                  <Icon name="Video" className="text-secondary mb-2" size={40} />
                  <CardTitle>Прямая трансляция</CardTitle>
                  <CardDescription>HD-видео с камеры машинки в реальном времени</CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-accent/30 bg-card/50 backdrop-blur hover:scale-105 transition-transform">
                <CardHeader>
                  <Icon name="Trophy" className="text-accent mb-2" size={40} />
                  <CardTitle>Зарабатывай награды</CardTitle>
                  <CardDescription>Получай достижения и токены за гонки</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'garage' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-2">Гараж машинок</h2>
                <p className="text-muted-foreground">Выбери машинку и забронируй время</p>
              </div>
              <Badge className="bg-primary text-primary-foreground px-4 py-2 text-lg">
                {cars.filter(c => c.status === 'available').length} доступно
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {cars.map((car) => (
                  <Card key={car.id} className={`border-2 ${car.status === 'available' ? 'border-primary/50 neon-glow' : 'border-muted opacity-60'}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-2xl">{car.name}</CardTitle>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant={car.status === 'available' ? 'default' : 'secondary'}>
                              {car.status === 'available' ? '✓ Доступна' : '⏳ Занята'}
                            </Badge>
                            <Badge variant="outline" className="bg-accent/20 border-accent text-accent">
                              {car.tokens} токенов / 10 мин
                            </Badge>
                          </div>
                        </div>
                        <Icon name="Car" className="text-primary" size={48} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Скорость</span>
                            <span className="text-primary">{car.speed}%</span>
                          </div>
                          <Progress value={car.speed} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between mb-1 text-sm">
                            <span>Управляемость</span>
                            <span className="text-secondary">{car.control}%</span>
                          </div>
                          <Progress value={car.control} className="h-2" />
                        </div>
                        <Button 
                          className="w-full mt-4" 
                          disabled={car.status !== 'available' || userTokens < car.tokens}
                        >
                          {car.status === 'available' ? 'Забронировать' : 'Недоступна'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card className="border-primary/30">
                <CardHeader>
                  <CardTitle className="text-2xl">Доступное время</CardTitle>
                  <CardDescription>Выберите удобный слот для гонки</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    {timeSlots.map((slot, index) => (
                      <Button
                        key={index}
                        variant={slot.available ? 'outline' : 'ghost'}
                        className={`h-16 text-lg ${slot.available ? 'border-primary hover:bg-primary/20' : 'opacity-40'}`}
                        disabled={!slot.available}
                      >
                        <Icon name="Clock" className="mr-2" size={20} />
                        {slot.time}
                      </Button>
                    ))}
                  </div>
                  <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                    <h4 className="font-bold mb-2">Ваш баланс</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-accent">{userTokens} токенов</span>
                      <Button variant="outline" size="sm">
                        <Icon name="Plus" className="mr-2" size={16} />
                        Пополнить
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === 'stream' && (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-4xl font-bold mb-2">Прямая трансляция</h2>
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="border-primary/30 neon-glow">
                  <CardContent className="p-0">
                    <div className="aspect-video bg-muted/30 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-pulse-glow" />
                      <div className="relative z-10 text-center space-y-4">
                        <Icon name="Video" className="mx-auto text-primary" size={64} />
                        <div>
                          <p className="text-xl font-bold">Трансляция запустится после бронирования</p>
                          <p className="text-muted-foreground mt-2">Выберите машинку в гараже для начала</p>
                        </div>
                        <Badge className="bg-red-500 animate-pulse">● LIVE</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-4 gap-4 mt-4">
                  <Button size="lg" className="h-20 flex-col gap-2">
                    <Icon name="ArrowUp" size={24} />
                    Вперёд
                  </Button>
                  <Button size="lg" className="h-20 flex-col gap-2">
                    <Icon name="ArrowLeft" size={24} />
                    Влево
                  </Button>
                  <Button size="lg" className="h-20 flex-col gap-2">
                    <Icon name="ArrowRight" size={24} />
                    Вправо
                  </Button>
                  <Button size="lg" className="h-20 flex-col gap-2">
                    <Icon name="ArrowDown" size={24} />
                    Назад
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Статистика заезда</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Время в гонке</span>
                      <span className="text-2xl font-bold text-primary">0:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Пройдено</span>
                      <span className="text-2xl font-bold text-secondary">0 м</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Заработано</span>
                      <span className="text-2xl font-bold text-accent">+0 токенов</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-accent/30">
                  <CardHeader>
                    <CardTitle>Активные гонщики</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                        <Avatar className="border-2 border-primary">
                          <AvatarFallback>А1</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-bold">Алекс</p>
                          <p className="text-sm text-muted-foreground">Speedster X1</p>
                        </div>
                        <Badge className="bg-green-500">● Live</Badge>
                      </div>
                      <div className="flex items-center gap-3 p-2 bg-muted/30 rounded">
                        <Avatar className="border-2 border-secondary">
                          <AvatarFallback>М2</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-bold">Макс</p>
                          <p className="text-sm text-muted-foreground">Turbo Racer</p>
                        </div>
                        <Badge className="bg-green-500">● Live</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'achievements' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-4xl font-bold mb-2">Достижения</h2>
                <p className="text-muted-foreground">Прогресс и награды за гонки</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Завершено</p>
                <p className="text-3xl font-bold text-primary">
                  {achievements.filter(a => a.progress === 100).length}/{achievements.length}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {achievements.map((achievement) => (
                <Card 
                  key={achievement.id} 
                  className={`${achievement.progress === 100 ? 'border-accent/50 neon-glow' : 'border-muted/30'}`}
                >
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${achievement.progress === 100 ? 'bg-accent/20' : 'bg-muted/30'}`}>
                        <Icon 
                          name={achievement.icon as any} 
                          className={achievement.progress === 100 ? 'text-accent' : 'text-muted-foreground'} 
                          size={32} 
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{achievement.name}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                        <div className="mt-4">
                          <div className="flex justify-between mb-2 text-sm">
                            <span>Прогресс</span>
                            <span className={achievement.progress === 100 ? 'text-accent font-bold' : ''}>
                              {achievement.progress}%
                            </span>
                          </div>
                          <Progress value={achievement.progress} className="h-2" />
                        </div>
                      </div>
                      {achievement.progress === 100 && (
                        <Badge className="bg-accent">✓ Получено</Badge>
                      )}
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>

            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-secondary/10">
              <CardHeader>
                <CardTitle className="text-2xl">Бонусы за достижения</CardTitle>
                <CardDescription>Получай токены за каждое достижение</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 bg-background/50 rounded-lg">
                    <Icon name="Award" className="mx-auto text-accent mb-2" size={32} />
                    <p className="text-2xl font-bold">+50</p>
                    <p className="text-sm text-muted-foreground">Бронзовое</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg">
                    <Icon name="Award" className="mx-auto text-primary mb-2" size={32} />
                    <p className="text-2xl font-bold">+100</p>
                    <p className="text-sm text-muted-foreground">Серебряное</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg">
                    <Icon name="Award" className="mx-auto text-accent mb-2" size={32} />
                    <p className="text-2xl font-bold">+200</p>
                    <p className="text-sm text-muted-foreground">Золотое</p>
                  </div>
                  <div className="p-4 bg-background/50 rounded-lg">
                    <Icon name="Crown" className="mx-auto text-secondary mb-2" size={32} />
                    <p className="text-2xl font-bold">+500</p>
                    <p className="text-sm text-muted-foreground">Платиновое</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16 py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 ROBORACE. Управляй машинками в реальном времени</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
