const main = document.getElementById('tarjetas');


//Crear los divs para cada imagen
for (let i = 1; i <= 10; i++) {
  const div = document.createElement('div')
  div.className ='tar'
  main.appendChild(div)
 //Carga de Imagenes:
  div.innerHTML=`<img src=./RECURSOS/`+i+`.jpg id='idimg`+i+`' alt="imagenes"></img><div class="input-group mb-3">
            </div>`
}