
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

  fetch('https://truruki.ru/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      },
    body: JSON.stringify(FormDataObject),
  //credentials: 'include', //чтобы браузер принял куки от сервера и отправлял их в последующих запросах
  })
    .then(data => {
      // Предполагается, что сервер возвращает { access_token: "..." }
      const token = data.access_token;
      if (!token) {
        throw new Error('Токен не получен');
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

function datas() {
  const token = localStorage.getItem('jwtToken');
  if (!token) {
    f.innerHTML = '<p>Пользователь не авторизован</p>';
    return;
  }

  fetch('https://truruki.ru/test', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // передаем токен в заголовке
    },
    // credentials: 'include' не нужен
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
    })
    .catch(error => {
      f.innerHTML = `<p>Ошибка: ${error.message}</p>`;
    });
}

butt.addEventListener('click', datas);