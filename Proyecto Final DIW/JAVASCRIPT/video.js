// document.addEventListener('DOMContentLoaded', () => {
//     const body = document.body;
//     let hoverTimer;

//     for (let i = 1; i <= 300; i++) {
//         const image = document.getElementById(`hoverImage${i}`);
//         const video = document.getElementById(`hoverVideo${i}`);

//         image.addEventListener('mouseenter', () => {
//             hoverTimer = setTimeout(() => {
//                 image.style.display = 'none';
//                 video.classList.add('active');
//                 body.classList.add('blurred');
//                 video.play();
//             }, 2000); // 2 seconds
//         });

//         image.addEventListener('mouseleave', () => {
//             clearTimeout(hoverTimer);
//         });

//         video.addEventListener('mouseleave', () => {
//             video.classList.remove('active');
//             video.pause();
//             body.classList.remove('blurred');
//             image.style.display = 'block';
//         });

//         video.addEventListener('mouseenter', () => {
//             clearTimeout(hoverTimer);
//         });
//     }
// });