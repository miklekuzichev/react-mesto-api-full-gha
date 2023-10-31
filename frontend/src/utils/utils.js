export const BASE_URL = "http://miklekuzichev.mesto.nomoredomainsrocks.ru"; //Базовый URL

//
// Функция отображения ошибок и отображения текста кнопки сабмита
//
export default function handleSubmit(
  request,
  popupInstance,
  loadingText = "Сохранение...",
) {
  // изменяем текст кнопки до вызова запроса
  popupInstance.load(true, loadingText);
  request()
    .then(() => {
      // закрывать попап нужно только в `then`
      popupInstance.close();
    })
    .catch(console.error)
    // в каждом запросе в `finally` нужно возвращать обратно начальный текст кнопки
    .finally(() => {
      popupInstance.load(false);
    });
}
