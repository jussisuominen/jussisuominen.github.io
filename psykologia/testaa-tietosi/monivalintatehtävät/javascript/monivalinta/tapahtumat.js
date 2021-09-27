monivalintanäyttö.addEventListener('click', (e) => {
  // Mikäli käyttäjä on painanut jotain muuta kuin vaihtoehtopainiketta,
  // älä jatka eteenpäin.
  if (e.target.nodeName != 'BUTTON') return;

  // Jos käyttäjä on vastannut oikein, muttei ole vielä siirtynyt seuraavaan
  // kysymykseen (vastausOikein == true), älä jatka eteenpäin.
  if (vastausOikein) return;

  const valittuVaihtoehto = e.target;

  const annettuVastaus = valittuVaihtoehto.textContent.split('.')[1].trim();

  tarkistaVastaus(annettuVastaus, valittuVaihtoehto);
});

document.addEventListener('keypress', (e) => {
  // Jos käyttäjä on vastannut oikein, voi hän siirtyä seuraavaan kysymykseen
  // painamalla jotain näppäintä. Jos siis käyttäjä on vastannut oikein,
  // näytä kysymys, kun käyttäjä painaa jotain näppäintä.
  if (vastausOikein) {
    // Jos kysymyksiä on vielä jäljellä, näytä kysymys.
    if(kysymysindeksi < kysymykset.length) {
      näytäKysymys()
    }
  } else {
    // Käyttäjä on vastaamassa kysymykseen ja hänen tarkoituksenaan on (ilmeisesti)
    // valita vaihtoehto numeronäppäimen avulla.

    // Hyväksy vain numeronäppäinten painallukset. Jos näppäin on joku
    // muu kuin numeronäppäintä, palaa.
    if (isNaN(+e.key)) return;

    // Hyväksy vain numeronäppäimet välillä 1 - vaihtoehtojen määrä.
    // Jos numero näppäin on 0 tai suurempi kuin vaihtoehtojen määrä, palaa.
    if (+e.key < 1 || +e.key > vaihtoehdot.length) return;

    const annettuVastaus = vaihtoehdot[+e.key - 1];
    const valittuVaihtoehto = document.getElementById(`valinta${+e.key}`);

    tarkistaVastaus(annettuVastaus, valittuVaihtoehto);
  }
});