import type { Property } from '@/types'
import type { Locale } from './config'

export type PropertyLocaleFields = {
  title?: string
  description?: string
  location?: string
  province?: string | null
  availability?: string | null
  heating?: string | null
  condition?: string | null
  floor?: string | null
  garage?: string | null
  elevator?: string | null
  energyRating?: string | null
}

const EU: Record<string, PropertyLocaleFields> = {
  lk1: {
    title: 'Duplexa salgai Modesto Txurruka kalean s/n',
    location: 'Mutriku',
    province: 'Gipuzkoa',
    availability: 'Erabilgarri',
    heating: 'Berogailu zentrala',
    condition: 'Egoera ona',
    floor: '2. solairua kanpoaldekoa',
    elevator: 'Ez',
    energyRating: 'Tramiteetan',
    description: `Ezagutu 140 m²-ko duplex harrigarri hau kokapen bikain batean! Bigarren solairuan dagoen etxe honek argi natural ugaria duen egongela-jantoki zabala eskaintzen du, leiho handien eskutik. Irudikatu gau hotzetan tximiniarekin gozatzea, erlaxatzeko ingurune perfektua sortuz. Sukalde guztiz hornitua eta espazio irekian dago, egongela-jantokiarekin perfektuki integratuta; lagunekin eta familiarekin une gogoragarriak partekatzeko ideala.

Duplex honek bi logela atsegin ditu, atsedena eta pribatutasuna bermatzen dituztenak. Gainera, horietako baten espazio gehigarria hirugarren gela edo armairu bihurtzeko aukera duzu, zure beharretara egokitzeko. Goiko solairuko bainugela osoak eguneroko erosotasuna ematen du.

Solairu bakoitzak 70 m² ditu.

Ez galdu portuaren eta itsasoaren ikuspegi zabala duten balkoia; aire freskoaz gozatzeko eta ingurunearen edertasuna miresteko leku perfektua. 2007an eraikia eta egoera bikainean dagoen higiezin honek, gainera, gutxi gorabehera 30 m²-ko trasteleku bat barne hartzen du, behar duzun guztia gordetzeko. Berogailu zentrala eta erosotasuna maximizatzeko pentsatutako banaketarekin, bizitza-kalitatea bilatzen dutenentzat aukera ezin hobea da ingurune paregabean.

150 m² eraikita · 142 m² erabilgarri · 2. solairua kanpoaldekoa · Igogailurik gabe · Zertifikatu energetikoa tramiteetan.`,
  },
  lk2: {
    title: 'Txalet independentea salgai Laranga Auzoan',
    location: 'Mutriku',
    province: 'Gipuzkoa',
    availability: 'Erabilgarri',
    heating: 'Berogailu indibiduala',
    condition: 'Egoera ona',
    floor: '2 solairu',
    garage: 'Aparkaleku-plaza barne',
    elevator: 'Ez',
    description: `Mutrikun salgai dagoen txalet independentea, arrantza-herri xarmagarri bat, lasaitasunaren eta natura-edertasunaren konbinazio perfektua eskaintzen duena. Laranga auzoan kokatua, etxe honek 360 graduko ikuspegiak eskaintzen ditu, hatsa eramaten dizutenak. 1995ean eraikia eta azkenaldian hobetutako zonak ditu; 220 m²-ko azalera eraikia du eta 16.000 m²-ko lursail batean dago, pribatutasuna eta aire zabalean gozatzeko espazioa bermatzen duena.

Txaletaren banaketa optimoa da, argi natural ugaria duten espazio zabalekin, leiho handien eskutik. Etxe nagusiaren egongela atsegina tximiniarekin terraza eta lorategiarekin lotzen da; familia-bilera eta erlaxazio-ingurune ideal bat sortuz. Terraza zabala, lorategi, parrilla eta igerilekuarekin hornitua, kanpoan gozatzeko eta barbakoa gogoragarriak antolatzeko perfektua. Estancia guztiek igerileku- eta lorategi-eremurako sarbidea dute.

Txalet honek bost logela zabal ditu, behar desberdinetara egokitzeko, familia handientzat edo gonbidatuentzako espazio gehigarria nahi dutenentzat idealak. Hiru bainugela oso eta komuna dituelarik, erosotasuna bermatuta dago. Gainera, hiru sukalde independente guztiz hornitu ditu. Altua altuera onarekin, aukera asko eskaintzen dituena.

Biltegiratzeaz kezkatu beharrik ez: higiezinak trasteleku handi bat barne hartzen du makineria eta tresnetarako, eta 3-4 kotxerako aparkaleku pribatua eta garbigunea.

Badira denbora moteldu egiten den lekuak, itsasoaren eta historiaren usaina dutenak, eta bizitza-kalitatea ohitura bihurtzen denak. Mutrikuk bere arima intactu gordetzen du: nortasuna duten kaleak, arrantza-tradizioa, lasaitasuna eta negoziatu ezin den edertasuna.

240 m² eraikita · 16.000 m²-ko lursaila · 5 logela · 3 bainugela · Ipar, hego, ekialde eta mendebalde orientazioa.`,
  },
  lk3: {
    title: 'Pisua salgai Jose M. Linazasoro kalea, 1',
    location: 'Mendaro',
    province: 'Gipuzkoa',
    availability: 'Erabilgarri',
    heating: 'Gas natural indibiduala',
    condition: 'Egoera bikaina',
    floor: '1. solairua kanpoaldekoa',
    garage: 'Aparkaleku-plaza barne',
    elevator: 'Bai',
    energyRating: 'Tramiteetan',
    description: `Ezagutu Mendaroko pisu harrigarri hau, erosotasuna eta estiloa bilatzen dutenentzat ideal. 90 m²-ko azalera erabilgarria du eta kokapen bikainean dago, Deba ibaiarekin paraleloki eta beharrezko zerbitzu guztietara urrats gutxira. Ipar-ekialde-hego-mendebalde orientazioak egun osoan argi naturala bermatzen du, ingurune bero eta atsegina sortuz.

Pisua hiru logela zabal ditu, famili osoarentzat egokiak, eta bi bainugela oso, horietako bat suite batean, pribatutasuna eta erosotasuna eskaintzen dituena. Egongela-jantokia zabala eta argitsua da, familiarekin uneak gozatzeko edo lagunak hartzeko ideal. Sukaldea guztiz hornitua dago, zure sukaldaritza-sormena askatasunez garatzeko prest.

Gainera, higiezin honek aparkaleku bikoitza barne hartzen du, igogailuaren bidez etxebizitzara sarbide zuzenarekin, erosotasun handiagoa emanez. Trasteleku zabaleko independente bat ere badu, behar duzun guztia gordetzeko. Kontserbazio-egoera bikaina da: 2007an eraikia izan zen eta egoera onean mantendu da.

Ez galdu kanpoaldekoa den pisu hau, barruko patioarekin erlaxatzeko espazio gehigarria ematen duena.

100 m² eraikita · 90 m² erabilgarri · 1. solairua kanpoaldekoa · Igogailuarekin · Zertifikatu energetikoa tramiteetan.`,
  },
}

export function localizeProperty(property: Property, locale: Locale): Property {
  if (locale === 'es') return property
  const t = EU[property.id]
  if (!t) return property
  return {
    ...property,
    ...t,
  }
}

export function localizeProperties(properties: Property[], locale: Locale): Property[] {
  return properties.map((p) => localizeProperty(p, locale))
}
