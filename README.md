# sportTracker

Цель: трекер для тренировок.
Платформа на которой должне работать: cordova
Плагин: org.apache.cordova.geolocation

##Пример API

``` javascript

if( sportTracker.canTrack() === true){

  sportTracker.start({});
  sportTracker.end();
  
}else{
  alert(sportTracker.canTrack());
}

```

###canTrack - Проверка доступности geolocation.

Проверяет наличия geolocation.

Если geolocation не доступна, то возвращается причина ввиде текста, иначе возвращается true.

###start(oOptions) - Запускаем слежение.

Алгоритм:
1. Запускается функция watchPosition, каждые oOptions.watch секунд
2. Каждые oOptions.distance = 500 м вызывается функция  oOptions.onDistance, которой передается вся информация за эту дистанцию
     - Время начала, 
     - Время окончания,
     - Дистанция
     - Скорость (ср.) км/ч
     - Высота минимальная (метры)
     - Высота максимальная (метры)
     - Итоговый подъем (метры)
     - Итоговый спуск (метры)
    
    Данная информация будет использоваться для статистики.
  
3. Каждые oOptions.distanceTrack = 30 м вызывается функция  oOptions.onDistanceTrack, которой передается следующая информация
     - Широта
     - Долгота
    Данная информация будет использоваться для рисования трека на карте.
4.  




