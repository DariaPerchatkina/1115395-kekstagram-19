"use strict";

var USER_NAME = ['Петька', 'Максим', 'Аня', 'Лёля', 'Артем', 'Саша', 'Костя', 'Ира']; // создает массив пользователей
var USERS_MESSAGE = [ // создает массив с комментариями
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
    ];
var COUNT = 25;
var likesMin = 15;
var likesMax = 250;

var getRandomValueArr = function (arr) { // генерируем случайное чисто из массива
      return arr[Math.floor(Math.random() * arr.length)];
  };

var likes = function getRandomValue(min, max) { // считаем рандомное значение лайков
        min = Math.ceil(likesMin);
        max = Math.floor(likesMax);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      };
      likes(likesMin, likesMin);


var comments = function (message) { // cоздаем рандомные комментарии
    return getRandomValueArr(message) + ' ' + getRandomValueArr(message);
  };
    comments(USERS_MESSAGE);


var getRandomNoRepeat = function (arr) { // создадим функцию, которая позволит получать не повторющиеся элементы массива
    return arr.splice(Math.floor(Math.random() * arr.length), 1);
  }

  
  var indexFotoArr = [];
  var indexRandomCreate = function (count, arr) {
    for (var i = 1; i <= count ; i++) {
      arr.push(i);
    }
    return arr;
  }
  indexRandomCreate(COUNT, indexFotoArr);

// var url = ['photos/' + getRandomNoRepeat(indexRandomCreate(COUNT)) + '.jpg'];

// var similarWizardTemplate = document.querySelector('#picture') // находим темплейт в разметке
// .content // берем все содержимое дива
// .querySelector('.picture');

// var getRandomValueArr = function (arr) {
//     return arr[Math.floor(Math.random() * arr.length)];
// };

var photoRandomCreate = function (count, arr) { // создаем функцию, которая будет генерировать случайных набор фото
  var photoArr = []; // делаем пустой массив данных

  for (var i = 0; i < count; i++) { // условия работы цикла
 photoArr.push({url: url,
        likes: likes,
        comments: comments
    });
  }
  return photoArr;
};

// // находим и показываем окно настроек пользователя

// var userDialog = document.querySelector('.setup'); // находит по классу разметке div с модальным окном
// userDialog.classList.remove('hidden'); // удаляет класс hidden

// document.querySelector('.setup-similar').classList.remove('hidden'); // отображает поле в модалке, где находятся 4 мага

// var similarListElement = document.querySelector('.setup-similar-list'); // находит список пока что одинаковых магов


// var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
// var WIZARD_LASTNAME = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
// var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210 ,55)', 'rgb(0, 0 ,0)'];
// var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
// var WIZARD_COUNT = 4;

// // необходимо написать функцию, которая позволит создавать рандомную связку имя-фамилия для магов из представленных массивом имен и фамилий
// // каждая составляющая рандомного имени массива будет находится при помощи поиска рандомного значения,а итоговое имя мага будет получаться при попмощт конкатенации
// var getRandomValueArr = function (arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// };

// var wizardFullName = function (name, lastName) {
//   var wizardsName = getRandomValueArr(name);
//   var wizardsLastName = getRandomValueArr(lastName);
//   return wizardsName + ' ' + wizardsLastName;
// };



// var wizards = wizardsRandomCreate(WIZARD_COUNT);

// var renderWizard = function (wizard) { // создаем функцию, не придумала пока как обьяснить для чего она
//   var wizardElement = similarWizardTemplate.cloneNode(true); // делаем дубликат узла template

//   wizardElement.querySelector('.setup-similar-label').textContent = wizard.name; // находим в ДОМ div c классом .setup-similar-label и задаем ему текстовое содержимое
//   wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor; // по аналогии с цветами
//   wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

//   return wizardElement; // возвращаем полученный склонированный элемент с новым содержимым
// };

// var renderWizards = function (wizardsElem) {
//   var fragment = document.createDocumentFragment(); // создаем пустой объект DocumentFragment
//   for (var i = 0; i < wizardsElem.length; i++) { // условия работы цикла, идет переборка массива случайно созданных волшебников
//     fragment.appendChild(renderWizard(wizardsElem[i])); // добавляет созданного волшебника во фрагмент
//   }
//   similarListElement.appendChild(fragment); // добавляет фрагмент в разметку
// };
// renderWizards(wizards);

// userDialog.querySelector('.setup-similar').classList.remove('hidden'); // отключает класс hidden у окна,отображающего сгененрированнвх волшебников в модалке
