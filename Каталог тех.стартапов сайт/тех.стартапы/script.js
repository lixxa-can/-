let startups = [
    {
        id: 1,
        name: "Twinby",
        description: "приложение для знакомств, основанное на психологической совместимости. Стартап показал значительный рост выручки в 2024 году и активно развивается.",
        stage: "Ранняя стадия",
        url: "https://twinby.com/"
    },
    {
        id: 2,
        name: "Zerocoder",
        description: "онлайн-университет и сообщество по no-code разработке и работе с ИИ. Проект получил инвестиции от крупных фондов в 2024 году.",
        stage: "Ранняя стадия",
        url: "https://zerocoder.com/ru/"
    },
    {
        id: 3,
        name: "iFarm",
        description: "разработка технологий вертикальных ферм и автоматизированных теплиц для выращивания свежей зелени и овощей в городских условиях.",
        stage: "Ранняя стадия",
        url: "https://ifarm.fi/"
    },
    {
        id: 4,
        name: "Promobot",
        description: "производство автономных сервисных роботов для бизнеса (консультанты, гиды, администраторы), имеющих широкое применение.",
        stage: "Ранняя стадия",
        url: "https://promo-bot.ru/"
    },
    {
        id: 5,
        name: "Gero",
        description: "биотехнологический стартап, занимающийся исследованиями в области борьбы со старением и разработкой соответствующих терапий.",
        stage: "Ранняя стадия",
        url: "https://gero.ai"
    },
    {
        id: 6,
        name: "it кузня",
        description: "открытая городская площадка, ее участником может стать любой студент",
        stage: "Ранняя стадия",
        url: "https://it-kuznya.ru"
    },
    {
        id: 7,
        name: "NextLevel",
        description: "Команда разрабатывающая что то новое",
        stage: "Запуск",
        url: "https://nextlevel.ru"
    },
    {
        id: 8,
        name: "ArtGeneration.me",
        description: "Нейросеть для создания изображений, галерея работ и креативное сообщество.",
        stage: "Ранняя стадия",
        url: "https://artgeneration.me"
    },
    {
        id: 9,
        name: "Give Me Public",
        description: "ИИ-сервис для ведения социальных сетей.",
        stage: "Ранняя стадия",
        url: "https://givemepublic.com"
    },
    {
        id: 10,
        name: "Insighter",
        description: "Сервис для роста бизнеса, основанный на автоматизированном проведении пользовательских исследований.",
        stage: "Ранняя стадия",
        url: "https://insighter.io"
    },
    {
        id: 11,
        name: "Квизная",
        description: "Конструктор маркетинговых квизов, использующий машинное обучение.",
        stage: "Ранняя стадия",
        url: "https://kviznaya.ru"
    },
    {
        id: 12,
        name: "Wunjo",
        description: "Платформа на основе ИИ для дизайнеров и фотографов, позволяющая генерировать и изменять видео, фото и голос.",
        stage: "Ранняя стадия",
        url: "https://wunjo.ai"
    },
    {
        id: 13,
        name: "Upgraide.me",
        description: "Персональная команда из различных нейросетей и инструментов.",
        stage: "Ранняя стадия",
        url: "https://upgraide.me"
    },
    {
        id: 14,
        name: "АЙДА ГУЛЯТЬ",
        description: "Платформа для владельцев собак и зообизнеса.",
        stage: "Ранняя стадия",
        url: "https://aidagulyat.ru"
    },
    {
        id: 15,
        name: "Faino",
        description: "Сервис, помогающий справиться с тревогой и стрессом.",
        stage: "Ранняя стадия",
        url: "https://faino.app"
    },
    {
        id: 16,
        name: "Chrony",
        description: "Помощник для Google Календаря, позволяющий редактировать события с помощью текста, голоса и фото.",
        stage: "Ранняя стадия",
        url: "https://chrony.app"
    },
    {
        id: 17,
        name: "Metranpazh",
        description: "Проект, вошедший в топ по результатам народного голосования",
        stage: "Ранняя стадия",
        url: "https://metranpazh.ru"
    }
];

let favorites = [];
if (localStorage.getItem('favorites')) {
    favorites = JSON.parse(localStorage.getItem('favorites'));
}

let notes = {};
if (localStorage.getItem('notes')) {
    notes = JSON.parse(localStorage.getItem('notes'));
}

function showSection(sectionName) {
    let sections = document.querySelectorAll('.section');
    for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active');
    }
    
    document.getElementById(sectionName).classList.add('active');
    
    let buttons = document.querySelectorAll('.tab-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
    }
    
    if (sectionName === 'favorites') {
        displayFavorites();
    }
}

function toggleFavorite(startupId) {
    let index = favorites.indexOf(startupId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(startupId);
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    displayStartups();
    displayFavorites();
    updateFavoritesCount();
}

function isFavorite(startupId) {
    for (let i = 0; i < favorites.length; i++) {
        if (favorites[i] === startupId) {
            return true;
        }
    }
    return false;
}

function displayStartups(filteredStartups) {
    let list = document.getElementById('startupList');
    list.innerHTML = '';
    
    let startupsToShow = filteredStartups || startups;
    
    if (startupsToShow.length === 0) {
        list.innerHTML = '<p class="no-results">Ничего не найдено</p>';
        return;
    }
    
    for (let i = 0; i < startupsToShow.length; i++) {
        let startup = startupsToShow[i];
        let card = document.createElement('div');
        card.className = 'startup-card';
        
        let isFav = isFavorite(startup.id);
        let btnClass = isFav ? 'added' : '';
        let btnText = isFav ? '✓ В избранном' : '+ Добавить в избранное';
        
        let nameLink = startup.name;
        if (startup.url) {
            nameLink = '<a href="' + startup.url + '" target="_blank" class="startup-link">' + startup.name + '</a>';
        }
        
        card.innerHTML = '<h3>' + nameLink + '</h3>' +
            '<p><strong>Стадия:</strong> ' + startup.stage + '</p>' +
            '<p>' + startup.description + '</p>' +
            '<button class="favorite-btn ' + btnClass + '" onclick="toggleFavorite(' + startup.id + ')">' + btnText + '</button>';
        
        list.appendChild(card);
    }
}

function searchStartups() {
    let searchText = document.getElementById('searchInput').value.toLowerCase();
    let filtered = [];
    
    for (let i = 0; i < startups.length; i++) {
        if (startups[i].name.toLowerCase().indexOf(searchText) !== -1) {
            filtered.push(startups[i]);
        }
    }
    
    displayStartups(filtered);
}

function updateFavoritesCount() {
    let count = favorites.length;
    let countElement = document.getElementById('favoritesCount');
    if (count > 0) {
        countElement.textContent = '(' + count + ')';
    } else {
        countElement.textContent = '';
    }
}

function saveNote(startupId) {
    let noteText = document.getElementById('note-' + startupId).value;
    notes[startupId] = noteText;
    localStorage.setItem('notes', JSON.stringify(notes));
    alert('Заметка сохранена!');
}

function displayFavorites() {
    let list = document.getElementById('favoritesList');
    let emptyMsg = document.getElementById('emptyFavorites');
    list.innerHTML = '';
    
    if (favorites.length === 0) {
        emptyMsg.style.display = 'block';
        return;
    }
    
    emptyMsg.style.display = 'none';
    
    for (let i = 0; i < favorites.length; i++) {
        let favId = favorites[i];
        let startup = null;
        
        for (let j = 0; j < startups.length; j++) {
            if (startups[j].id === favId) {
                startup = startups[j];
                break;
            }
        }
        
        if (startup) {
            let card = document.createElement('div');
            card.className = 'startup-card favorite-card';
            
            let note = notes[startup.id] || '';
            let nameLink = startup.name;
            if (startup.url) {
                nameLink = '<a href="' + startup.url + '" target="_blank" class="startup-link">' + startup.name + '</a>';
            }
            
            card.innerHTML = '<h3>' + nameLink + '</h3>' +
                '<p><strong>Стадия:</strong> ' + startup.stage + '</p>' +
                '<p>' + startup.description + '</p>' +
                '<div class="analysis-section">' +
                '<label><strong>Заметки для анализа:</strong></label>' +
                '<textarea class="note-textarea" id="note-' + startup.id + '" placeholder="Добавьте свои заметки о проекте для инвестиционного анализа...">' + note + '</textarea>' +
                '<div class="buttons-row">' +
                '<button class="save-note-btn" onclick="saveNote(' + startup.id + ')">Сохранить заметку</button>' +
                '<button class="favorite-btn added" onclick="toggleFavorite(' + startup.id + ')">✓ В избранном</button>' +
                '</div>' +
                '</div>';
            
            list.appendChild(card);
        }
    }
}

window.onload = function() {
    displayStartups();
    updateFavoritesCount();
    
    let buttons = document.querySelectorAll('.tab-button');
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            let sectionName = 'catalog';
            if (this.textContent.indexOf('Избранное') !== -1) {
                sectionName = 'favorites';
            }
            showSection(sectionName);
            
            let allButtons = document.querySelectorAll('.tab-button');
            for (let j = 0; j < allButtons.length; j++) {
                allButtons[j].classList.remove('active');
            }
            this.classList.add('active');
        };
    }
    
    let searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.onkeyup = searchStartups;
    }
};