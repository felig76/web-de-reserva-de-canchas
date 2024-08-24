// Event listener para el cambio en el select
document.getElementById('selectCancha').addEventListener('change', function() {
  var valorSeleccionado = this.value;
  agregarOpcionesReservas(valorSeleccionado);
});

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

function agregarOpcionesReservas(numeroCancha) {
  var contenedorReservas = document.getElementById('listasReservasDiarias');

  // Limpia el contenedor antes de agregar nuevas listas
  contenedorReservas.innerHTML = '';

  // Obtener los próximos 7 días
  const dias = obtenerSieteDias();

  for (let i = 0; i < dias.length; i++) {
      if (numeroCancha != 0) {
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
  }
}

let reservasHechas = {"reservas": [
    {
      "id": 1,
      "fecha": "2024-08-25",
      "horaInicio": "10:00",
      "cancha": 1,
      "reservadoPor": "Juan Pérez"
    },
    {
      "id": 2,
      "fecha": "2024-08-25",
      "horaInicio": "13:00",
      "cancha": 7,
      "reservadoPor": "Ana Gómez"
    },
    {
      "id": 3,
      "fecha": "2024-08-25",
      "horaInicio": "16:00",
      "cancha": 2,
      "reservadoPor": null
    },
    {
      "id": 4,
      "fecha": "2024-08-26",
      "horaInicio": "09:00",
      "cancha": 7,
      "reservadoPor": null
    },
    {
      "id": 5,
      "fecha": "2024-08-26",
      "horaInicio": "12:00",
      "cancha": 3,
      "reservadoPor": "Carlos Sánchez"
    },
    {
      "id": 6,
      "fecha": "2024-08-26",
      "horaInicio": "15:00",
      "cancha": 7,
      "reservadoPor": "Laura Fernández"
    },
    {
      "id": 7,
      "fecha": "2024-08-27",
      "horaInicio": "08:00",
      "cancha": 4,
      "reservadoPor": null
    },
    {
      "id": 8,
      "fecha": "2024-08-27",
      "horaInicio": "11:00",
      "cancha": 7,
      "reservadoPor": null
    },
    {
      "id": 9,
      "fecha": "2024-08-27",
      "horaInicio": "14:00",
      "cancha": 5,
      "reservadoPor": "Marta López"
    },
    {
      "id": 10,
      "fecha": "2024-08-27",
      "horaInicio": "17:00",
      "cancha": 6,
      "reservadoPor": "Pedro Martínez"
    }
  ]
}  