
let scenes = {
    start: {
        text: "Ты стоишь на автобусной остановке. Всё вокруг серо и тихо.",
        image: "images/bus_stop.jpg",
        choices: [
            { text: "Пойти во двор", next: "yard" },
            { text: "Двигаться к ларьку", next: "kiosk" }
        ]
    },
    yard: {
        text: "Во дворе пусто. Заброшенная детская площадка навевает тоску.",
        image: "images/yard.jpg",
        choices: [
            { text: "Исследовать гаражи", next: "garages" },
            { text: "Осмотреть качели", next: "swings" },
            { text: "Вернуться", next: "start" }
        ]
    },
    swings: {
        text: "Качели медленно качаются, будто кто-то только что ушел. Под ними валяются пивные бутылки и старая игрушка.",
        image: "images/swings.jpg",
        choices: [
            { text: "Взять игрушку", next: "toy_taken" },
            { text: "Оставить всё как есть", next: "yard" }
        ]
    },
    toy_taken: {
        text: "Ты берешь игрушку. Внезапно слышен глухой звук из подъезда.",
        image: "images/toy.jpg",
        choices: [
            { text: "Пойти в подъезд", next: "stairwell" },
            { text: "Вернуться", next: "yard" }
        ]
    },
    stairwell: {
        text: "Подъезд пахнет сыростью. Свет мигает. В углу кто-то стоит.",
        image: "images/stairwell.jpg",
        choices: [
            { text: "Подойти ближе", next: "figure_encounter" },
            { text: "Развернуться", next: "yard" }
        ]
    },
    figure_encounter: {
        text: "Фигура исчезает, но оставляет записку. В ней твое имя и дата сегодняшнего дня.",
        image: "images/figure.jpg",
        choices: [
            { text: "Спрятаться", next: "bad_ending" },
            { text: "Идти наверх", next: "final_corridor" }
        ]
    },
    final_corridor: {
        text: "Ты идешь по длинному коридору. В конце - дверь с табличкой 'Не входить'.",
        image: "images/corridor.jpg",
        choices: [
            { text: "Открыть дверь", next: "true_ending" },
            { text: "Вернуться", next: "stairwell" }
        ]
    },
    true_ending: {
        text: "Ты выходишь в абсолютно белое пространство. Всё исчезает. Конец?",
        image: "images/white_room.jpg",
        choices: []
    },
    bad_ending: {
        text: "Ты просыпаешься ночью на качелях. Всё началось сначала. И снова, и снова.",
        image: "images/bad_end.jpg",
        choices: [
            { text: "Начать заново", next: "start" }
        ]
    },
    kiosk: {
        text: "Ларёк закрыт. На витрине пыльные остатки прошлого.",
        image: "images/kiosk.jpg",
        choices: [
            { text: "Оглядеться", next: "start" }
        ]
    },
    garages: {
        text: "Гаражи пустые, ржавые. Один открыт...",
        image: "images/garages.jpg",
        choices: [
            { text: "Зайти внутрь", next: "garage_inside" },
            { text: "Вернуться", next: "yard" }
        ]
    },
    garage_inside: {
        text: "Внутри холодно. Кто-то только что здесь был?",
        image: "images/garage_inside.jpg",
        choices: [
            { text: "Спрятаться", next: "end_loop" },
            { text: "Выйти", next: "garages" }
        ]
    },
    end_loop: {
        text: "Ты чувствуешь, как время начинает повторяться. Что-то не так...",
        image: "images/glitch.jpg",
        choices: [
            { text: "Проснуться?", next: "start" }
        ]
    }
};

let current = "start";

function startGame() {
    document.getElementById("intro-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    let saved = localStorage.getItem("tlen_save");
    if (saved && confirm("Загрузить сохранённую игру?")) {
        current = saved;
    }
    loadScene(current);
}

function loadScene(id) {
    const scene = scenes[id];
    current = id;
    localStorage.setItem("tlen_save", id);
    document.getElementById("scene-image").src = scene.image;
    document.getElementById("text-box").innerText = scene.text;
    const choicesDiv = document.getElementById("choices");
    choicesDiv.innerHTML = "";
    scene.choices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice.text;
        btn.onclick = () => loadScene(choice.next);
        choicesDiv.appendChild(btn);
    });
}
