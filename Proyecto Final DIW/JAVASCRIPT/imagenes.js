document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('tarjetas');

  for (let i = 1; i <= 300; i++) {
    const img = document.createElement('img');

    img.src = `./RECURSOS/imagen (${i}).jpg`;
    img.id = `hoverImage${i}`;
    img.classList.add('tar', 'image');
    img.alt = `Imagen ${i}`;
    img.dataset.index = i;
    main.appendChild(img);


    const a = document.createElement('a');

    a.href = `./PAGINAS/pelicula${i}.html`;

    img.appendChild(a);

    const video = document.createElement('video');
    video.id = `hoverVideo${i}`;
    video.classList.add('video');
    video.loop = true;
    video.dataset.index = i; // Add data attribute to store index

    const source = document.createElement('source');
    source.src = `./RECURSOS/video (${i}).mp4`;
    source.type = 'video/mp4';
    video.appendChild(source);

    main.appendChild(video);
  }
});