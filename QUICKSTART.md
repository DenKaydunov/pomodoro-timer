# Помодоро Таймер - Быстрый старт

## Первый запуск

1. Установите зависимости:
```bash
npm install
```

2. Соберите проект:
```bash
npm run build
```

3. Откройте `dist/index.html` в браузере

## Разработка

Для разработки с автоматической пересборкой CSS:

```bash
npm run dev
```

Затем откройте `dist/index.html` в браузере и обновляйте страницу после изменений.

## Структура

- `src/` - исходные файлы
  - `input.css` - Tailwind директивы
  - `app.js` - JavaScript логика
- `dist/` - собранное приложение
  - `index.html` - главная страница
  - `output.css` - сгенерированный CSS
  - `app.js` - JavaScript (копируется из src/)

## Полезные команды

- `npm run build` - полная сборка (CSS + копирование JS)
- `npm run build:css` - только сборка CSS
- `npm run copy:js` - только копирование JS
- `npm run dev` - режим разработки с watch

## Технологии

- Tailwind CSS v3 - utility-first CSS
- Vanilla JavaScript - без фреймворков
- Web Audio API - звуковые уведомления
- Notifications API - браузерные уведомления
