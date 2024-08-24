function agregarOpcionesReservas(numeroCancha) {
    if (numeroCancha) {
        var listaReservasDisponibles = document.getElementById('listaReservasDisponibles');
        var nuevaReserva = document.createElement('li');
        nuevaReserva.textContent = numeroCancha;
        listaReservasDisponibles.appendChild(nuevoReserva);
    }
}
// Event listener para el cambio en el select
document.getElementById('selectCancha').addEventListener('change', function() {
    // Obtiene el valor seleccionado
    var valorSeleccionado = this.value;

    // Llama a la función para agregar el elemento
    agregarElemento(valorSeleccionado);
});


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