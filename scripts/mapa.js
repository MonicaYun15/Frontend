document.addEventListener('DOMContentLoaded', function () {
    // Inicializa el mapa en unas coordenadas iniciales, por ejemplo, Nueva York
    const map = L.map('map').setView([40.7128, -74.0060], 13);  // Coordenadas de ejemplo (Nueva York)
  
    // Agrega la capa de mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
  
    // Inicializa el grupo de elementos dibujados
    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
  
    // Inicializa el control de dibujo
    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems
      },
      draw: {
        polygon: true,  // Permite solo el dibujo de polígonos
        marker: false,
        circle: false,
        rectangle: false,
        polyline: false
      }
    });
    map.addControl(drawControl);
  
    // Variable para almacenar el polígono
    let polygon = null;
  
    // Evento cuando el usuario termina de dibujar un polígono
    map.on('draw:created', function (event) {
      const layer = event.layer;
  
      // Si ya hay un polígono, lo eliminamos
      if (polygon) {
        drawnItems.removeLayer(polygon);
      }
  
      // Añadimos el nuevo polígono al mapa
      drawnItems.addLayer(layer);
      polygon = layer; // Guardamos el nuevo polígono
  
      // Llamamos a la función para verificar si la ubicación está dentro del polígono
      checkIfInsidePolygon();
    });
  
    // Función para obtener la ubicación del usuario
    function getUserLocation() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const userLat = position.coords.latitude;
          const userLng = position.coords.longitude;
  
          // Muestra la ubicación del usuario en el mapa
          const userLocation = L.marker([userLat, userLng]).addTo(map)
            .bindPopup("Tu ubicación")
            .openPopup();
  
          // Verifica si el usuario está dentro del polígono
          const isInside = polygon && polygon.getBounds().contains([userLat, userLng]);
  
          // Muestra el mensaje de estado
          const statusElement = document.getElementById('status');
          if (polygon) {
            if (isInside) {
              statusElement.textContent = "Estás dentro del polígono.";
              statusElement.style.backgroundColor = "rgba(0, 255, 0, 0.7)"; // Verde
            } else {
              statusElement.textContent = "Estás fuera del polígono.";
              statusElement.style.backgroundColor = "rgba(255, 0, 0, 0.7)"; // Rojo
            }
          }
        }, function () {
          alert("No se pudo obtener tu ubicación.");
        });
      } else {
        alert("La geolocalización no está soportada en este navegador.");
      }
    }
  
    // Función para comprobar si el usuario está dentro del polígono
    function checkIfInsidePolygon() {
      if (polygon) {
        getUserLocation();
      }
    }
  
    // Llamada inicial para obtener la ubicación del usuario
    getUserLocation();
  });
  