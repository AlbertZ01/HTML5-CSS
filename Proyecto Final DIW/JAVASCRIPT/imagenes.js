document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('tarjetas');

  for (let i = 1; i <= 300; i++) {
    const img = document.createElement('img');

    img.src = `./RECURSOS/imagen (${i}).jpg`;
    img.id = 'hoverImage';
    img.classList.add('tar', 'image');  // Añadimos ambas clases 'card-img-top' y 'tar'
    img.alt = `Imagen ${i}`;

    main.appendChild(img);

    // Crear video con clase video, id hoverVideo, y loop
    const video = document.createElement('video');
    video.className = 'video';
    video.id = 'hoverVideo';
    video.loop = true;

    // Agregar etiqueta source al video
    const source = document.createElement('source');
    source.src = `./RECURSOS/video (${i}).mp4`;
    source.type = 'video/mp4';
    video.appendChild(source);

    // Añadir el video al contenedor "tarjetas"
    tarjetas.appendChild(video);
  }

});
