# sportTracker

Цель: трекер для тренировок.

Платформа на которой должна работать библиотека: cordova

Плагин: org.apache.cordova.geolocation

##Пример API

``` javascript

/*
Пользователь нажал на кнопку СТАРТ
*/

if( sportTracker.canTrack() === true){

  sportTracker.start({
    watch: 10, //в секундах
    distance: 500, //в метрах
    onDistance: function( /*описание параметров см. ниже*/){
        
        //обрабатываем данные, например пишем в БД и выводим результат в UI
        
    },
    distanceTrack: 30, //в метрах
    onDistanceTrack: function( /*описание параметров см. ниже*/){
        
        //рисуем трек на карте
        
    }
  });
  
  

  
}else{
  alert(sportTracker.canTrack());
}



/*
Пользователь нажал на кнопку СТОП

*/

sportTracker.end();
```

###canTrack - Проверка доступности geolocation.

Проверяет наличия geolocation.

Если geolocation не доступна, то возвращается причина ввиде текста, иначе возвращается true.

http://docs.phonegap.com/en/edge/cordova_geolocation_geolocation.md.html#PositionError

###start(oOptions) - Запускаем слежение.

Алгоритм:

1. Запускается функция watchPosition, каждые oOptions.watch секунд
2. Каждые oOptions.distance = 500 м вызывается функция  oOptions.onDistance, которой передается вся информация за эту дистанцию
     - Время начала (date), 
     - Время окончания (date),
     - Время - в секундач (окончание - начало)
     - Дистанция (в метрах)
     - Скорость (ср.) км/ч
     - Высота минимальная (метры)
     - Высота максимальная (метры)
     - Итоговый подъем (метры)
     - Итоговый спуск (метры)
    
    Данная информация будет использоваться для статистики.

Функция oOptions.onDistance, также будет вызвана при sportTracker.end();
  
3 . Каждые oOptions.distanceTrack = 30 м вызывается функция  oOptions.onDistanceTrack, которой передается следующая информация
     - Широта
     - Долгота
     
    Данная информация будет использоваться для рисования трека на карте.

Функция oOptions.onDistanceTrack, также будет вызвана при sportTracker.end();


###end() - Останаливаем слежение.

Последний раз вызываются oOptions.onDistance и oOptions.onDistanceTrack
clearWatch

#####Общие замечания.
    - Corvova
    - Bower.
    - Используем UMD (Universal Module Definition)


