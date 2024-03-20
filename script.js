$(document).ready( function() {
//Get IDs
const urlFile;

//Get JSON
    function loadJSON(path, success, error) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              success(JSON.parse(xhr.responseText));
            }
            else {
              error(xhr);
            }
          }
        };
        xhr.open('GET', path, true);
        xhr.send();
    }
    
    //Here JSON get
    loadJSON(JSON, dynamicTable, "jsonp");

    //Here we add data in table
    function enterData(elements, Data, path) {

      elements = Array.isArray(elements) || elements instanceof HTMLCollection ? Array.from(elements) : [elements];

      const valueFromData = path.split('.').reduce((acc, cur) => acc[cur], Data);

      elements.forEach(element => {
        element.innerHTML = `<b>от ${valueFromData} р. </b>`;
      });
    }

    //Table
    function dynamicTable(Data) {

      fetch(urlFile)
        .then(response => {
          if(!response.ok) {
            throw new Error('Error. Problem with JSON')
          }
          return response.text();
        })
        .then(text => {
          const ids = text.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);

          ids.forEach(id => {
            const element = document.getElementById(id);
            const dataPath = `programmist_1c.${id}`;
            if(element) {
              enterData(element, Data, dataPath)
            }
          }) 
        })
    }
})
