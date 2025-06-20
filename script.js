
const intro = document.getElementById("intro");
const game = document.getElementById("game");
const text = document.getElementById("text");
const choices = document.getElementById("choices");
const background = document.getElementById("background");

const scenes = {
    start: {
        text: "Ты стоишь на автобусной остановке. Всё вокруг серо и тихо.",
        image: "images/stop.jpg",
        options: [
            { text: "Пойти к гаражам", next: "garages" },
            { text: "Зайти в подъезд", next: "entrance" }
        ]
    },
    garages: {
        text: "Ты проходишь мимо ржавых гаражей. Вдалеке слышится лай.",
        image: "images/garages.jpg",
        options: [
            { text: "Вернуться назад", next: "start" },
            { text: "Заглянуть за гаражи", next: "backyard" }
        ]
    },
    entrance: {
        text: "Подъезд встречает тебя запахом сырости и гниения.",
        image: "images/entrance.jpg",
        options: [
            { text: "Подняться на этаж", next: "room" },
            { text: "Спуститься в подвал", next: "basement" }
        ]
    },
    room: {
        text: "На площадке темно. В одной из квартир приоткрыта дверь.",
        image: "images/room.jpg",
        options: [
            { text: "Зайти в квартиру", next: "end" },
            { text: "Вернуться вниз", next: "entrance" }
        ]
    },
    basement: {
        text: "Подвал тянется чередой темных коридоров.",
        image: "images/basement.jpg",
        options: [
            { text: "Идти в темноту", next: "end" },
            { text: "Подняться наверх", next: "entrance" }
        ]
    },
    end: {
        text: "Ты чувствуешь, что уже не один...",
        image: "images/end.jpg",
        options: [
            { text: "Завершить", next: "start" }
        ]
    }
};

function showScene(key) {
    const scene = scenes[key];
    text.textContent = scene.text;
    background.style.backgroundImage = `url('${scene.image}')`;
    choices.innerHTML = "";
    scene.options.forEach(opt => {
        const btn = document.createElement("button");
        btn.textContent = opt.text;
        btn.onclick = () => showScene(opt.next);
        choices.appendChild(btn);
    });
}

intro.onclick = () => {
    intro.style.display = "none";
    game.style.display = "block";
    showScene("start");
};
