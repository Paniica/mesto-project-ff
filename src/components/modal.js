
// Открывает модальное окно и добавляет обработчик Esc
export function openModal(popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

// Закрывает модальное окно и удаляет обработчик Esc
export function closeModal(popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
}

// Обработчик закрытия модального окна по клавише Escape
function handleEscClose(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) closeModal(openedPopup);
  }
}

// Открывает попап с изображением и подставляет данные
export function handleImageClick(name, link) {
  const popupImage = document.querySelector('.popup__image');
  const popupCaption = document.querySelector('.popup__caption');
  const imagePopup = document.querySelector('.popup_type_image');

  popupImage.src = link;
  popupImage.alt = name;
  popupCaption.textContent = name;

  openModal(imagePopup);
}

// Навешивает обработчики закрытия попапов на оверлей и крестик
export function enablePopupListeners() {
  const popups = document.querySelectorAll('.popup');

  popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
      if (evt.target === popup) closeModal(popup);
    });

    const closeButton = popup.querySelector('.popup__close');
    if (closeButton) {
      closeButton.addEventListener('click', () => closeModal(popup));
    }
  });
}
