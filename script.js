
document.getElementById('intro').addEventListener('click', () => {
  document.getElementById('intro').style.display = 'none';
  document.getElementById('story-container').style.display = 'block';
  document.getElementById('bg-music').play();
  renderNode();
});

const storyEl = document.getElementById('story');
const choicesEl = document.getElementById('choices');

const storyData = {
  start: {
    text: "Ты стоишь на остановке в сером районе. Пустота вокруг давит.\nЧто ты сделаешь?",
    choices: [
      { text: "Идти в сторону гаражей", next: "garages" },
      { text: "Зайти в подъезд", next: "entrance" }
    ]
  },
  garages: {
    text: "Гаражи стоят мёртвыми глыбами. Один приоткрыт.",
    choices: [
      { text: "Зайти внутрь", next: "garageInside" },
      { text: "Вернуться на остановку", next: "start" }
    ]
  },
  garageInside: {
    text: "Внутри только ржавый металл и старая коробка с VHS-кассетами.",
    choices: [
      { text: "Взять одну кассету", next: "vhsTape" },
      { text: "Уйти", next: "garages" }
    ]
  },
  vhsTape: {
    text: "На кассете надпись: 'Смотреть одному'. Хочешь посмотреть?",
    choices: [
      { text: "Да", next: "watchTape" },
      { text: "Нет", next: "garageInside" }
    ]
  },
  watchTape: {
    text: "Изображение рябит... странные тени, голос зовёт по имени.",
    choices: []
  },
  entrance: {
    text: "В подъезде пахнет плесенью. Лестница ведёт вверх.",
    choices: [
      { text: "Подняться", next: "stairs" },
      { text: "Остаться и послушать звуки", next: "listen" }
    ]
  },
  stairs: {
    text: "На этаже старая дверь. В щель светится лампа.",
    choices: [
      { text: "Постучать", next: "knock" },
      { text: "Пройти мимо", next: "roof" }
    ]
  },
  knock: {
    text: "Никто не отвечает. Внутри будто кто-то есть.",
    choices: [
      { text: "Открыть дверь", next: "insideRoom" },
      { text: "Уйти", next: "stairs" }
    ]
  },
  insideRoom: {
    text: "Внутри старая комната, фотографии на стене, телевизор шепчет новости...",
    choices: [
      { text: "Послушать телевизор", next: "tv" },
      { text: "Осмотреть фотографии", next: "photos" }
    ]
  },
  tv: {
    text: "Из телевизора: '...город остался без света... найдено тело...'.",
    choices: [
      { text: "Выключить", next: "insideRoom" },
      { text: "Слушать дальше", next: "deep" }
    ]
  },
  deep: {
    text: "Ты не можешь оторваться. Всё исчезает. Тьма поглощает.",
    choices: []
  },
  photos: {
    text: "Фотографии семей, которых ты не знаешь. Но лица знакомы.",
    choices: [
      { text: "Уйти из квартиры", next: "stairs" }
    ]
  },
  roof: {
    text: "На крыше только ветер. Ты видишь весь мёртвый район.",
    choices: [
      { text: "Посмотреть вниз", next: "fall" },
      { text: "Вернуться вниз", next: "stairs" }
    ]
  },
  fall: {
    text: "Ты стоишь на краю. Один шаг... и всё закончится.",
    choices: []
  },
  listen: {
    text: "Ты слышишь плач. Он идёт из подвала.",
    choices: [
      { text: "Спуститься", next: "basement" },
      { text: "Игнорировать", next: "start" }
    ]
  },
  basement: {
    text: "Подвал темен. Плач затихает. Кто-то рядом.",
    choices: [
      { text: "Позвать", next: "voice" },
      { text: "Выбежать", next: "start" }
    ]
  },
  voice: {
    text: "Ответа нет. Только эхо. Только ты.",
    choices: []
  }
};

let currentNode = 'start';

function renderNode() {
  const node = storyData[currentNode];
  storyEl.textContent = node.text;
  choicesEl.innerHTML = '';
  node.choices?.forEach(choice => {
    const btn = document.createElement('button');
    btn.className = 'choice-button';
    btn.textContent = choice.text;
    btn.onclick = () => {
      currentNode = choice.next;
      renderNode();
    };
    choicesEl.appendChild(btn);
  });
}
