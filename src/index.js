import "./pages/index.css";
import { createCard } from "./components/card.js";
import { openModal, closeModal, enablePopupListeners } from "./components/modal.js";
import { clearValidation, enableValidation } from "./components/validate.js";
import { getUserInfo, getInitialCards, addCard } from "./components/api.js";
import './blocks/popup/__error/popup__error.css';

const cardTemplate = document.querySelector("#card-template").content;
const placesList = document.querySelector(".places__list");

const editProfilePopup = document.querySelector(".popup_type_edit");
const editButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const editProfileForm = document.querySelector('form[name="edit-profile"]');
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

const avatarPopup = document.querySelector(".popup_type_avatar");
const avatarEditButton = document.querySelector(".profile__image-edit-button");
const avatarForm = document.querySelector("form[name='avatar-update']");

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible"
};

function deleteCard(cardElement) {
  cardElement.remove();
}

function handleImageClick(name, link) {
  imagePopupImage.src = link;
  imagePopupImage.alt = name;
  imagePopupCaption.textContent = name;
  openModal(imagePopup);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(editProfilePopup);
}

let currentUserId = null;

function renderLoading(isLoading, button, text = "Сохранить") {
  button.textContent = isLoading ? "Сохранение..." : text;
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const submitButton = evt.submitter;
  renderLoading(true, submitButton, "Создать");

  addCard(name, link)
    .then(cardData => {
      const newCard = createCard(
        cardData,
        cardTemplate,
        deleteCard,
        handleImageClick,
        currentUserId
      );
      placesList.prepend(newCard);
      closeModal(addCardPopup);
      addCardForm.reset();
    })
    .catch(err => {
      console.error("Ошибка при добавлении карточки:", err);
    })
    .finally(() => {
      renderLoading(false, submitButton, "Создать");
    });
}

editProfileForm.addEventListener("submit", handleProfileFormSubmit);
addCardForm.addEventListener("submit", handleAddCardSubmit);

editButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationConfig);
  openModal(editProfilePopup);
});

addButton.addEventListener("click", () => {
  addCardForm.reset();
  clearValidation(addCardForm, validationConfig);
  openModal(addCardPopup);
});

avatarEditButton.addEventListener("click", () => {
  avatarForm.reset();
  clearValidation(avatarForm, validationConfig);
  openModal(avatarPopup);
});

enablePopupListeners();
enableValidation(validationConfig);

getUserInfo()
  .then(user => {
    currentUserId = user._id;
    return getInitialCards();
  })
  .then(cards => {
    cards.forEach(cardData => {
      const cardElement = createCard(
        cardData,
        cardTemplate,
        deleteCard,
        handleImageClick,
        currentUserId
      );
      placesList.append(cardElement);
    });
  })
  .catch(err => {
    console.error("Ошибка при загрузке карточек:", err);
  });
