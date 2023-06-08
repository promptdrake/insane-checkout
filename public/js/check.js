
function startProgressBar() {
  const progressBar = document.getElementById('progressBar');
  let progress = 0;
  const interval = setInterval(() => {
    progress += 1;
    progressBar.value = progress;
    document.getElementById('total').innerHTML = progress + '%';
    if (progress >= 500) {
      clearInterval(interval);
      submitForm();
    }
    if (progress === 100) {
      console.log('[Grizzly Security] Starting session Antibot')
      document.getElementById('status').innerHTML = 'Checking Antibot...';
      function generateCaptcha() {
      const number1 = Math.floor(Math.random() * 10);
      const number2 = Math.floor(Math.random() * 10);
      const operator = ['+', '-'][Math.floor(Math.random() * 3)];

      const expression = `${number1} ${operator} ${number2}`;
      const result = eval(expression); // Evaluate the expression to get the expected result
      const userInput = prompt(`Please solve this for continued\n\n${expression}`);

      if (userInput !== null && parseInt(userInput) === result) {
        console.log('[Grizzly Security] Antibot Passed')
        return true
      } else {
        alert('An Error has been issued')
        location.reload();
      }
      if(!userInput) {
        location.reload();
      }
    }

    generateCaptcha();
      
    }
    if (progress === 103) {
      document.getElementById('status').innerHTML = 'Passed';
    }
    if (progress === 250) {
      document.getElementById('status').innerHTML = 'Wake Up The server...';
    }
    if (progress === 350) {
      document.getElementById('status').innerHTML = 'Server Responded 🚩';
    }
    if (progress === 400) {
      document.getElementById('status').innerHTML = 'Checking All Query...';
    }
  }, 30);
}

function submitForm() {
  const form = document.getElementById('working');
  form.submit();
}

function bypass() {
  const form = document.getElementById('working');
  form.submit();
}

setTimeout(startProgressBar, 1000);