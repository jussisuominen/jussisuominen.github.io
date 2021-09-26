let kysymysindeksi = 0, kysymys
let kysymysjärjestys = kysymykset.map((_, indeksi) => indeksi)

kysymysjärjestys = shuffle(kysymysjärjestys)

let vastaukset = []
let vaihtoehdot = []
let vastaus

vastausOikein = false