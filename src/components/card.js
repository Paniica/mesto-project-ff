
import { likeCard, unlikeCard, removeCard } from './api.js';

export function createCard(
  cardData,
  cardTemplate,
  handleDeleteClick,
  handleImageClick,
  currentUserId
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".card__like-count");

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeCount.textContent = cardData.likes.length;

  // Подсвечиваем, если пользователь уже лайкнул
  if (cardData.likes.some(user => user._id === currentUserId)) {
    likeButton.classList.add("card__like-button_is-active");
  }

  // Удаление только своей карточки
  if (cardData.owner._id !== currentUserId) {
    deleteButton.style.display = "none";
  } else {
    deleteButton.addEventListener("click", () => {
      removeCard(cardData._id)
        .then(() => cardElement.remove())
        .catch(err => console.error("Ошибка удаления карточки:", err));
    });
  }

  // Обработка лайка (встроена прямо здесь)
  likeButton.addEventListener("click", () => {
    const isLiked = likeButton.classList.contains("card__like-button_is-active");
    const action = isLiked ? unlikeCard : likeCard;

    action(cardData._id)
      .then(updatedCard => {
        likeCount.textContent = updatedCard.likes.length;
        likeButton.classList.toggle("card__like-button_is-active");
      })
      .catch(err => console.error("Ошибка при лайке:", err));
  });

  // Открытие картинки
  cardImage.addEventListener("click", () => {
    handleImageClick(cardData.name, cardData.link);
  });

  return cardElement;
}