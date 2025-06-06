const f5 = document.querySelector('.f5')
const r5 = document.querySelector('.result5')

// **********************получение данных из БД и вставка в таблицу***************************
function tb() {

fetch('https://truruki.ru/api/category')
    .then(response => response.json())
    .then(j => {
      const html = j.map(item => `<tr><td>${item.name}</td><td><img src="https://truruki.ru/${item.imageSrc}" width="50" height="50"></td><tr>`).join('');
      r5.innerHTML =`<table> ${html} </table>`;
      
})
}

tb();


//*****************************register******************************************** */

const form0 = document.getElementById('form0');
  form0.addEventListener('submit', function(event) {
    event.preventDefault();

  const formData = new FormData(form0); // Сбор данных формы
  const FormDataObject = Object.fromEntries(formData);

  fetch('https://truruki.ru/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify(FormDataObject),
  
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }
      return response.json(); // преобразуем ответ в JSON
    })
    .then(data => {
    })
    .catch(error => {
    });
});

//*****************************login******************************************** */
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

  fetch('https://truruki.ru/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify(FormDataObject),
  
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка авторизации');
      }
      return response.json(); // преобразуем ответ в JSON
    })
    .then(data => {
      // Предполагается, что сервер возвращает { access_token: "..." }
      let token = data.token;
      if (!token) {
        throw new Error('Токен не получен');
      }
        // Убираем префикс 'Bearer ' если есть
          if (token.startsWith('Bearer ')) {
            token = token.slice(7);
          }
      // Сохраняем токен в localStorage
      localStorage.setItem('jwtToken', token);

      secretField1.style.display = 'block';
      secretField2.style.display = 'block';
      secretField2.textContent = 'Успешный вход';

      form1.reset();
    })
    .catch(error => {
      secretField1.style.display = 'none';
      secretField2.style.display = 'block';
      secretField2.textContent = 'Ошибка: ' + error.message;
    });
});
//*****************************вставка картинок category******************************************** */
const form2 = document.getElementById('form2');
const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');

// Обработчик выбора файла — показываем превью
imageInput.addEventListener('change', function() {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      preview.src = e.target.result; // Устанавливаем источник картинки
      preview.style.display = 'block'; // Показываем <img>
    };
    reader.readAsDataURL(file); // Читаем файл как Data URL
  } else {
    preview.src = '';
    preview.style.display = 'none';
  }
});



function datas() {
  let token = localStorage.getItem('jwtToken');
  if (!token) {
    f.innerHTML = '<p>Пользователь не авторизован</p>';
    return;
  }

  const formData2 = new FormData(form2); // // Сбор данных формы с файлом
  //const FormDataObject2 = Object.fromEntries(formData2);


  fetch('https://truruki.ru/api/category', {
    method: 'POST',
    headers: {
    //  'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // передаем токен в заголовке
    },
    body: formData2, // Отправляем FormData напрямую
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Ошибка доступа');
      }
      return response.json();
    })
    .then(j => {
      const html = j.message;
      f.innerHTML = `<p>${html}</p>`;
      tb();  
      form2.reset(); // очищаем форму
      preview.src = '';
      preview.style.display = 'none';
    })
    .catch(error => {
      f.innerHTML = `<p>Ошибка: ${error.message}</p>`;
    });
}

butt.addEventListener('click', datas);