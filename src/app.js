// Состояние приложения
const state = {
    mode: 'pomodoro',
    isRunning: false,
    timeLeft: 25 * 60, // в секундах
    totalTime: 25 * 60,
    pomodoroCount: 0,
    timerInterval: null
};

// Настройки времени для разных режимов (в секундах)
const TIME_SETTINGS = {
    'pomodoro': 25 * 60,
    'short-break': 5 * 60,
    'long-break': 15 * 60
};

// Элементы DOM
const timerDisplay = document.getElementById('timer');
const progressBar = document.getElementById('progress');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const pomodoroCountDisplay = document.getElementById('pomodoroCount');
const modeButtons = document.querySelectorAll('.mode-btn');

// Запросить разрешение на уведомления
if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
}

// Обновить отображение таймера
function updateDisplay() {
    const minutes = Math.floor(state.timeLeft / 60);
    const seconds = state.timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Обновить прогресс-бар
    const progress = (state.timeLeft / state.totalTime) * 100;
    progressBar.style.width = `${progress}%`;

    // Обновить заголовок страницы
    document.title = `${timerDisplay.textContent} - Помодоро Таймер`;
}

// Запустить таймер
function startTimer() {
    if (!state.isRunning) {
        state.isRunning = true;
        startBtn.textContent = 'Пауза';

        state.timerInterval = setInterval(() => {
            state.timeLeft--;
            updateDisplay();

            if (state.timeLeft === 0) {
                onTimerComplete();
            }
        }, 1000);
    } else {
        pauseTimer();
    }
}

// Поставить таймер на паузу
function pauseTimer() {
    state.isRunning = false;
    startBtn.textContent = 'Старт';
    clearInterval(state.timerInterval);
}

// Сбросить таймер
function resetTimer() {
    pauseTimer();
    state.timeLeft = state.totalTime;
    updateDisplay();
}

// Переключить режим
function switchMode(mode) {
    pauseTimer();
    state.mode = mode;
    state.totalTime = TIME_SETTINGS[mode];
    state.timeLeft = state.totalTime;

    // Обновить UI
    document.body.className = `transition-bg bg-gradient-to-br ${getModeClasses(mode)}`;
    modeButtons.forEach(btn => {
        if (btn.dataset.mode === mode) {
            btn.classList.add('bg-gray-800', 'text-white');
            btn.classList.remove('bg-gray-200', 'text-gray-800');
        } else {
            btn.classList.remove('bg-gray-800', 'text-white');
            btn.classList.add('bg-gray-200', 'text-gray-800');
        }
    });

    updateDisplay();
}

// Получить классы градиента для режима
function getModeClasses(mode) {
    const gradients = {
        'pomodoro': 'from-red-500 to-red-700',
        'short-break': 'from-green-500 to-green-700',
        'long-break': 'from-blue-500 to-blue-700'
    };
    return gradients[mode];
}

// Воспроизвести звук
function playSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// Показать уведомление
function showNotification(title, body) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            body: body,
            icon: '🍅'
        });
    }
}

// Обработать завершение таймера
function onTimerComplete() {
    pauseTimer();
    playSound();

    if (state.mode === 'pomodoro') {
        state.pomodoroCount++;
        pomodoroCountDisplay.textContent = state.pomodoroCount;

        showNotification(
            'Помодоро завершено!',
            'Время для перерыва. Отдохните немного!'
        );

        // Автоматически переключиться на перерыв
        if (state.pomodoroCount % 4 === 0) {
            switchMode('long-break');
        } else {
            switchMode('short-break');
        }
    } else {
        showNotification(
            'Перерыв окончен!',
            'Время вернуться к работе!'
        );
        switchMode('pomodoro');
    }
}

// Обработчики событий
startBtn.addEventListener('click', startTimer);
resetBtn.addEventListener('click', resetTimer);

modeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchMode(btn.dataset.mode);
    });
});

// Обработка клавиатуры
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        startTimer();
    } else if (e.code === 'KeyR') {
        e.preventDefault();
        resetTimer();
    }
});

// Инициализация
document.body.className = `transition-bg bg-gradient-to-br ${getModeClasses('pomodoro')}`;
updateDisplay();
