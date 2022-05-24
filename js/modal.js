

(function () {
      var elemTarget;
      // создаём модальное окно
      var modal = $modal({
        title: 'Установите значения',
        content: '<img src="" alt="" style="display: block; height: auto; max-width: 100%;">',
        footerButtons: [
          { class: 'btn btn__delete', text: 'Удалить', handler: 'modalHandlerDelete' },
          { class: 'btn btn__cancel', text: 'Закрыть', handler: 'modalHandlerCancel' }
        ]
      });
      // при клике на документ
      document.addEventListener('click', function (e) {
        // если мы кликнули на изобржение расположенное в .img__items, то...
        if (e.target.matches('.img__items img')) {
          elemTarget = e.target;
          // устанавливаем модальному окну title
          modal.setContent('<div style="flex: 1 0 60%;"><img src="' + e.target.src + '" alt="' + e.target.alt + '" style="display: block; height: auto; max-width: 100%; margin: 0 auto;"></div><div style="flex: 1 0 40%;"><div style="font-size: 18px; font-weight:bold;">' + e.target.dataset.name + '</div>Цена:<br><b>' + e.target.dataset.price + '$</b></div>');
          modal.show();
        } else if (e.target.dataset.handler === 'modalHandlerCancel') {
          modal.hide();
        } else if (e.target.dataset.handler === 'modalHandlerDelete') {
          elemTarget.parentElement.parentElement.removeChild(elemTarget.parentElement);
          modal.hide();
        }
      });
    })();