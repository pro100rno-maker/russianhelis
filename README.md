
# RussianHelis — lightweight source (no node_modules)

Next.js 14 + TailwindCSS. RU/EN лендинг + витрина.

## Локальный запуск
```bash
npm i
npm run dev
# http://localhost:3000
```

## Продакшн
```bash
npm run build
npm start
```

## Деплой на Vercel
1) Залейте проект в GitHub.
2) В Vercel: New Project → репозиторий → Deploy.
3) В Settings → Domains добавьте `russianhelis.com` и настройте DNS у регистратора.

## Где редактировать
- `app/page.tsx` — весь контент (RU/EN в DICT, каталог в INVENTORY).
- Фотографии — положите свои файлы в `public/img/...` и обновите пути.
