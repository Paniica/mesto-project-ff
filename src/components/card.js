// Импорты удалены — всё передаётся через параметры

export function createCard(
  { name, link },
  cardTemplate,
  handleDeleteClick,
  handleLikeClick,
  handleImageClick
) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  deleteButton.addEventListener("click", () => handleDeleteClick(cardElement));
  likeButton.addEventListener("click", handleLikeClick);
  cardImage.addEventListener("click", () => handleImageClick(name, link));

  return cardElement;
}
