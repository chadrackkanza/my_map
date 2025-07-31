
    // 1) Initialisation de la carte centrée sur Abidjan (exemple)
    const map = L.map('map').setView([5.3480, -4.0142], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

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
