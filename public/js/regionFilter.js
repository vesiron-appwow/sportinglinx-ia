(function () {

  const REGION_MAP = {
    UK: [
      "Bedfordshire","Berkshire","Bristol","Buckinghamshire","Cambridgeshire",
      "Cheshire","Cornwall","Cumbria","Derbyshire","Devon","Dorset",
      "Durham","East Riding of Yorkshire","East Sussex","Essex",
      "Gloucestershire","Greater London","Greater Manchester",
      "Hampshire","Herefordshire","Hertfordshire","Isle of Wight",
      "Kent","Lancashire","Leicestershire","Lincolnshire",
      "Merseyside","Norfolk","North Yorkshire","Northamptonshire",
      "Northumberland","Nottinghamshire","Oxfordshire","Rutland",
      "Shropshire","Somerset","South Yorkshire","Staffordshire",
      "Suffolk","Surrey","Tyne and Wear","Warwickshire",
      "West Midlands","West Sussex","West Yorkshire",
      "Wiltshire","Worcestershire",
      "Aberdeenshire","Angus","Argyll and Bute","Clackmannanshire",
      "Dumfries and Galloway","Dundee City","East Ayrshire",
      "East Dunbartonshire","East Lothian","East Renfrewshire",
      "Edinburgh","Falkirk","Fife","Glasgow","Highland",
      "Inverclyde","Midlothian","Moray","North Ayrshire",
      "North Lanarkshire","Orkney","Perth and Kinross",
      "Renfrewshire","Scottish Borders","Shetland",
      "South Ayrshire","South Lanarkshire","Stirling",
      "West Dunbartonshire","West Lothian",
      "Anglesey","Blaenau Gwent","Bridgend","Caerphilly",
      "Cardiff","Carmarthenshire","Ceredigion","Conwy",
      "Denbighshire","Flintshire","Gwynedd","Merthyr Tydfil",
      "Monmouthshire","Neath Port Talbot","Newport",
      "Pembrokeshire","Powys","Rhondda Cynon Taf",
      "Swansea","Torfaen","Vale of Glamorgan","Wrexham",
      "Antrim and Newtownabbey","Ards and North Down",
      "Armagh City, Banbridge and Craigavon",
      "Belfast","Causeway Coast and Glens",
      "Derry and Strabane","Fermanagh and Omagh",
      "Lisburn and Castlereagh",
      "Mid and East Antrim","Mid Ulster",
      "Newry, Mourne and Down"
    ],
    USA: [
      "Alabama","Alaska","Arizona","Arkansas","California","Colorado",
      "Connecticut","Delaware","Florida","Georgia","Hawaii","Idaho",
      "Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana",
      "Maine","Maryland","Massachusetts","Michigan","Minnesota",
      "Mississippi","Missouri","Montana","Nebraska","Nevada",
      "New Hampshire","New Jersey","New Mexico","New York",
      "North Carolina","North Dakota","Ohio","Oklahoma","Oregon",
      "Pennsylvania","Rhode Island","South Carolina","South Dakota",
      "Tennessee","Texas","Utah","Vermont","Virginia",
      "Washington","West Virginia","Wisconsin","Wyoming"
    ],
    AUS: [
      "New South Wales","Victoria","Queensland","Western Australia",
      "South Australia","Tasmania","Northern Territory",
      "Australian Capital Territory"
    ],
    EU: [
      "France","Germany","Spain","Italy","Netherlands",
      "Belgium","Portugal","Sweden","Denmark","Ireland",
      "Poland","Austria","Greece","Finland"
    ]
  };

  document.addEventListener("DOMContentLoaded", function () {

    const countryEl = document.getElementById("country");
    const regionEl = document.getElementById("region");

    if (!countryEl || !regionEl) return;

    function renderOptions(list) {
      let html = '<option value="">Select Region</option>';
      if (!Array.isArray(list)) return html;
      html += list.map(r => `<option value="${r}">${r}</option>`).join("");
      return html;
    }

    function applyCountry(code) {
      if (!code || code === "GLOBAL" || !REGION_MAP[code]) {
        regionEl.innerHTML = '<option value="">Select Region</option>';
        regionEl.disabled = true;
        return;
      }

      regionEl.innerHTML = renderOptions(REGION_MAP[code]);
      regionEl.disabled = false;
    }

    applyCountry(countryEl.value || "");

    countryEl.addEventListener("change", function () {
      applyCountry(countryEl.value || "");
    });

  });

})();