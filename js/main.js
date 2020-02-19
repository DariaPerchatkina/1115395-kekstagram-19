'use strict';

var USER_NAMES = ['Петька', 'Максим', 'Аня', 'Лёля', 'Артем', 'Саша', 'Костя', 'Ира']; // создает массив пользователей
var USERS_MESSAGES = [ // создает массив с комментариями
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PHOTO_DESCRIPTION = [
  'Мама мия, какой закат',
  'Опа-на, смотрите что у меня есть',
  'Окультуриваемся',
  'Какую брать - эту или эту?',
  'Всем продуктивного дня!',
  'А мы в отпуск!!!',
  'Любите и будьте любимы',
  'Первые шаги',
  'От улыбки хмурый день светлей, от улыбки в небе радуга проснется',
  'Хорошо в деревне летом',
  'Главное чтобы близкие были рядом',
  'Не хочу писать диплом..',
  'Го гулять, погодка огонь!',
  'Ешь, молись, люби, а потом иди на работу',
  'Ставьте лайки, подписывайтесь на мой канал, жмите на колокольчик',
  'Люблю тебя, мой милый друг',
  'Happy every days',
  'Проснулся, умылся и ты красавчик',
  'И пусть весь мир подождет',
  'Рыбак рыбака видит издалека',
  'Скоро сказка сказывается, да не скоро дело делается',
  'Видили ночь, гуляли всю ночь до утра',
  'Рожденный ползать - летать не может сам, но на самолете вполне себе смог',
  'Снег в апреле? Что за дела?????',
  'Умей радоваться мелочам'
];

var COUNT = 25;
var likesMin = 15;
var likesMax = 250;

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};


var getRandomValueArr = function (arr) { // генерируем случайное чисто из массива
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomNoRepeat = function (arr) { // создадим функцию, которая позволит получать не повторющиеся элементы массива
  return arr.splice(Math.floor(Math.random() * arr.length), 1);
};

var indexFotoArr = []; // создаем пустой массив
var indexRandomCreate = function (count, arr) { // создаем функцию, которая позволит нам получить массив индексов для фотографий
  for (var i = 1; i <= count; i++) {
    arr.push(i);
  }
  return indexFotoArr;
};
indexRandomCreate(COUNT, indexFotoArr);


var comments = function (count) { // cоздаем рандомные комментарии
  for (var i = 0; i < count; i++) { // условия работы цикла
  return {
    avatar: 'img/avatar' + getRandomValue(1, 6) + '.svg',
    message: USERS_MESSAGES[getRandomValue(0, USERS_MESSAGES.length - 1)],
    name: getRandomValueArr(USER_NAMES)
  }
}
};

var photoRandomCreate = function (count) { // создаем функцию, которая будет генерировать случайных набор фото
  var photoArr = []; // делаем пустой массив данных

  for (var i = 0; i < count; i++) { // условия работы цикла
    
    photoArr.push({
      url: 'photos/' + getRandomNoRepeat(indexRandomCreate(0, indexFotoArr)) + '.jpg',
      description: getRandomValueArr(PHOTO_DESCRIPTION),
      likes: getRandomValue(likesMin, likesMax),
      comments: comments(COUNT)
    });
  }
  return photoArr;
};
var photos = photoRandomCreate(COUNT);

var similarUserPhotoTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');

var renderPhoto = function (photo) { // создаем функцию, для формирования элеmента с данными фото
  var photoElement = similarUserPhotoTemplate.cloneNode(true); // делаем дубликат узла template

  photoElement.querySelector('.picture__img').src = photo.url;
  photoElement.querySelector('.picture__comments').textContent = photo.comments.message.length; // NB! работает не так, как надо, ну на мой взгляд!! 
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement; // возвращаем полученный склонированный элемент с новым содержимым
};

var renderPhotos = function (photoElem) {
  var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment
  var pictures = document.querySelector('.pictures');
  for (var i = 0; i < photoElem.length; i++) { // условия работы цикла, идет переборка массива случайно созданных волшебников
    fragment.appendChild(renderPhoto(photoElem[i])); // добавляет созданного волшебника во фрагмент
  }
  pictures.appendChild(fragment); // добавляет фрагмент в разметку
};
renderPhotos(photos);


// var bigPicture = document.querySelector('.big-picture'); // находит по классу разметке элемент с большой картинкой
// bigPicture.classList.remove('hidden'); // удаляет класс hidden

// var renderComment =  function(arrComment) { // создаем функцию, для формирования элеmента с данными комментов
//   var commentElement = document.querySelector('.social__comments').cloneNode(true); // делаем дубликат узла template

//   commentElement.querySelector('.social__picture').src = arrComment[0].avatar.url; // находим в ДОМ адрес изображение аватарки и подставляем фото автора коммента
//   commentElement.querySelector('.social__picture').alt = arrComment[0].name; // -||- описание изображения и вписываем имя авора коммента
//   commentElement.querySelector('.social__text').textContent = arrComment[0].message; //  -||- парагараф с текстом комментария и вставляем текст
//   commentElement.querySelector('.big-picture__img').src = comment.avatar.url; // находим в ДОМ адрес изображение аватарки и подставляем фото автора коммента
//   commentElement.querySelector('.likes-count').textContent = photo.likes; // -||- описание изображения и вписываем имя авора коммента
//   commentElement.querySelector('.comments-count').textContent = photo.comments; //  -||- парагараф с текстом комментария и вставляем текст
  
//   return commentElement; // возвращаем полученный склонированный элемент с новым содержимым
// };

// renderComment(comments);