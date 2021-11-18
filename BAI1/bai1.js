function submitions() {
  event.preventDefault();

  var name = document.getElementById('name').value.trim();
  var email = document.getElementById('email').value.trim();
  var phone = document.getElementById('phone').value.trim();
  var birthday = document.getElementById('birthday').value;
  var password = document.getElementById('password').value.trim();
  var cfmPassword = document.getElementById('cfmpassword').value.trim();

  const errName = document.getElementById('invalid_Name');
  const errEmail = document.getElementById('invalid_Email');
  const errPhone = document.getElementById('invalid_Phone');
  const errBirthday = document.getElementById('invalid_Birthday');
  const errPassword = document.getElementById('invalid_Password');
  const errCfmPassword = document.getElementById('invalid_Confirm-Password');

  const dataName = document.getElementById('data_name');
  const dataEmail = document.getElementById('data_email');
  const dataPhone = document.getElementById('data_phone');
  const dataBirthday = document.getElementById('data_birthday');
  const dataAvatars = document.getElementById('avatars');

  // add data
  const addNewName = addName(name, errName, 'Fullname');

  const addNewEmail = addEmail(email, errEmail, 'Email');

  const addNewPhone = addPhone(phone, errPhone, 'Phone number');

  const addNewBirthday = addBirthday(birthday, errBirthday, 'birthday');

  const addNewPassword = addPassword(password, errPassword);

  const checkCfmPw = checkCfmPassword(password, cfmPassword);

  const checkAll = true;
  //format data
  name = formatName(name);

  phone = formatPhone(phone);

  birthday = formatBirthday(birthday);
  
  // check submit
  // if (password !== cfmPassword) {
  //   errCfmPassword.innerHTML = `Password and confirm password not match, please check again`;
  // }
  if (addNewName && addNewEmail && addNewPhone && addNewBirthday && addNewPassword ) {
    errName.innerHTML = '';
    errEmail.innerHTML = '';
    errPhone.innerHTML = '';
    errBirthday.innerHTML = '';
    errPassword.innerHTML = '';
    errCfmPassword.innerHTML = '';

    dataName.innerHTML = name;
    dataEmail.innerHTML = email;
    dataPhone.innerHTML = phone;
    dataBirthday.innerHTML = birthday;
    dataAvatars.style.display = 'block';
  } else {
    errCfmPassword.innerHTML = '';
  }
}

//-------------------------------------------------------------------------------------------------------------
// required function constructure
function isRequired(value, errMessage, typename) {
  if (value === '' || value == null) {
    errMessage.innerHTML = `** Please fill your ${typename} in field !!`;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
}

// Max characters function constructure
function isMax(value, errMessage, max) {
  if (value.length >= max) {
    errMessage.innerHTML = `** please input less than ${max} characters !!`;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
}

//Regex function constructure
function isRegex(value, errMessage, regex, errRegex) {
  if (!regex.test(value)) {
    errMessage.innerHTML = errRegex;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
}

// between lenght characters input function constructure
function isBetween(value, errMessage, min, max) {
  if (value.length < min || value.length > max) {
    errMessage.innerHTML = `Characters lenght must be between ${min} and ${max}`;
    return false;
  }
  errMessage.innerHTML = '';
  return true;
}
//------------------------------------------------------------------------------------------------------------
//format phone constructure function
function formatPhone(phone) {
  phone = phone.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
  return phone;
}

//format name constructure function
function formatName(name) {
  const arrName = name.split(' ');
  for (var i = 0; i < arrName.length; i++) {
    arrName[i] = arrName[i].charAt(0).toUpperCase() + arrName[i].slice(1);
  }
  return arrName.join(' ');
}

//format birthday constructure function
function formatBirthday(birthday) {
  var day = new Date(birthday).getDate();
  var month = new Date(birthday).getMonth() + 1;
  var year = new Date(birthday).getFullYear();
  if (day < 10) {
    return (birthday = `0${day} - ${month} - ${year}`);
  } else if (month < 10) {
    return (birthday = `${day} - 0${month} - ${year}`);
  } else if (year < 1930 || year > 2022) {
    errBirthday.innerHTML = 'Please check your ages !!';
    return false;
  }
  birthday = `${day} - ${month} - ${year}`;
  return birthday;
}

//-------------------------------------------------------------------------------------------------------------

//add Name constructure function
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

//add Email constructure function
function addEmail(email, errEmail, typename) {
  const regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  let errRegex = '** Invalid email format (ex: nguyentuankiet0105@gmail.com ) !!';

  if (!isRequired(email, errEmail, typename)) {
    return false;
  } else if (!isRegex(email, errEmail, regEmail, errRegex)) {
    return false;
  }

  return true;
}

//add Phone constructure function
function addPhone(phone, errPhone, typename) {
  const regPhone = /((0)+([0-9]{9})\b)/g;
  let errRegex = '** Begin at 0, at least 10 number ( ex: 0123456789 )!!';
  if (!isRequired(phone, errPhone, typename)) {
    return false;
  } else if (!isRegex(phone, errPhone, regPhone, errRegex)) {
    return false;
  }

  return true;
}

//add Birthday constructure function
function addBirthday(birthday, errBirthday, typename) {
  if (!isRequired(birthday, errBirthday, typename)) {
    return false;
  }
  return true;
}

//add Password constructure function
function addPassword(password, errPassword) {
  const regPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
  const errorRegex = 'Password has at least one special character, number and uppercase letter';
  if (isRegex(password, errPassword, regPassword, errorRegex)) {
    return false;
  }

  return true;
}

//function load image -------------------------------------------------

const reader = new FileReader();

function uploadImg() {
  const avatar = document.getElementById('avatar');
  const avatars = document.getElementById('avatars');
  const imgLoad = document.getElementById('file').files[0];
  reader.addEventListener(
    'load',
    function () {
      // convert image file to base64 string
      avatar.src = reader.result;
      avatars.src = reader.result;
    },
    false
  );
  reader.readAsDataURL(imgLoad);
}

function checkCfmPassword(password, cfmPassword) {
  if (password !== cfmPassword) {
    return false;
  }

  return true;
}
//----------------------------------------------------------------------
//Reset function
function resetForm() {
  location.reload();
}

// function keyup
document.onkeyup = function (event) {
  if (event.key == 'Shift') {
    submitions();
  }
  if (event.key == 'Delete') {
    resetForm();
  }
};
