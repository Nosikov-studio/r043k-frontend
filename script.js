
//************************************************************************* */
const form1 = document.getElementById('form1');
const secretField1 = document.getElementById('secretField1');
const secretField2 = document.getElementById('secretField2');
const butt = document.getElementById('btn');
const f =document.getElementById('f')
//let token = ""; // глобальная переменная

  form1.addEventListener('submit', function(event) {
    event.preventDefault();

  const formData = new FormData(form1); // Сбор данных формы
  const FormDataObject = Object.fromEntries(formData);

  fetch('https://truruki.ru/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify({
      ...FormDataObject,
      views: 0,
    }),
  credentials: 'include', //чтобы браузер принял куки от сервера и отправлял их в последующих запросах
  })
    .then(response => response.json())
    .then(j => {
      console.log(j);          
    secretField1.style.display = 'block';      // Показываем скрытое поле 1
    secretField2.style.display = 'block';     // Показываем скрытое поле 2
    secretField2.textContent = j.message;
      form1.reset(); // очищаем форму
    });
  });

//////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////

function datas() {





fetch('https://truruki.ru/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
     // 'Authorization': `Bearer ${token}`
      },    
    credentials: 'include', //куки 
  })
    .then(response => response.json())
    .then(j => {
      const html = j.message;
      f.innerHTML =`<p> ${html} </p>`})
}

butt.addEventListener('click', datas);