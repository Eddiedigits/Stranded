//--------- automatic downscroll

window.automaticDownscroll = function() {
    setTimeout(function() {
        window.scrollTo(0, document.body.scrollHeight);
    }, 0);
};

//--------- range in conditionals, works fabulously

Object.defineProperty(Number.prototype,'range',{
    configurable : true,
    writable     : true,
    value(min,max) {
        return this >= min && this <= max;
    }
  });
  
//-------------------- Pop-Up Scheduler
  
  document.addEventListener('keypress', function(event) {
      if (event.key === 'q') {
          // Access the Twine story variables
          var QuestPool = State.variables.QuestPool;
          var QuestPoolDone = State.variables.QuestPoolDone;
  
          var popup = document.createElement('div');
          popup.className = 'popup';
          popup.innerHTML = `
          <center><blockquote>
          <div class="passage-titles" style="color:#ff944d; border-bottom-color: #ff944d; border-top-color: #ff944d;"><center><h2><strong>Task Progressor</strong></h2></center></div>
          <br>
          <div class="order-indices"><div class="index-screens-normal"><div style="color:#ff944d"><strong>open tasks</strong></div>
            <div><ul>
            ${QuestPool.map(function(_name) { return `<li>${_name}</li>` }).join('')}
            </ul></div></div>
          </blockquote></center>
          `;
          
          if (document.querySelector('.popup') === null) {
              document.body.appendChild(popup);
          } else {
              document.querySelector('.popup').remove();
          }
      }
  });
  
  //--------------------------- animatin dots
  
  Macro.add('refreshDotAnimation', {
      handler: function () {
          var duration = 8000; // Duration in milliseconds (8 seconds)
          setTimeout(function () {
              Engine.play("DotAnimation");
          }, duration);
      }
  });
  
  //--------------------------- urgent message
  
  window.showCustomPopup = function() {
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.id = 'popup-urgent';
    popup.innerHTML = `
    <center><blockquote>
    <h2>Urgent Message from Camp Mountain!</h2>
    <p>Check the Task Monitor</p>
    <br>
    <button onclick="closeCustomPopup()">close</button>
    </blockquote></center>
    `;
  
    document.body.appendChild(popup);
  }
  
  // Function to close the custom popup
  window.closeCustomPopup = function() {
      document.getElementById('popup-urgent').remove();
  }  
  
 //--------------------------- urgent message nutrients quantity
  
 window.showWarningPopup = function() {
    var popup = document.createElement('div');
    popup.className = 'popup';
    popup.toggleAttribute.backgroundColor = 'rgba(139, 46, 66, 0.95)';
    popup.id = 'popup-urgent';
    popup.innerHTML = `
    <center><blockquote>
    <h2>Warning!</h2>
    <p>Nutrients quantity is low. Collect nutrients as much as now.</p>
    <br>
    <button onclick="closeWarningPopup()">close</button>
    </blockquote></center>
    `;
  
    document.body.appendChild(popup);
  }
  
  // Function to close the custom popup
  window.closeWarningPopup = function() {
      document.getElementById('popup-urgent').remove();
  }  
  
//--------------------------- remove one instance

  window.removeOne = function(arr, item) {
      const index = arr.indexOf(item);
      if (index > -1) {
          arr.splice(index, 1);
      }
      return arr;
  };

//--------------------------- mouseover Record of the Attack
    
    
    window.recOTattack = function() {
        const recofAtt = document.createElement('div');

        recofAtt.id = 'recordOftheAttack';
        recofAtt.innerHTML = `<img src="assets/backgrounds/Placeholder.png" style="margin:0">`;
        document.body.appendChild(recofAtt);

        const recordOfTheAttack = document.getElementById('recordOftheAttack');

        document.addEventListener('click', function(e) {
            if (e.target === recordOfTheAttack || e.target.parentNode === recordOfTheAttack) {
                recordOfTheAttack.remove();
            }
        });
        
        setTimeout(function() {
            if (document.getElementById('recordOftheAttack')) {
                recordOfTheAttack.remove();
            }
        }, 5000);

    };
   
//--------------------------- check whether all values are 100

window.allValues100 = function(obj, value) {
    return Object.values(obj).every(function(v) {
        return v === value;
    });
};

//--------------------------- do the players know?


document.addEventListener('DOMContentLoaded', function() {
    const group1 = ["AI", "artificial intelligence", "watcher", "guardian"];
    const group2 = ["not to be trusted", "compromised","complicit", "complicity", "influenced", "by", "in influence", "in throes with"];

    const input = document.getElementById('keywordInput');
    const message = document.getElementById('message');

    let tries = localStorage.getItem('tries') || 0;
    tries = parseInt(tries);

    let timer;
    const checkInput = function() {
        if (input && message) {
            const inputValue = input.value.toLowerCase();
            let foundGroup1 = false;
            let foundGroup2 = false;

            if (group1.some(word => inputValue.includes(word.toLowerCase()))) {
                foundGroup1 = true;
            }

            if (group2.some(word => inputValue.includes(word.toLowerCase()))) {
                foundGroup1 = true;
            }

            if (foundGroup1 && foundGroup2) {
                $epilog = true
                message.textContent = 'Valid combination found.';
                message.style.color = 'green';
                clearInterval(timer);
            } else if (input.value.length > 0 && !(foundGroup1 && foundGroup2)) {
                tries++;
                localStorage.setItem('tries', tries);
                if (tries >= 3) {
                    message.textContent = 'It is the AI.';
                    message.style.color = 'red';
                    $epilog = true;
                    clearInterval(timer);
                } else {
                    message.textContent = 'No valid combination found.';
                    message.style.color = 'red';
                }
            } else {
                message.textContent = '';
            }
        }
    };

    input.addEventListener('input', checkInput);
    timer = setInterval(checkInput, 3000);
});
//---------------------------