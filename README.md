# storage

Минималистичное Vue 3 приложение для загрузки и управления файлами в Firebase Storage.

[**➡️ Посмотреть демо**](https://storage-beige.vercel.app/)

## Технологии

- Vue 3 + Vite
- Pinia и Vue Router
- Tailwind CSS, vue-inline-svg
- Firebase Storage
- TypeScript, ESLint, Prettier

## Возможности

- Drag'n'drop и диалог выбора файлов
- Список с именем, размером и датой загрузки
- Скачивание и удаление файлов
- Состояние хранится в Pinia

## Установка

1. `yarn`
2. Создайте `.env` и пропишите ключи Firebase:

```bash
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

## Запуск

```bash
yarn dev       # разработка
yarn build     # сборка
yarn preview   # просмотр
yarn lint      # линтинг
```

Проект разделён на компоненты и composables для удобной поддержки.
