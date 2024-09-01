function obtenerSieteDias() {
  const days = [];
  const today = new Date();
  const formatter = new Intl.DateTimeFormat('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    for (let i = 0; i < 7; i++) {
      let day = new Date(today);
      day.setDate(today.getDate() + i);
      days.push(formatter.format(day));
    }
    return days;
}

document.getElementById('selectCancha').addEventListener('change', function() {
  var valorSeleccionado = this.value;
  mostrarOpcionesReservas(valorSeleccionado);
});

function mostrarOpcionesReservas(numeroCancha) {
  var contenedorReservas = document.getElementById('listasReservasDiarias');
  // Limpia el contenedor antes de agregar nuevas listas
  contenedorReservas.innerHTML = '';

  // Obtener los próximos 7 días
  const dias = obtenerSieteDias();

  if (numeroCancha != 0) {
  
    fetch('reservas.php').then(response => response.json()).then(reservas => {

      for (let i = 0; i < dias.length; i++) {
        // Crear un nuevo contenedor para cada día
        var diaContenedor = document.createElement('div');
        diaContenedor.className = 'dia-semana';
        
        // Crear un encabezado para el día
        var encabezadoDia = document.createElement('h3');
        encabezadoDia.textContent = dias[i];
        diaContenedor.appendChild(encabezadoDia);
        
        // Crear una lista desordenada para las reservas del día
        var listaReservas = document.createElement('ul');
        
        // Agregar elementos a la lista de reservas
        for (let j = 0; j < 3; j++) {
          var nuevaReserva = document.createElement('li');
          nuevaReserva.textContent = "Cancha " + numeroCancha + ", horario " + (j+1) + ", día " + dias[i];
          nuevaReserva.classList.add('reserva-item');
          
          nuevaReserva.setAttribute('data-cancha', numeroCancha);
          nuevaReserva.setAttribute('data-horario', j+1);
          nuevaReserva.setAttribute('data-dia', dias[i]);

          listaReservas.appendChild(nuevaReserva);
        }
        
        diaContenedor.appendChild(listaReservas);
        contenedorReservas.appendChild(diaContenedor);
      }

    })

  }
}
