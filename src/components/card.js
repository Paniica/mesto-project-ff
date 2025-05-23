import { handleImageClick } from './modal.js';

// Удаляет карточку из DOM
export function deleteCard(cardElement) {
  cardElement.remove();
}

// Переключает состояние кнопки лайка
export function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// Создаёт и возвращает карточку с обработчиками
export function createCard({ name, link }, cardTemplate) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", () => deleteCard(cardElement));
  likeButton.addEventListener("click", handleLikeButtonClick);
  cardImage.addEventListener("click", () => handleImageClick(name, link));

  return cardElement;
}