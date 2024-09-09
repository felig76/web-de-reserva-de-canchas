//import reservasLocal from "./mocks/registrosReservasLocal.json"

const HORAS_TURNOS = ['08:00', '11:00', '14:00', '17:00', '20:00'];

function obtenerSieteDias() {
  const days = [];
  const today = new Date();
  
  for (let i = 0; i < 7; i++) {
    let day = new Date(today);
    day.setDate(today.getDate() + i);
    // Obtener el mes y el día
    const month = String(day.getMonth() + 1).padStart(2, '0'); // Mes en formato de dos dígitos
    const date = String(day.getDate()).padStart(2, '0'); // Día en formato de dos dígitos
    // Crear la fecha en formato MM-DD
    const formattedDate = `${month}-${date}`;
    days.push(formattedDate);
  }
  
  return days;
}

document.getElementById('selectCancha').addEventListener('change', function() {
  var valorSeleccionado = this.value;
  console.log("cambio de cancha detectado");
  mostrarOpcionesReservas(valorSeleccionado);
});

function mostrarOpcionesReservas(numeroCancha) {
  // Determinar elemento html y guardar en una variable
  var contenedorReservas = document.getElementById('listasReservasDiarias');
  // Limpia el contenedor antes de agregar nuevas listas
  contenedorReservas.innerHTML = '';

  // Obtener los próximos 7 días
  const dias = obtenerSieteDias();

  if (numeroCancha != 0) {
    
    // Obtener registros de reservas usando el código php desde base de datos y transformarlo a formato json
    fetch('reservas.php').then(response => response.json()).then(reservas => {

      for (let i = 0; i < dias.length; i++) {
        // Crear un nuevo contenedor para cada día
        var diaContenedor = document.createElement('div');
        diaContenedor.className = 'dia-semana';
        
        // Crear un encabezado con la fecha para el día
        var encabezadoDia = document.createElement('h3');
        encabezadoDia.textContent = dias[i];
        diaContenedor.appendChild(encabezadoDia);
        
        // Crear una lista desordenada para las reservas del día
        var listaReservas = document.createElement('ul');
        
        // Agregar elementos a la lista de reservas
        for (let j = 0; j < HORAS_TURNOS.length; j++) {
          var estaReservado = reservas.find(r => 
            r.fecha_reserva === dias[i] &&
            r.hora_inicio === HORAS_TURNOS[j] &&
            r.cancha === numeroCancha
          );
          console.log(estaReservado);
          var nuevaTarjetaReserva = document.createElement('li');
          nuevaTarjetaReserva.textContent = `Cancha ${numeroCancha}, horario ${HORAS_TURNOS[j]}, día ${dias[i]}`;
          nuevaTarjetaReserva.classList.add('reserva-item');
          if (estaReservado) {
            nuevaTarjetaReserva.classList.add('reservado');
            nuevaTarjetaReserva.textContent += ' - Reservado';
          } else {
            nuevaTarjetaReserva.classList.add('disponible');
          }
          nuevaTarjetaReserva.setAttribute('data-cancha', numeroCancha);
          nuevaTarjetaReserva.setAttribute('data-horario', HORAS_TURNOS[j]);
          nuevaTarjetaReserva.setAttribute('data-dia', dias[i]);

          listaReservas.appendChild(nuevaTarjetaReserva);
        }
        
        diaContenedor.appendChild(listaReservas);
        contenedorReservas.appendChild(diaContenedor);
      }

    })

  }
}