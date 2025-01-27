document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const peliculaId = urlParams.get('index');

  if (peliculaId) {
    fetch('../JAVASCRIPT/peliculas.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        return response.json();
      })
      .then(peliculas => {
        const pelicula = peliculas[`pelicula${peliculaId}`];

        if (pelicula) {
          // Rellenar el nombre de la película
          document.getElementById('nombrePelicula').textContent = pelicula.nombre;
          document.getElementById('nombrePelicula').style.backgroundColor = '#e6e6e6';
          // Rellenar la descripción de la película

          const descripcionPelicula = document.getElementById('descripcionPelicula');
          descripcionPelicula.textContent = pelicula.descripcion;
          descripcionPelicula.style.backgroundColor = '#e6e6e6';

          const tituloDescripcion = document.createElement('h1');
          tituloDescripcion.textContent = `Descripción`;

          // Inserta el <h1> antes del contenido actual
          descripcionPelicula.insertBefore(tituloDescripcion, descripcionPelicula.firstChild);


          // Crear el carrusel de reseñas
          const reseñasContainer = document.getElementById('reseñas');
          const reseñasWrapper = document.createElement('div');
          reseñasWrapper.classList.add('reseñas-wrapper');

          let currentReseñaIndex = 0;
          let reseñasInterval;

          pelicula.reseñas.forEach((reseña, index) => {
            const reseñaDiv = document.createElement('div');
            reseñaDiv.classList.add('reseña-item', 'border-0');
            reseñaDiv.style.display = index === 0 ? 'block' : 'none';

            // Crear contenedor de estrellas
            const estrellasContainer = document.createElement('div');
            estrellasContainer.classList.add('estrellas-container');

            for (let i = 1; i <= 5; i++) {
              const estrella = document.createElement('img');
              estrella.src = '../RECURSOS/star.png'; 
              estrella.alt = 'Estrella';
              estrella.classList.add('estrella');
              estrella.style.opacity = i <= reseña.valoracion ? '1' : '0.5';
              estrella.style.width = '20px';
              estrella.style.height = '20px';
              estrellasContainer.appendChild(estrella);
            }

            // Agregar contenedor de estrellas al div de reseña
            reseñaDiv.appendChild(estrellasContainer);

            const usuario = document.createElement('h1');
            usuario.style.textAlign = 'left';
            usuario.classList.add('usuario-reseña');
            usuario.textContent = `@${reseña.usuario}: `;

            const comentarioResumen = document.createElement('p');
            comentarioResumen.textContent = reseña.comentario.length > 50
              ? reseña.comentario.substring(0, 50) + '...'
              : reseña.comentario;

            const comentarioCompleto = document.createElement('p');
            comentarioCompleto.textContent = reseña.comentario;
            comentarioCompleto.style.display = 'none';

            const verMasButton = document.createElement('button');
            verMasButton.textContent = 'Ver más';
            verMasButton.classList.add('ver-mas-button');
            verMasButton.style.background = '#D3FFB8';
            verMasButton.style.border = 'none';
            verMasButton.style.borderRadius = '5px';
            verMasButton.style.padding = '5px 10px';
            verMasButton.style.cursor = 'pointer';
            verMasButton.style.color = '#000';
            verMasButton.addEventListener('click', () => {
              const isExpanded = comentarioCompleto.style.display === 'block';
              comentarioCompleto.style.display = isExpanded ? 'none' : 'block';
              verMasButton.textContent = isExpanded ? 'Ver más' : 'Ver menos';
              comentarioResumen.style.display = isExpanded ? 'block' : 'none';
            });

            reseñaDiv.appendChild(usuario);
            reseñaDiv.appendChild(comentarioResumen);
            reseñaDiv.appendChild(comentarioCompleto);
            reseñaDiv.appendChild(verMasButton);

            reseñasWrapper.appendChild(reseñaDiv);
          });

          reseñasContainer.appendChild(reseñasWrapper);

          // Función para cambiar reseña
          const reseñas = reseñasWrapper.querySelectorAll('.reseña-item');
          const totalReseñas = reseñas.length;

          const cambiarReseña = () => {
            reseñas[currentReseñaIndex].style.display = 'none';
            currentReseñaIndex = (currentReseñaIndex + 1) % totalReseñas;
            reseñas[currentReseñaIndex].style.display = 'block';
          };

          // Inicializar el intervalo con 7 segundos
          const iniciarCarrusel = () => {
            reseñasInterval = setInterval(cambiarReseña, 7000);
          };

          // Detener el intervalo
          const detenerCarrusel = () => {
            clearInterval(reseñasInterval);
          };

          // Inicializar el carrusel al cargar
          iniciarCarrusel();

          // Detener el carrusel al pasar el ratón por encima
          reseñasWrapper.addEventListener('mouseenter', detenerCarrusel);

          // Reanudar el carrusel al sacar el ratón
          reseñasWrapper.addEventListener('mouseleave', iniciarCarrusel);

          // Crear el carrusel de imágenes y videos
          const imagenesContainer = document.getElementById('imagenesPelicula');
          const carouselWrapper = document.createElement('div');
          carouselWrapper.classList.add('carousel-wrapper');

          const leftArrow = document.createElement('button');
          leftArrow.classList.add('carousel-arrow', 'left');
          leftArrow.textContent = '⬅';

          const rightArrow = document.createElement('button');
          rightArrow.classList.add('carousel-arrow', 'right');
          rightArrow.textContent = '➡';

          const mediaWrapper = document.createElement('div');
          mediaWrapper.classList.add('media-wrapper');

          // Crear los elementos del carrusel de imágenes
          pelicula.imagenes.forEach((imagen, index) => {
            const img = document.createElement('img');
            img.src = imagen;
            img.alt = `Imagen ${index + 1}`;
            img.classList.add('carousel-item');
            mediaWrapper.appendChild(img);
          });

          // Crear los elementos del carrusel de videos
          pelicula.videos.forEach((video, index) => {
            const videoElement = document.createElement('video');
            videoElement.src = video;
            videoElement.classList.add('carousel-item');
            videoElement.controls = true; // Añadir controles de video
            mediaWrapper.appendChild(videoElement);
          });

          carouselWrapper.appendChild(leftArrow);
          carouselWrapper.appendChild(mediaWrapper);
          carouselWrapper.appendChild(rightArrow);
          imagenesContainer.appendChild(carouselWrapper);

          // Lógica del carrusel de medios (imágenes y videos)
          let currentMediaIndex = 0;
          const mediaItems = mediaWrapper.querySelectorAll('.carousel-item');
          const totalMediaItems = mediaItems.length;

          const updateCarousel = () => {
            mediaItems.forEach((item, index) => {
              item.style.display = index === currentMediaIndex ? 'block' : 'none';
            });
          };

          leftArrow.addEventListener('click', () => {
            currentMediaIndex = (currentMediaIndex - 1 + totalMediaItems) % totalMediaItems;
            updateCarousel();
          });

          rightArrow.addEventListener('click', () => {
            currentMediaIndex = (currentMediaIndex + 1) % totalMediaItems;
            updateCarousel();
          });

          updateCarousel();

          // Crear la lista de enlaces con botones
          const enlacesContainer = document.getElementById('enlaces');
          const ul = document.createElement('ul');
          pelicula.enlaces.forEach(enlace => {
            const li = document.createElement('li');
            li.style.display = 'flex';
            li.style.alignItems = 'center';
            li.style.marginBottom = '10px';

            const linkButton = document.createElement('button');
            linkButton.textContent = 'Ver en🎬';
            linkButton.style.marginRight = '10px';
            linkButton.style.background = '#D3FFB8';
            linkButton.style.color = '#000';
            linkButton.style.border = 'none';
            linkButton.style.padding = '5px 10px';
            linkButton.style.cursor = 'pointer';
            linkButton.style.borderRadius = '5px';

            linkButton.addEventListener('click', () => {
              window.open(enlace.url, '_blank');
            });

            const link = document.createElement('a');
            link.href = enlace.url;
            link.textContent = enlace.texto;
            link.style.textDecoration = 'none';
            link.style.color = '#000';

            li.appendChild(linkButton);
            li.appendChild(link);
            ul.appendChild(li);
          });
          enlacesContainer.appendChild(ul);

          // Crear el formulario para compartir reseña
          const compartirReseña = document.getElementById('compartirReseña');
          const form = document.createElement('form');
          form.classList.add('compartir-reseña-form');

          const nombreFormulario = document.createElement('h1');
          nombreFormulario.textContent = 'Comparte tu reseña!';
          form.appendChild(nombreFormulario);

          // Nombre completo
          const nombreCompletoInput = document.createElement('input');
          nombreCompletoInput.type = 'text';
          nombreCompletoInput.placeholder = 'Nombre completo';
          nombreCompletoInput.required = true;
          form.appendChild(nombreCompletoInput);

          // Nombre de usuario
          const nombreUsuarioInput = document.createElement('input');
          nombreUsuarioInput.type = 'text';
          nombreUsuarioInput.placeholder = 'Se visualizará para todos';
          nombreUsuarioInput.required = true;
          form.appendChild(nombreUsuarioInput);

          // Reseña
          const reseñaTextarea = document.createElement('textarea');
          reseñaTextarea.maxLength = 500;
          reseñaTextarea.placeholder = 'Escribe tu reseña (máximo 500 palabras)';
          reseñaTextarea.required = true;
          form.appendChild(reseñaTextarea);

          // Estrellas
          const estrellasFormContainer = document.createElement('div');
          estrellasFormContainer.classList.add('estrellas-form-container');

          for (let i = 1; i <= 5; i++) {
            const estrellaInput = document.createElement('img');
            estrellaInput.src = '../RECURSOS/star.png';
            estrellaInput.alt = `Estrella ${i}`;
            estrellaInput.style.width = '20px';
            estrellaInput.style.height = '20px';
            estrellaInput.classList.add('estrella-form');
            estrellaInput.dataset.value = i;
            estrellaInput.style.opacity = '0.5';

            estrellaInput.addEventListener('click', () => {
              const estrellas = estrellasFormContainer.querySelectorAll('.estrella-form');
              estrellas.forEach((estrella, index) => {
                estrella.style.opacity = index < i ? '1' : '0.5';
              });
            });

            estrellasFormContainer.appendChild(estrellaInput);
          }

          form.appendChild(estrellasFormContainer);

          // Botón publicar
          const publicarButton = document.createElement('button');
          publicarButton.type = 'submit';
          publicarButton.textContent = 'Publicar';
          publicarButton.style.marginRight = '10px';
          publicarButton.style.background = '#D3FFB8';
          publicarButton.style.color = '#000';
          publicarButton.style.border = 'none';
          publicarButton.style.padding = '5px 10px';
          publicarButton.style.cursor = 'pointer';
          publicarButton.style.borderRadius = '5px';
          form.appendChild(publicarButton);

          // Añadir el formulario al div compartirReseña
          compartirReseña.appendChild(form);

          // Estilo del formulario para estar en fila
          form.style.display = 'flex';
          form.style.flexDirection = 'column';
          form.style.alignItems = 'left';
          form.style.gap = '10px';
          nombreCompletoInput.style.flex = '1';
          nombreUsuarioInput.style.flex = '1';
          reseñaTextarea.style.flex = '2';
          estrellasFormContainer.style.flex = '1';
          publicarButton.style.flex = '0';
        } else {
          console.error('Película no encontrada con el ID:', peliculaId);
        }
      })
      .catch(error => {
        console.error('Error al cargar el archivo JSON:', error);
      });
  } else {
    console.error('No se proporcionó el ID de la película en la URL');
  }
});
