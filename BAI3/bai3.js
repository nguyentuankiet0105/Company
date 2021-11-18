window.addEventListener('load', function () {
  let contentChat = JSON.parse(localStorage.getItem('contentChat'));
  //get form input----------------------------------------------------------------------
  const clientOne = document.querySelector('.screen-1 .mess-form');
  const clientTwo = document.querySelector('.screen-2 .mess-form');

  const messInput1 = document.querySelector('.screen-1 .mess-input');
  const messInput2 = document.querySelector('.screen-2 .mess-input');

  const sendBtn1 = document.querySelector('.screen-1 .mess-send-btn ');
  const sendBtn2 = document.querySelector('.screen-2 .mess-send-btn ');

  const messDisplay1 = document.querySelector('.screen-1 .mess-display');
  const messDisplay2 = document.querySelector('.screen-2 .mess-display');

  const btnResetInput1 = document.querySelector('.screen-1 .btn-reset');
  const btnResetInput2 = document.querySelector('.screen-2 .btn-reset');

  const avatarPr1 = './user2.png';
  const avatarPr2 = './user1.jpg';

  // function push localStorage chat value -------------------------------------------------
  function sendMessage(event, receiver, messInput) {
    event.preventDefault();
    contentChat = JSON.parse(localStorage.getItem('contentChat'));
    const textMess = messInput.innerHTML.trim();
    if (!textMess) return;
    if (contentChat) {
      contentChat.push({
        id: contentChat.length + 1,
        receiver: receiver,
        content: textMess,
      });
      localStorage.setItem('contentChat', JSON.stringify(contentChat));
    } else {
      const newContentMsg = { id: 1, receiver: receiver, content: textMess };
      localStorage.setItem('contentChat', JSON.stringify([newContentMsg]));
    }
    getContentChat(receiver, textMess);
    cleanData(messInput);
    isDisabled(receiver);
  }
  // function get value content and switch side display ----------------------------------------
  function getContentChat(receiver, content) {
    if (receiver === 2) {
      messDisplay1.insertAdjacentHTML('beforeend', showContent(avatarPr2, content, 'right'));
      messDisplay2.insertAdjacentHTML('beforeend', showContent(avatarPr2, content, 'left'));
    } else {
      messDisplay1.insertAdjacentHTML('beforeend', showContent(avatarPr1, content, 'left'));
      messDisplay2.insertAdjacentHTML('beforeend', showContent(avatarPr1, content, 'right'));
    }
  }

  // function display content chat ------------------------------------------------------------------------
  function showContent(avatar, content, side) {
    const show = `<div class="msg ${side}-msg">
				<div class="msg-img" style="background-image: url(${avatar})"></div>
				<div class="msg-bubble">
					<div class="msg-text">
						${content}
					</div>
				</div>
			</div>`;
    return show;
  }
  // get storage contentChat binding ----------------------------------------------------------------------
  (function () {
    if (contentChat) {
      contentChat.forEach((element) => {
        getContentChat(element.receiver, element.content);
      });
    }
    cleanData(messInput1);
    cleanData(messInput2);
  })();

  //   clean Value input after submit, Scroll overflow -----------------------------------------------------
  function cleanData(messInput) {
    messInput.innerHTML = '';
    messDisplay1.scrollTop = 1000;
    messDisplay2.scrollTop = 1000;
  }
  //function disable send-button client anothers when typing -----------------------------------------------
  function isDisabled(receiver) {
    if (receiver === 1) {
      sendBtn2.disabled = true;
    } else {
      sendBtn1.disabled = true;
    }
  }
  //function enable send button when value valid -----------------------------------------------------------
  function isEnabled(element, text) {
    if (text.trim().length > 0) {
      element.disabled = false;
    } else {
      element.disabled = true;
    }
  }
  // submit chat screen 1
  clientOne.addEventListener(
    'submit',
    function () {
      sendMessage(event, 2, messInput1);
    },
    false
  );
  // submit chat screen 2
  clientTwo.addEventListener(
    'submit',
    function () {
      sendMessage(event, 1, messInput2);
    },
    false
  );
  // enter mess input client 1
  messInput1.addEventListener('input', (e) => {
    const text = e.target.textContent;
    isEnabled(sendBtn1, text);
  });

  // enter mess input client 2
  messInput2.addEventListener('input', (e) => {
    const text = e.target.textContent;
    isEnabled(sendBtn2, text);
  });

  
  //   reset btn data
  (function () {
    btnResetInput1.addEventListener('click', function () {
      if (messInput1.innerHTML) {
        messInput1.innerHTML = '';
      }
    });
    btnResetInput2.addEventListener('click', function () {
      if (messInput2.innerHTML) {
        messInput2.innerHTML = '';
      }
    });
  })();
});
