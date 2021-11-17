var data = [];
const show = document.getElementById('show');

showData();

function addData() {
  var name = document.getElementById('name').value.trim();
  var phone = document.getElementById('phone').value.trim();
  var email = document.getElementById('email').value.trim();

  const errName = document.getElementById('invalid_Name');
  const errPhone = document.getElementById('invalid_Phone');
  const errEmail = document.getElementById('invalid_Email');

  var newName = addName(name, errName, 'Name');
  var newEmail = addEmail(email, errEmail, 'Email');
  var newPhone = addPhone(phone, errPhone, 'Phone');

  console.log(newName, newEmail, newPhone);
  var user = {
    name: formatName(name),
    phone: formatPhone(phone),
    email: email,
  };
  let list = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
  if (newName && newEmail && newPhone) {
    list.push(user);
    localStorage.setItem('data', JSON.stringify(list));
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
  }

  showData();
}

function showData() {
  let list = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
  if (list.length === 0) {
    var not = (document.getElementById('show').innerHTML = 'data is empty !!!');
    not.style.fontWeight = 'bold';
    return false;
  }

  var view = '<table border="1" cellpadding="5"><tbody>';
  list.forEach(function (user, index) {
    let id = index;
    index++;
    view += `<tr id="#edit-user-${id}">
     <th scope="row"><input type="checkbox" class="checkboxInput"></th>
     <td>${id + 1}</td>
     <td class="name-${id}" contenteditable="false" onfocusout="handleOutFocus(${id})">${
      user.name
    }</td>
     <td class="phone-${id}" contenteditable="false" onfocusout="handleOutFocus(${id})">${
      user.phone
    }</td>
     <td class="email-${id}" contenteditable="false" onfocusout="handleOutFocus(${id})">${
      user.email
    }</td>
     <td><button type="button" class="btn btn-outline-danger" onclick="deletePerson(${id})">Delete</button></td>
     <tr>`;
  });
  view += '<tbody></table>';
  show.innerHTML = view;
}

function deletePerson(id) {
  let list = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
  list.splice(id, 1);
  localStorage.setItem('data', JSON.stringify(list));
  const resultList = document.querySelector('#edit-user-' + id);
  if (resultList) {
    resultList.remove();
  }
  showData();
}

function deleteSelect() {
  let list = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
  const checkboxInput = document.getElementsByClassName('checkboxInput');

  for (let i = 0; i < checkboxInput.length; ++i) {
    if (checkboxInput[i].checked == true) {
      list.splice(checkboxInput[i], 1);
      localStorage.setItem('data', JSON.stringify(list));
      showData();
    }
    console.log(checkboxInput.length);
  }
}

// functions handle double click ------------------------------------------------------------------
// function handel double click constructure
function handleDbClick(selector) {
  selector.ondblclick = function (e) {
    e.target.setAttribute('contenteditable', true);
  };
}

// function handle OutFocus
function handleOutFocus(id) {
  let list = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
  const outFocusName = document.querySelector('.name-' + id);
  const outFocusPhone = document.querySelector('.phone-' + id);
  const outFocusEmail = document.querySelector('.email-' + id);
  if (list) {
    //Set attribute content edit table false;
    outFocusName.setAttribute('contenteditable', false);
    outFocusPhone.setAttribute('contenteditable', false);
    outFocusEmail.setAttribute('contenteditable', false);
    list.splice(id, 1, {
      name: outFocusName.textContent,
      phone: outFocusPhone.textContent,
      email: outFocusEmail.textContent,
    });
    localStorage.setItem('data', JSON.stringify(list));
  }
}
function handleElementValue() {
  let list = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
  if (list) {
    list.forEach(function (element, index) {
      const editName = document.querySelector('.name-' + index);
      const editPhone = document.querySelector('.phone-' + index);
      const editEmail = document.querySelector('.email-' + index);
      //Get value input
      handleDbClick(editName);
      handleDbClick(editPhone);
      handleDbClick(editEmail);
    });
  }
};
handleElementValue();

//--------- check validate function constructure---------------------------------
function isRequired(value, errMessage, typename) {
  if (value === '' || value == null) {
    errMessage.innerHTML = `Please fill user's ${typename} in field !!`;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
}
function isRegex(value, errMessage, regex, errRegex) {
  if (!regex.test(value)) {
    errMessage.innerHTML = errRegex;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
}
function isMax(value, errMessage, max) {
  if (value.length >= max) {
    errMessage.innerHTML = `** please input less than ${max} characters !!`;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
}
//ADD check validate function constructure--------------------------------------------------------------------------------------------
function addName(name, errName, typename) {
  const regName =
    /á|à|ạ|ã|ả|ă|ắ|ằ|ẳ|ặ|ẵ|â|ấ|ầ|ẫ|ẩ|ậ|é|è|ẽ|ẻ|ẹ|ê|ế|ề|ể|ễ|ệ|ì|í|ĩ|ị|ỉ|ò|ó|ỏ|õ|ọ|ô|ố|ồ|ộ|ổ|ỗ|ơ|ớ|ờ|ở|ợ|ỡ|ú|ù|ủ|ụ|ũ|ư|ứ|ừ|ữ|ử|ự|ý|ỳ|ỹ|ỵ|ỷ|đ|^[a-zA-Z]+([a-zA-Z]|\s)+$/;
  let errRegex = '** wrong format input value !!';
  if (!isRequired(name, errName, typename)) {
    return false;
  } else if (!isMax(name, errName, 50)) {
    return false;
  } else if (!isRegex(name, errName, regName, errRegex)) {
    return false;
  }

  return true;
}
function addEmail(email, errEmail, typename) {
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let errRegex = 'Invalid email format (ex: nguyentuankiet0105@gmail.com ) !!';

  if (!isRequired(email, errEmail, typename)) {
    return false;
  } else if (!isRegex(email, errEmail, regEmail, errRegex)) {
    return false;
  }

  return true;
}
function addPhone(phone, errPhone, typename) {
  const regPhone = /((0)+([0-9]{9})\b)/g;
  let errRegex = 'Begin at 0, at least 10 number!!';

  if (!isRequired(phone, errPhone, typename)) {
    return false;
  } else if (!isRegex(phone, errPhone, regPhone, errRegex)) {
    return false;
  }
  return true;
}
//format function constructure------------------------------------------------------------------
function formatPhone(phone) {
  phone = phone.replace(/(\d{4})(\d{3})(\d{3})/, '$1.$2.$3');
  return phone;
}

function formatName(name) {
  const arrName = name.split(' ');
  for (var i = 0; i < arrName.length; i++) {
    arrName[i] = arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1);
  }
  return arrName.join(' ');
}

// function keyup
document.onkeyup = function (event) {
  if (event.key == 'Shift') {
    addData();
  }
};
