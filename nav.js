
$(document).ready(function() {
    const nav = $('nav');

    function showNav() {
        nav.addClass('visible');
    }

    function hideNav() {
        nav.removeClass('visible');
    }

    nav.hover(showNav, hideNav);

});