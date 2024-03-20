$(document).ready( function() {

const urlFile = '/local/scripts/DynamicTable/ids.txt'

//Обработка JSON файла с данными
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
    
    //Получение JSON файла с данными
    loadJSON("/local/scripts/DynamicTable/data.json", dynamicTable, "jsonp");

    function enterData(elements, Data, path) {

      elements = Array.isArray(elements) || elements instanceof HTMLCollection ? Array.from(elements) : [elements];

      const valueFromData = path.split('.').reduce((acc, cur) => acc[cur], Data);

      elements.forEach(element => {
        element.innerHTML = `<b>от ${valueFromData} р. </b>`;
      });
    }

    //Вывод данных
    function dynamicTable(Data) {

      fetch(urlFile)
        .then(response => {
          if(!response.ok) {
            throw new Error('Error gk-mact.ru #1: Запрос не удался.')
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

      //Инициализация переменной, куда будет выводится товар
      //Пример инициализаци: let programmist_1s_usluga1 = document.getElementsByClassName("programmist_1c_payment")
      let programmist_1c_payment = document.getElementsByClassName("programmist_1c_payment")

      //Здесь выводятся данные
      // Пример: enterData(programmist_1s_usluga1, Data, 'programmist_1s.payment')
      enterData(programmist_1c_payment, Data, 'programmist_1c.payment');
    }
})
