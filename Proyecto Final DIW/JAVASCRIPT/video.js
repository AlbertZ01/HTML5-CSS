document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('hoverImage');
    const video = document.getElementById('hoverVideo');
    const body = document.body;
    let hoverTimer;

    image.addEventListener('mouseenter', () => {
        hoverTimer = setTimeout(() => {
            image.style.display = 'none';
            video.classList.add('active');
            body.classList.add('blurred');
            video.play();
        }, 5000); // 5 segundos
    });

    image.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimer);
    });

    video.addEventListener('mouseleave', () => {
        video.classList.remove('active');
        video.pause();
        body.classList.remove('blurred');
        image.style.display = 'block';
    });
});