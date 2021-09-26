function näytäVäärinTulos() {
  väärinTulos.style.display = 'inline-block'
  väärinTulos.style.visibility = 'visible'
  oikeinTulos.style.display = 'none'
  harjoitusValmis.style.display = 'none'
}

function piilotaVäärinTulos() {
  väärinTulos.style.visibility = 'hidden'
}

function näytäOikeinTulos() {
  console.log('näytäOikeinTulos()');
  oikeinTulos.style.display = 'inline-block'
  oikeinTulos.style.visibility = 'visible'
  väärinTulos.style.display = 'none'
  harjoitusValmis.style.display = 'none'
}

function piilotaOikeinTulos() {
  oikeinTulos.style.visibility = 'hidden'
}

function näytäHarjoitusValmis() {
  harjoitusValmis.style.visibility = 'visible'
  harjoitusValmis.style.display = 'inline-block'
  oikeinTulos.style.display = 'none'
  väärinTulos.style.display = 'none'
}

function piilotaHarjoitusValmis() {
  harjoitusValmis.style.visibility = 'hidden'
}

function oikein(valittuVaihtoehto) {
  //viesti += 'Vastauksesi on <strong><span class="w3-text-green">oikein</span></strong>!'
  vastausOikein = true

  piilotaVäärinTulos()

  valittuVaihtoehto.classList.remove('w3-teal')
  valittuVaihtoehto.classList.add('w3-green')

  kysymysindeksi++

  if (kysymysindeksi < kysymykset.length) {
    näytäOikeinTulos()
  } else {
    näytäHarjoitusValmis()
  }
}

function väärin(valittuVaihtoehto) {
  //väärinTulos.style.visibility = 'visible'

  näytäVäärinTulos()

  setTimeout(() => piilotaVäärinTulos(), 2000)

  oikeinTulos.style.visibility = 'hidden'
  valittuVaihtoehto.classList.remove('w3-teal')
  valittuVaihtoehto.classList.add('w3-pink')
  //console.log(valittuVaihtoehto)
}

function näytäKysymys() {
  vastausOikein = false

  vastaukset = []

  vaihtoehdot = []

  piilotaOikeinTulos()

  kysymys = kysymykset[kysymysjärjestys[kysymysindeksi]]

  // Generoi vaihtoehdot

  // Seuraava koodi lisää vaihtoehtoihin oikean vastauksen ja kaksi
  // muuta satunnaisesti valittua väärää vastausta. 

  // Luo apumuuttuja ja tallenna kaikkien kysymysten oikeat vastaukset siihen.
  vastaukset = [...oikeatVastaukset]

  // Hae nykyisen kysymyksen oikea vastaus.
  oikeaVastaus = oikeatVastaukset[kysymysjärjestys[kysymysindeksi]]

  // Poista nykyisen kysymyksen oikea vastaus kaikkien kysymysten oikeista vastauksista.
  vastaukset = vastaukset.filter((v) => v != oikeaVastaus)

  // Sekoita vastaukset, joista on poistettu oikea vastaus.
  vastaukset = shuffle(vastaukset)

  // Lisää oikea vastaus vaihtoehtoihin (oikea vastaus on tietysti aina vaihtoehdoissa)
  // sekä kaksi muuta väärää vastausta. Koska vastaukset -apumuuttujassa olleet oikeat vastaukset
  // on sekoitettu, tulee kaksi muuta väärää vastausvaihtoehtoa valituksi satunnaisesti.
  vaihtoehdot.push(oikeaVastaus, vastaukset[0], vastaukset[1])

  // Sekoita vielä vaihtoehdot.
  vaihtoehdot = shuffle(vaihtoehdot)

  // Generoi HTML-koodi, joka näyttää vaihtoehdot käyttäjälle ja mahdollistaa
  // vaihtoehtojen valitsemisen.
  let valinnatHTML = ''

  vaihtoehdot.forEach(
    (vaihtoehto, indeksi) =>
      (valinnatHTML += `
  <p><button class="w3-btn w3-teal w3-round-xlarge" 
    tabindex="${indeksi + 1}" id="valinta${
        indeksi + 1
      }">${indeksi + 1}. ${vaihtoehto}</button></p>
  `)
  )

  kysymysnäyttö.innerHTML = kysymys
  monivalintanäyttö.innerHTML = valinnatHTML
}

function tarkistaVastaus(annettuVastaus, valittuVaihtoehto) {
  if(annettuVastaus === oikeaVastaus) {
    oikein(valittuVaihtoehto)
  } else {
    väärin(valittuVaihtoehto)
  }
}

function teeHarjoitusUudestaan() {
  kysymysindeksi = 0
  piilotaHarjoitusValmis()
  näytäKysymys()
}