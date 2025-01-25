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
  videoOverlay.style.width = '80%'; // Aumenta el tamaño del contenedor
  videoOverlay.style.height = '50%'; // Aumenta el tamaño del contenedor

  const overlayVideo = document.createElement('video');
  overlayVideo.id = 'overlayVideo';
  overlayVideo.controls = true;
  overlayVideo.style.width = '100%'; // El video ocupará todo el ancho del contenedor
  overlayVideo.style.height = '100%'; // El video ocupará todo el alto del contenedor
  overlayVideo.style.borderRadius = '30px'; // Bordes redondeados para el video

  videoOverlay.appendChild(overlayVideo);
  document.body.appendChild(videoOverlay);
  
  // Crear el botón de cierre
  const closeButton = document.createElement('button');
  closeButton.innerHTML = '×'; // La "X" dentro del botón
  closeButton.id = 'closeButton';
  closeButton.style.position = 'absolute';
  closeButton.style.top = '10px'; // Posicionar en la parte superior
  closeButton.style.right = '10px'; // Posicionar en la parte derecha
  closeButton.style.width = '40px'; // Ancho del botón
  closeButton.style.height = '40px'; // Alto del botón
  closeButton.style.backgroundColor = 'rgba(144, 238, 144, 0.6)'; // Verde claro transparente
  closeButton.style.color = 'white'; // Color de la "X"
  closeButton.style.border = 'none';
  closeButton.style.borderRadius = '50%'; // Hacer el botón redondo
  closeButton.style.fontSize = '24px'; // Tamaño de la "X"
  closeButton.style.cursor = 'pointer'; // Cambiar el cursor a puntero
  closeButton.style.transition = 'background-color 0.3s ease'; // Efecto de transición para hover

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
    img.style.cursor = 'pointer'; // Hacer que el cursor sea tipo puntero

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
      }, 5000); // Retraso de 5 segundos
    });

    img.addEventListener('mouseleave', () => {
      clearTimeout(hoverTimeout); // Cancelar el retraso si el mouse sale antes de los 5 segundos
    });

    // Agregar la imagen y el video al main
    videoOverlay.appendChild(closeButton);
    main.appendChild(img);
    main.appendChild(video);
  }
});
