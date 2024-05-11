$(document).ready(function() {
    const tableBody = $('tbody');
    const nav = $('nav');
    const body = $('body');

    function showNav() {
        nav.addClass('visible');
    }

    function hideNav() {
        nav.removeClass('visible');
    }

    nav.hover(showNav, hideNav);


});
let input = document.getElementById('input');
const rotatingImage = document.getElementById('rotating-image');
const keyframes = [
{ transform: 'rotate(0deg)' },
{ transform: 'rotate(360deg)' }
];
const timing = {
duration: 5000, // Продолжительность анимации в миллисекундах
iterations: Infinity // Сколько раз анимация должна повторяться
};

const keyframeEffect = new KeyframeEffect(rotatingImage, keyframes, timing);

const animation = new Animation(keyframeEffect, document.timeline);
animation.play();



function appendNumber(number) {
input.value += number;
}

function appendOperator(operator) {
input.value += operator;
}

function clearInput() {
input.value = '';
}

function calculate() {
try {
input.value = eval(input.value);
} catch (error) {
input.value = 'Error';
}
}