document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('tarjetas');

  for (let i = 1; i <= 300; i++) {
    const img = document.createElement('img');

    img.src = `./RECURSOS/imagen (${i}).jpg`;
    img.classList.add('tar');  // Añadimos ambas clases 'card-img-top' y 'tar'
    img.alt = `Imagen ${i}`;

    main.appendChild(img);
  }
});
