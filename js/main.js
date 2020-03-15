/* eslint-disable no-console */
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
var avatarNumberMin = 1;
var avatarNumberMax = 6;


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

var getRandomElement = function (arr) {
  return arr[getRandomValue(0, arr.length - 1)];
};

var commentObj = function () { // cоздаем рандомные комментарии
  return {
    avatar: 'img/avatar-' + getRandomValue(avatarNumberMin, avatarNumberMax) + '.svg',
    message: getRandomElement(USERS_MESSAGES),
    name: getRandomElement(USER_NAMES)
  };
};

var createRandomComments = function () { // создаем функцию, которая создает массив рандомных комментов
  var commentCountMax = 6; // максимальная длина массива с комментами
  var comments = []; // делакм пустой массив комментов
  for (var i = 0; i < commentCountMax; i++) { // условия работы цикла
    comments.push(commentObj()); // добавляет в массив сгенерированные в commentObj комменты
  }
  return comments; // возвращает массив с комментами
};

var photoRandomCreate = function (count) { // создаем функцию, которая будет генерировать случайных набор фото
  var photoArr = []; // делаем пустой массив данных

  for (var i = 0; i < count; i++) { // условия работы цикла

    photoArr.push({
      url: 'photos/' + getRandomNoRepeat(indexRandomCreate(0, indexFotoArr)) + '.jpg',
      description: getRandomValueArr(PHOTO_DESCRIPTION),
      likes: getRandomValue(likesMin, likesMax),
      comments: createRandomComments()
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
  photoElement.querySelector('.picture__comments').textContent = photo.comments.length; // NB! работает не так, как надо, ну на мой взгляд!!
  photoElement.querySelector('.picture__likes').textContent = photo.likes;

  return photoElement; // возвращаем полученный склонированный элемент с новым содержимым
};

var renderPhotos = function (photoElem) {
  var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment
  var pictures = document.querySelector('.pictures');
  for (var i = 0; i < photoElem.length; i++) { // условия работы цикла, идет переборка массива случайно созданных фото
    fragment.appendChild(renderPhoto(photoElem[i])); // добавляет созданную фото во фрагмент
  }
  pictures.appendChild(fragment); // добавляет фрагмент в разметку
};
renderPhotos(photos);

var bigPicture = document.querySelector('.big-picture'); // находит по классу разметке элемент с большой картинкой
// bigPicture.classList.remove('hidden'); // удаляет класс hidden // временно скроем большую фотку
var commentsList = document.querySelector('.social__comments'); // находит по классу в разметке список с комментариями
var commentItem = commentsList.querySelector('.social__comment'); // находит по классу элемент списка

var renderCommentElement = function (comment) { // создаем функцию, для формирования коммента для элемента списка
  var commentElement = commentItem.cloneNode(true); // делаем дубликат узла template

  commentElement.querySelector('.social__picture').src = comment.avatar; // заполняет найденный по классу src содердимым из объекта commentObj
  commentElement.querySelector('.social__picture').alt = comment.name; // -||- alt
  commentElement.querySelector('.social__text').textContent = comment.message; // -||- текст комментария

  return commentElement; // возвращает сформированный коммент
};

var renderComments = function (commentsElem) {
  var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment

  for (var i = 0; i < commentsElem.length; i++) { // цикл
    fragment.appendChild(renderCommentElement(commentsElem[i])); // добавляет созданную фото во фрагмент
  }
  return commentsList.appendChild(fragment); // добавляет фрагмент в разметку
};

var openBigPicture = function (photo) {
  bigPicture.querySelector('.big-picture__img img').src = photo.url; // находим в ДОМ адрес изображение аватарки и подставляем фото автора коммента
  bigPicture.querySelector('.social__caption').textContent = photo.description; // находим в ДОМ адрес изображение аватарки и подставляем фото автора коммента
  bigPicture.querySelector('.likes-count').textContent = photo.likes; // -||- описание изображения и вписываем имя авора коммента
  bigPicture.querySelector('.comments-count').textContent = renderComments(photo.comments); //
};

openBigPicture(photos[8]);

bigPicture.querySelector('.social__comment-count').classList.add('hidden');
bigPicture.querySelector('.comments-loader').classList.add('hidden');
// document.body.classList.add('modal-open');


var openUploadFile = document.querySelector('.img-upload__input'); // находит в разметке по id скрытый инпут
var uploadCancel = document.querySelector('#upload-cancel'); // находит в разметке по id кнопку отмены
var uploadForm = document.querySelector('.img-upload__overlay'); // находит в разметке по id форму
var ESC_KEY = 'Escape';
// var ENTER_KEY = 'Enter';

var formOpen = function () { // описывает открытие формы
  uploadForm.classList.remove('hidden'); // у формы в расметке удаляет класс hidden
  document.body.classList.add('modal-open'); // добавляет body класс modal-open
};

var formClose = function () { // функция закрытия формы
  uploadForm.classList.add('hidden'); // добавляет класс hidden
  document.body.classList.remove('modal-open'); // удаляет класс открытия модального окна
};

var onPopupEscPress = function (evt) { // управление модалкой при помощи клавиатуры
  if (evt.key === ESC_KEY) { // если событие с клавиатуры строго равно значению эскейп на клавиатуре, то вызовется функция закрытия попапа

    formClose();
  }
};

openUploadFile.addEventListener('change', function () { // При наступлении события change на этом поле, можно сразу показывать форму редактирования изображения.
  formOpen(); // открытия формы(удаляет класс скрытия)
  document.addEventListener('keydown', onPopupEscPress); // и слушается событие нажатия кнопки клавиатуры и выполяется функция закрытия формы
});

uploadCancel.addEventListener('click', function () { // если происходит событие клик по кнопке отмены, то срабатывает функция
  formClose(); // происходит вызов функции закрытия формы, навешиваем класс hidden
  document.removeEventListener('keydown', onPopupEscPress); // и слушается событие нажатия кнопки клавиатуры и выполяется функция закрытия формы
});

// наложение эффекта
var effectList = document.querySelector('.effects__list');
var imgUploadPreview = document.querySelector('.img-upload__preview');

var effectChangeHandler = function (evt) {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    imgUploadPreview.classList = ''; // сбрасывает значение поля
    imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
  }
};
effectList.addEventListener('change', effectChangeHandler);

// редактирование размера изображения
var scaleCtrlSmaller = document.querySelector('.scale__control--smaller');
var scaleCtrlBigger = document.querySelector('.scale__control--bigger');
var scaleCtrlValue = document.querySelector('.scale__control--value');

scaleCtrlValue.value = '100%'; // значение инпута со значением размера картинки(в разметке = 55%)

var setControlValueDec = function (evt) { // функция, которая обрабатывает события
  evt.preventDefault(); // не выолдняе действие по умолчанию
  switch (scaleCtrlValue.value) { // заменяет множество циклов if-else, последовательно сравнивыает выражение с несколькими вариантами
    case '50%': // если значение инпута scaleCtrlValue.value строго равно 50%, то выполняется директива case
      scaleCtrlValue.value = '25%'; // значение инпута присваивается значение 25%
      imgUploadPreview.style.transform = 'scale(' + (0.25) + ')'; // в style.css запишется значение scale: 0.25
      break;
    case '75%':
      scaleCtrlValue.value = '50%';
      imgUploadPreview.style.transform = 'scale(' + (0.5) + ')';
      break;
    case '100%':
      scaleCtrlValue.value = '75%';
      imgUploadPreview.style.transform = 'scale(' + (0.75) + ')';
      break;
  }
};

scaleCtrlSmaller.addEventListener('click', setControlValueDec); // кнопке "-" по клику будет присваиваться значение полученное в результате работы функции

var setControlValueDown = function (evt) { // функция, которая обрабатывает события
  evt.preventDefault(); // не выолдняе действие по умолчанию
  switch (scaleCtrlValue.value) { // заменяет множество циклов if-else, последовательно сравнивыает выражение с несколькими вариантами
    case '25%': // если значение инпута scaleCtrlValue.value строго равно 50%, то выполняется директива case
      scaleCtrlValue.value = '50%'; // значение инпута присваивается значение 25%
      imgUploadPreview.style.transform = 'scale(' + (0.5) + ')'; // в style.css запишется значение scale: 0.25
      break;
    case '50%':
      scaleCtrlValue.value = '75%';
      imgUploadPreview.style.transform = 'scale(' + (0.75) + ')';
      break;
    case '75%':
      scaleCtrlValue.value = '100%';
      imgUploadPreview.style.transform = 'scale(' + (1) + ')';
      break;
  }
};
scaleCtrlBigger.addEventListener('click', setControlValueDown);

// валидация


var MAX_LENGTH_HASHTAG = 20;
var HASHTAG_ARR_MAX_LENGTH = 5;
// var SYMBOL = /[a-z0-9а-яA-ZА-Я-#]/;
var imgUploadForm = document.querySelector('.img-upload__form');
var hashtagFieldset = imgUploadForm.querySelector('.img-upload__text');
var hashtagInput = hashtagFieldset.querySelector('input[name=hashtags]');

var hashtagsValidity = function () {
  var hashtagInputError = hashtagInput.value;
  var lowerCaseHashtag = hashtagInputError.toLowerCase();
  var hashtagArr = lowerCaseHashtag.split(' ');

  if (hashtagInput.value.length === 0) {
    hashtagInput.setCustomValidity('');
  } else if (hashtagArr.length > HASHTAG_ARR_MAX_LENGTH) {
    hashtagInput.setCustomValidity('нельзя указать больше пяти хэш-тегов');
  } else {
    for (var i = 0; i < hashtagArr.length; i++) {
      if (hashtagArr[i][0] !== '#' || hashtagArr[0][0] !== '#') {
        hashtagInput.setCustomValidity('хеш-тег начинается с #');
      } else if (hashtagArr[i] === '#') {
        hashtagInput.setCustomValidity('хеш-тег не может состоять только из одной решётки');
      } else if (hashtagArr.indexOf(hashtagArr[i]) !== i) {
        hashtagInput.setCustomValidity('один и тот же хэш-тег не может быть использован дважды');
      } else if (hashtagArr[i].length > MAX_LENGTH_HASHTAG) {
        hashtagInput.setCustomValidity('максимальная длина одного хэш-тега 20 символов, включая решётку');
      } else if (hashtagArr[i].split('#').length > 2) {
        hashtagInput.setCustomValidity('хэш-теги должны быть разделены пробелами');
      // } else if (SYMBOL.test(hashtagArr[i])) {
      //   hashtagInput.setCustomValidity('строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (@, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д.');
      } else {
        hashtagInput.setCustomValidity('');
      }
    }
  }
};

hashtagInput.addEventListener('input', hashtagsValidity);
