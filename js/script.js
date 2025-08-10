
    // 1) Initialisation de la carte centrée sur Abidjan (exemple)
    const map = L.map('map').setView([5.3456, -4.0123], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // google maps layer
    const googleLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        subdomains: '0123',
        attribution: '&copy; Google Maps'
    });

   // Variable pour stocker tous les marqueurs
    let allMarkers = [];
    let placesData = [];

   // Fonction pour créer des icônes personnalisées selon le type
    function getMarkerIcon(type) {
      const iconColors = {
        'Église': '🏛️',
        'Parc': '🌳',
        'Musée': '🏛️',
        'Université': '🎓',
        'Hôpital': '🏥',
        'Centre commercial': '🛒',
        'Aéroport': '✈️'
      };
      
      const color = {
        'Église': '#8B4513',
        'Parc': '#228B22',
        'Musée': '#4169E1',
        'Université': '#FFD700',
        'Hôpital': '#DC143C',
        'Centre commercial': '#FF69B4',
        'Aéroport': '#87CEEB'
      };

      return L.divIcon({
        html: `<div style="background-color: ${color[type] || '#666'}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); font-size: 16px;">${iconColors[type] || '📍'}</div>`,
        className: 'custom-marker',
        iconSize: [30, 30],
        iconAnchor: [15, 15]
      });
    }

    function createFilterButton(place) {
        const button = document.createElement('button');
        button.innerText = place.type;
        document.querySelector('.filter-buttons').appendChild(button);
    }

   fetch('js/places.json')
    .then(response => response.json())
    .then(data => {
          placesData = data;
          placesData.forEach(place => {
              const marker = L.marker([place.lat, place.lng], {
                icon: getMarkerIcon(place.type)
              })
              .addTo(map);

              marker.on('click', () => {
                // toggle the left sider
                const leftSider = document.getElementById("left-sider");
                leftSider.style.left = "0";
                // Afficher les détails du lieu dans le panneau latéral
                document.getElementById('place-title').innerText = place.name;
                document.getElementById('place-description').innerText = place.description;
              });

              
             
              allMarkers.push(marker);

              createFilterButton( place);
          });
      });

    // Buttons for each type of place
    const buttons = document.querySelectorAll('.filter-buttons button');


    

    //Toggle left-sider
    const leftSider = document.getElementById("left-sider");
   

    //Close left-sider
    const cloaseBtn = document.getElementById("close-left-sider");
      cloaseBtn.addEventListener('click', () => {
        leftSider.style.left = "-400px";
    });

    //--------------------------Toggle other-layers
    const MainLayer = document.getElementById('image-satellite');
    const SecondLayer = document.getElementById('other-layers');

    let hideTimeout; // variable pour stocker le timer

    // Quand on survole l'image satellite
    MainLayer.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout); // Annule un éventuel timer
      SecondLayer.style.display = 'flex';
    });

    // Quand on quitte l'image satellite
    MainLayer.addEventListener('mouseleave', () => {
      if (!SecondLayer.matches(':hover')) {
        hideTimeout = setTimeout(() => {
          SecondLayer.style.display = 'none';
        }, 1000); // 5000 ms = 5s
      }
    });

    // Quand on survole SecondLayer
    SecondLayer.addEventListener('mouseenter', () => {
      clearTimeout(hideTimeout); // Empêche de cacher pendant le survol
    });

    // Quand on quitte SecondLayer
    SecondLayer.addEventListener('mouseleave', () => {
      hideTimeout = setTimeout(() => {
        SecondLayer.style.display = 'none';
      }, 1000);
    });
