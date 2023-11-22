(() => {

  //variables
  const model = document.querySelector("#model");
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialHere = document.querySelector("#material-here");


  const spinner = `<svg width="100" height="100" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_d9Sa{transform-origin:center}.spinner_qQQY{animation:spinner_ZpfF 9s linear infinite}.spinner_pote{animation:spinner_ZpfF .75s linear infinite}@keyframes spinner_ZpfF{100%{transform:rotate(360deg)}}</style><path d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,20a9,9,0,1,1,9-9A9,9,0,0,1,12,21Z"/><rect class="spinner_d9Sa spinner_qQQY" x="11" y="6" rx="1" width="2" height="7"/><rect class="spinner_d9Sa spinner_pote" x="11" y="11" rx="1" width="2" height="9"/></svg>`;

  //This information needs to be removed then pulled with an AJAX Call using the Fetch API
  //this is the api url https://swiftpixel.com/earbud/api/infoboxes"

  // const infoBoxes = [
  //   {
  //     title: 'Noise-cancelling microphones',
  //     text: 'Noise-cancelling microphones and a rear copper shield are optimally placed to quickly detect outside noises, working together to counter noise before it disturbs your experience.',
  //     image: 'images/ear-piece.jpg'
  //   },
  //   {
  //     title: 'Comfortable fit',
  //     text: 'Three pairs of ultra comfortable silicone tips are included. The tips create an acoustic seal that blocks outside audio and secures the earbuds in place.',
  //     image: 'images/ear-piece.jpg'
  //   },
  //   {
  //     title: '360 AUDIO',
  //     text: '360 Audio places sound all around you, while Dolby Head Tracking™ technology delivers an incredible three-dimensional listening experience.',
  //     image: 'images/ear-piece.jpg'
  //   },
  //   {
  //     title: 'Ultra Fast Charging',
  //     text: 'Charge your earbuds in 30 minutes or less with our hyper charging technology.',
  //     image: 'images/ear-piece.jpg'
  //   },
  // ];

    //This information needs to be removed then pulled with an AJAX Call using the Fetch API
    //this is the api url https://swiftpixel.com/earbud/api/materials"

  // const materialListData = [
  //   {
  //     heading: "Precision-Crafted Polymers",
  //     description: "Our earbuds are meticulously molded from high-quality plastics, ensuring a blend of elegance, comfort, and resilience that's second to none."
  //   },
  //   {
  //     heading: "Luxurious Silicone Harmony",
  //     description: "Our uniquely engineered ear tips are cocooned in plush silicone, delivering an opulent embrace for your ears, ensuring an unrivaled fit and exquisite audio experience."
  //   },
  //   {
  //     heading: "Rubberized Cables",
  //     description: "Experience the unparalleled freedom of movement with our flexible rubber cables that promise durability without compromise."
  //   },
  //   {
  //     heading: "Enhanced Comfort Sensors",
  //     description: "A touch of magic in the form of built-in microphones and sensors empowers your earbuds to obey your every command, making your audio journey seamless and enchanting."
  //   },
  //   {
  //     heading: "Artistic Mesh Guard",
  //     description: "Shielded by artful mesh screens, our speakers remain untarnished, keeping your listening experience pristine."
  //   }
  // ];

  //functions
  function modelLoaded() {
    hotspots.innerHTML = spinner;
    hotspots.forEach(hotspot => {
      hotspot.style.display = "block";
    });
  }

  function loadInfoBoxes() {
    function getDesc() {
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(info => {
      console.log(info);

      info.forEach((infoBox, index) => {
      let info = document.querySelector(`#hotspot-${index+1}`);
      
      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

      const imgElement = document.createElement('img');
      imgElement.src = `images/${infoBox.thumbnail}`;

      info.appendChild(titleElement);
      info.appendChild(textElement);
      info.appendChild(imgElement);
    });
    })

    // .catch(error => console.error(error));
    .catch(error => {
      console.error("Error occured unsuccessful to load infoboxes:", error);
      alert("Failed to load, Try again")
    })
    }
    getDesc();
  }
  loadInfoBoxes();


  function loadMaterialInfo(){
    materialHere.innerHTML = spinner;
    function getDesc() {
    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(material => {
      console.log(material);

      let ul = document.createElement("ul")

      material.forEach((materialInfo)=> {
        const li = document.createElement("li");

        const h3 = document.createElement("h3");
        h3.textContent = materialInfo.heading;
        
        const p = document.createElement("p");
        p.textContent = materialInfo.description;

        li.appendChild(h3);
        li.appendChild(p);
        ul.appendChild(li);
        materialHere.appendChild(ul);
      });
    })

    // .catch(error => console.error(error));
    .catch(error => {
      console.error("Failed to load material info", error);
      alert("Loading Error. Try again in a few minutes.")
    })
    }
    getDesc();
  }
  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
  model.addEventListener("load", modelLoaded);

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();