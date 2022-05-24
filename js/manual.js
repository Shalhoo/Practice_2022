const manualBtn = $('.manual-btn'),
      manual    = $('.manual');

manualBtn.on('click', function() {
    if ( $(this).hasClass('is-active') ) {
        $(this).removeClass('is-active');
        manual.slideUp();
    } else {
        $(this).addClass('is-active');
        manual.slideDown();
    }
});

$(document).click(function (e) {
    if ( !manualBtn.is(e.target) && !manual.is(e.target) && manual.has(e.target).length === 0) {
        manual.slideUp();
        manualBtn.removeClass('is-active');
    };
});