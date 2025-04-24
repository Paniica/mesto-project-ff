const cardsContainer = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

function createCard({ name, link }) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = link;
  cardImage.alt = name;
  cardTitle.textContent = name;

  return cardElement;
}

initialCards.forEach((cardData) => {
  const card = createCard(cardData);
 cardsContainer.append(card);
  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => {
    card.remove();
  });
});




// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу
