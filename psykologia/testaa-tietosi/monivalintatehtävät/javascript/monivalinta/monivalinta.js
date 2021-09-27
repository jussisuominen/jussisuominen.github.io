async function lataaData() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  const datatiedosto = urlParams.get('datatiedosto')

  const data = await fetch(`http://localhost:5500/psykologia/testaa-tietosi/monivalintatehtävät/data/${datatiedosto}`)
  const jsonData = await data.json()

  return jsonData;
}

lataaData().then(tehtävä => {
  document.getElementById('otsikkonäyttö').textContent = tehtävä.otsikko

  kysymykset = tehtävä.kysymykset.map(kysymys => kysymys.kysymysteksti)
  oikeatVastaukset = tehtävä.kysymykset.map(kysymys => kysymys.oikeaVastaus)

  kysymysjärjestys = kysymykset.map((_, indeksi) => indeksi)
  kysymysjärjestys = shuffle(kysymysjärjestys)

  näytäKysymys();
})
