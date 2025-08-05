
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

   
  
    //Toggle left-sider
    const leftSider = document.getElementById("left-sider");
    const  toggleLeftSider = document.getElementById("hamburger-btn");
      toggleLeftSider.addEventListener('click', () => {
        const isOpen = leftSider .classList.toggle('open');
        if(isOpen){
          leftSider.style.left = "0";
        }else{
          leftSider.style.left = "-300px";
        }       
    });

    //Close left-sider
    const cloaseBtn = document.getElementById("close-left-sider");
      cloaseBtn.addEventListener('click', () => {
        leftSider.style.left = "-300px";
    });
