import "./pages/index.css";
import { createCard, deleteCard, handleLikeButtonClick } from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { openModal, closeModal, enablePopupListeners } from "./components/modal.js";

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const editProfilePopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const formElement = document.querySelector('form[name="edit-profile"]');
const nameInput = formElement.querySelector('input[name="name"]');
const jobInput = formElement.querySelector('input[name="description"]');

const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector('form[name="new-place"]');
const placeNameInput = addCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = addCardForm.querySelector('input[name="link"]');

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const popups = document.querySelectorAll(".popup");

//Открывает попап с изображением по клику на картинку
function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// Обрабатывает отправку формы редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = placeLinkInput.value;
  const newCard = createCard({ name, link }, cardTemplate);
  placesList.prepend(newCard);
  closeModal(addCardPopup);
  addCardForm.reset();
}

formElement.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

addButton.addEventListener("click", () => openModal(addCardPopup));

// Включает обработчики закрытия
enablePopupListeners();

function renderCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(cardData, cardTemplate);
    placesList.append(cardElement);
  });
}
renderCards();