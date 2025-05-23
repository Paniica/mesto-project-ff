import "./pages/index.css";
import { createCard } from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { openModal, closeModal, enablePopupListeners } from "./components/modal.js";

// Обработчики
function deleteCard(cardElement) {
  cardElement.remove();
}

function handleLikeButtonClick(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

// DOM
const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const editProfilePopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.querySelector('form[name="edit-profile"]');
 // 
const nameInput = editProfileForm.querySelector('input[name="name"]');
const jobInput = editProfileForm.querySelector('input[name="description"]');

const addButton = document.querySelector(".profile__add-button");
const addCardPopup = document.querySelector(".popup_type_new-card");
const addCardForm = document.querySelector('form[name="new-place"]');
const placeNameInput = addCardForm.querySelector('input[name="place-name"]');
const placeLinkInput = addCardForm.querySelector('input[name="link"]');

const imagePopup = document.querySelector(".popup_type_image");
const imagePopupImage = imagePopup.querySelector(".popup__image");
const imagePopupCaption = imagePopup.querySelector(".popup__caption");

const popups = document.querySelectorAll(".popup");

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
  const newCard = createCard(
    { name, link },
    cardTemplate,
    deleteCard,
    handleLikeButtonClick,
    handleImageClick
  );
  placesList.prepend(newCard);
  closeModal(addCardPopup);
  addCardForm.reset();
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit); 

addCardForm.addEventListener("submit", handleAddCardSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editProfilePopup);
});

addButton.addEventListener("click", () => openModal(addCardPopup));

enablePopupListeners();

function renderCards() {
  initialCards.forEach((cardData) => {
    const cardElement = createCard(
      cardData,
      cardTemplate,
      deleteCard,
      handleLikeButtonClick,
      handleImageClick
    );
    placesList.append(cardElement);
  });
}
renderCards();
