# language: ru

Функционал: Работа админа с партнерами
  Как Админ Сайта я могу создать,
  удалить и отредактировать Партнера



  @add-partner
  Сценарий: Добавить партнера
    Допустим я авторизован на сайте
    И я должен быть в административной панели
    Тогда нажимаю на кнопку "Добавить партнера"
    И ввожу в поле "Название" значение "Тест"
    И ввожу в поле "Ссылка" значение "https://www.youtube.com/watch?v=h5EofwRzit0"
    И Загружаю изображения
    И нажимаю на кнопку "Добавить"


  @edit-partner
  Сценарий: Отредактировать партнера
    Допустим я авторизован на сайте
    И я должен быть в административной панели
    И я вижу карточку партнера "Astar"
    И я нажимаю на кнопку редактирования партнера "Astar"
    И ввожу в поле "Название" значение "Astar test"
    И ввожу в поле "Ссылка" значение "https://www.test.com"
    И нажимаю на кнопку "Добавить"

  @delete-partner
  Сценарий: Удалить партнера
    Допустим я авторизован на сайте
    И я должен быть в административной панели
    И я вижу карточку партнера "Тест"
    И я нажимаю на кнопку удаления партнера "Тест"
    И нажимаю на кнопку "Удалить"