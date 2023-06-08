window.addEventListener('load', function() {
    var prefix = '@A-';
    var randomCode = generateRandomCode();
    var inputElement = document.getElementById('sessionid');
    inputElement.value = prefix + randomCode;
  });
  function generateRandomCode() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var codeLength = 5;
    var randomCode = '';
    for (var i = 0; i < codeLength; i++) {
      var randomIndex = Math.floor(Math.random() * characters.length);
      randomCode += characters.charAt(randomIndex);
    }
    return randomCode;
  };
  function selectProduct(productIndex) {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
      card.classList.remove('selected');
      const radio = card.querySelector('input[type="radio"]');
      if (index + 1 === productIndex) {
        card.classList.add('selected');
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    });
  }