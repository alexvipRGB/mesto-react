Mesto
Обзор
Mesto - это фотохостинг, отображающий пользователю набор постов с фотографиями/изображениями их названиями и лайками.
Полное описание проекта можно посмотреть здесь
Данный репозиторий представляет собой порт на React.js.

Основной функционал
загрузка списка постов с сервера,
редактирование профиля пользователя (Имя, описание, аватар)
добавление/удаление нового поста с фотографией места (пользователь может удалять только свои посты),
просмотр изображения в оригинальном размере,
возможность отмечать посты лайком.
Какие возможности React.js использовались
При портировании в react app использовались функциональные компоненты с хуками состояния и эффектов.
HTML разметка описывается посредством JSX (расширение javascript).
При создании компонентов применялся метод поднятия стейта. Стейт-переменные были вынесены в родительский компонент App. Значения и обработчики пробрасываются в компоненты через "пропсы".