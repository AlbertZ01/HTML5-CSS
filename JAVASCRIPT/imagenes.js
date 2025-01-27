document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('tarjetas');

  // Crear un contenedor para mostrar el video en el centro
  const videoOverlay = document.createElement('div');
  videoOverlay.id = 'videoOverlay';
  videoOverlay.style.position = 'fixed';
  videoOverlay.style.top = '50%';
  videoOverlay.style.left = '50%';
  videoOverlay.style.transform = 'translate(-50%, -50%)';
  videoOverlay.style.zIndex = '1000';
  videoOverlay.style.display = 'none';
  videoOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
  videoOverlay.style.padding = '5px';
  videoOverlay.style.borderRadius = '10px';
  videoOverlay.style.width = '80%';
  videoOverlay.style.height = '50%';

  const overlayVideo = document.createElement('video');
  overlayVideo.id = 'overlayVideo';
  overlayVideo.controls = true;
  overlayVideo.style.width = '100%';
  overlayVideo.style.height = '100%';
  overlayVideo.style.borderRadius = '30px';

  videoOverlay.appendChild(overlayVideo);
  document.body.appendChild(videoOverlay);
  
  // Crear el botón de cierre
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×';
  closeButton.id = 'closeButton';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px';
  closeButton.style.right = '10px';
  closeButton.style.width = '40px';
  closeButton.style.height = '40px'; 
  closeButton.style.backgroundColor = 'rgba(144, 238, 144, 0.6)';
  closeButton.style.color = 'white';
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '50%';
  closeButton.style.fontSize = '24px';
  closeButton.style.cursor = 'pointer';
  closeButton.style.transition = 'background-color 0.3s ease'; 

  // Agregar el evento de cierre del video
  closeButton.addEventListener('click', () => {
    videoOverlay.style.display = 'none';
    overlayVideo.pause();
    overlayVideo.src = '';
  });

  for (let i = 1; i <= 300; i++) {
    // Crear la imagen
    const img = document.createElement('img');
    img.src = `./RECURSOS/imagen (${i}).jpg`;
    img.id = `hoverImage${i}`;
    img.classList.add('tar', 'image');
    img.alt = `Imagen ${i}`;
    img.dataset.index = i;
    img.style.cursor = 'pointer'; 

    // Agregar evento de clic para pasar el data-index a la URL
    img.addEventListener('click', () => {
      // Obtener el valor del data-index de la imagen
      const index = img.dataset.index;

      // Redirigir a la página con el parámetro data-index
      window.location.href = `./PAGINAS/pelicula.html?index=${index}`;
    });

    main.appendChild(img);

    // Crear el video
    const video = document.createElement('video');
    video.id = `hoverVideo${i}`;
    video.classList.add('video');
    video.loop = true;
    video.dataset.index = i;

    const source = document.createElement('source');
    source.src = `./RECURSOS/video (${i}).mp4`;
    source.type = 'video/mp4';
    video.appendChild(source);

    // Mostrar video en el centro al hacer hover sobre la imagen con un retraso de 5 segundos
    let hoverTimeout;
    img.addEventListener('mouseenter', () => {
      hoverTimeout = setTimeout(() => {
        overlayVideo.src = `./RECURSOS/video (${i}).mp4`;
        overlayVideo.play();
        videoOverlay.style.display = 'flex';
      }, 5000); 
    });

    img.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout); 
    });

    // Agregar la imagen y el video al main
    videoOverlay.appendChild(closeButton);
    main.appendChild(img);
    main.appendChild(video);
  }
});
