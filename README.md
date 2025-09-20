# 📊 Finance Dashboard

**Vue 3 SPA приложение для анализа финансовых данных с графиками и фильтрами.**

## Особенности

- Vue 3 с Composition API
- Vue Router для навигации между страницами
- Pinia для управления состоянием
- Chart.js для визуализации данных
- Фильтрация и пагинация данных

## Установка и запуск

`bash`

## Установка зависимостей

`npm install`

## Запуск

`npm run dev`

## Сборка для production

`npm run build`

## Структура проекта

- src/
- - components/
- - - DataTable.vue
- - - BarChart.vue
- - - PaginationControls.vue
- - - DataFilters.vue
- pages/
- - IncomesPage.vue
- - OrdersPage.vue
- - SalesPage.vue
- - StocksPage.vue
- stores/
- - apiDataStore.js
- router/
- - index.js

## Технологии

- Vue 3 - основной фреймворк
- Vite - сборка и dev server
- Pinia - управление состоянием
- Vue Router - маршрутизация
- Axios - HTTP-запросы
- Chart.js + vue-chartjs - графики
- Sass/SCSS - стилизация

## API

Приложение использует внешнее API:

- Базовый URL: http://109.73.206.144:6969/api
- Эндпоинты: /incomes, /orders, /sales, /stocks
- Аутентификация через API-ключ
