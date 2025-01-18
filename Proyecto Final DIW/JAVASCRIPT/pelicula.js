document.addEventListener('DOMContentLoaded', () => {
  // Obtener el ID de la película desde los parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const peliculaId = urlParams.get('index'); // Obtener el 'index' del query string

  console.log('ID de película obtenido de la URL:', peliculaId); // Depuración para verificar que el ID se obtiene correctamente
  
  if (peliculaId) {
    // Buscar la película en el JSON
    fetch('../JAVASCRIPT/peliculas.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el archivo JSON');
        }
        return response.json();
      })
      .then(peliculas => {
        // Mostrar las claves del JSON para verificar que lo que obtenemos es correcto
        console.log('Películas cargadas:', peliculas);
        
        // Buscar la película usando el ID dinámico en el JSON
        const pelicula = peliculas[`pelicula${peliculaId}`]; // Buscar con la clave 'peliculaX' donde X es el id
        
        if (pelicula) {
          // Mostrar los detalles de la película
          const peliculaDetails = document.getElementById('peliculaDetails');
          
          // Verificar que el contenedor existe
          if (!peliculaDetails) {
            console.error('Contenedor "peliculaDetails" no encontrado en el DOM');
            return;
          }
          
          // Crear y mostrar el encabezado (header)
          const titleHeader = document.createElement('h1');
          titleHeader.textContent = pelicula.header.title;

          const image = document.createElement('img');
          if (pelicula.header.image) { // Verificar si la imagen está definida
            image.src = pelicula.header.image;
            image.alt = pelicula.header.title;
          } else {
            console.warn('Imagen no definida para el encabezado');
          }

          // Crear y mostrar el cuerpo (body)
          const titleBody = document.createElement('h2');
          titleBody.textContent = pelicula.body.title;

          const description = document.createElement('p');
          description.textContent = pelicula.body.description;

          // Crear y mostrar el carrusel de imágenes y videos
          const mediaContainer = document.createElement('div');
          mediaContainer.classList.add('carousel-container');

          // Flechas de navegación
          const leftArrow = document.createElement('button');
          leftArrow.classList.add('carousel-arrow', 'left');
          leftArrow.textContent = '◁';
          const rightArrow = document.createElement('button');
          rightArrow.classList.add('carousel-arrow', 'right');
          rightArrow.textContent = '▷';

          // Contenedor del carrusel
          const mediaWrapper = document.createElement('div');
          mediaWrapper.classList.add('carousel-wrapper');

          // Agregar elementos de medios al carrusel
          pelicula.body.videos_and_images.forEach((media, index) => {
            if (media) { // Verificar si el archivo de media está definido
              const mediaElement = document.createElement(media.includes('mp4') ? 'video' : 'img');
              if (media.includes('mp4')) {
                mediaElement.controls = true;
                mediaElement.src = media;
              } else {
                mediaElement.src = media;
                mediaElement.alt = 'Image';
              }
              mediaElement.classList.add('carousel-item');
              mediaWrapper.appendChild(mediaElement);
            }
          });

          // Función para cambiar el carrusel con las flechas
          let currentIndex = 0;
          const mediaItems = mediaWrapper.querySelectorAll('.carousel-item');
          const totalItems = mediaItems.length;

          const updateCarousel = () => {
            mediaItems.forEach((item, index) => {
              item.style.display = index === currentIndex ? 'block' : 'none';
            });
          };

          // Función para mover a la izquierda
          leftArrow.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateCarousel();
          });

          // Función para mover a la derecha
          rightArrow.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
          });

          // Inicializar el carrusel
          updateCarousel();

          // Crear y mostrar el carrusel de comentarios
          const commentsContainer = document.createElement('div');
          commentsContainer.classList.add('comments-carousel');
          pelicula.body.comments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment-item');
            const user = document.createElement('strong');
            user.textContent = comment.user;
            const commentText = document.createElement('p');
            commentText.textContent = comment.comment;
            commentElement.appendChild(user);
            commentElement.appendChild(commentText);
            commentsContainer.appendChild(commentElement);
          });

          // Crear y mostrar los enlaces
          const linksContainer = document.createElement('div');
          pelicula.body.links.forEach(link => {
            const linkElement = document.createElement('a');
            linkElement.href = link.url;
            linkElement.textContent = link.text;
            linkElement.target = '_blank'; // Abrir en una nueva pestaña
            linksContainer.appendChild(linkElement);
          });

          // Agregar todos los elementos al contenedor de detalles
          peliculaDetails.appendChild(titleHeader);
          peliculaDetails.appendChild(image);
          peliculaDetails.appendChild(titleBody);
          peliculaDetails.appendChild(description);
          peliculaDetails.appendChild(leftArrow);
          peliculaDetails.appendChild(mediaWrapper);
          peliculaDetails.appendChild(rightArrow);
          peliculaDetails.appendChild(commentsContainer);
          peliculaDetails.appendChild(linksContainer);

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
