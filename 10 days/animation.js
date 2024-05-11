function animateLoadingIndicator() {
    const spinner = document.querySelector('#loading-indicator .spinner');
    let angle = 0;

    const animationFrame = requestAnimationFrame(() => {
        angle += 5; // Adjust speed as needed
        spinner.style.transform = `rotate(${angle}deg)`;

        if (document.getElementById('loading-indicator').classList.contains('hidden')) {
            cancelAnimationFrame(animationFrame);
        } else {
            requestAnimationFrame(animateLoadingIndicator);
        }
    });
}
    