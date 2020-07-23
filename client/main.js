let data = fetch("https://curriculum-api.codesmith.io/messages", {
  method: "GET"
})
  .then(function(response) {
    // console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(function(json) {
    let messages = json;
    getMessages(messages);
    return messages;
  }).then(previousSet => {
    setTimeout(compareAndGet(previousSet, 500));
  })
  .catch(function(error) {
    console.log("Request failed:" + error.message);
  });



function getMessages(test) {
  for (let i = test.length - 1; i >= 0; i--) { // element test
    //console.log(element);
    let wholeMessageBox = document.createElement("div");
    wholeMessageBox.setAttribute("class", "wholeMessageBox");
    const display = document.querySelector("#display");
    display.prepend(wholeMessageBox);

    let first = document.createElement("div");
    first.setAttribute("class", "first");
    const readableDate =
      test[i]["created_at"].slice(5, 10) +
      "   " +
      test[i]["created_at"].slice(11, 16);
    first.innerHTML =
      "<h6>" + test[i].created_by + "</h6> <span class='date'> " + readableDate + " </span>";
    wholeMessageBox.appendChild(first);

    let second = document.createElement("div");
    second.setAttribute("class", "second");
    second.innerHTML = "<p>" + test[i].message + "</p>";
    wholeMessageBox.appendChild(second);

    // display.style.display = 'flex';
    // display.scrollTo(0, );
  }


}

const button = document.querySelector('button');
button.addEventListener('click', postMessage);

// setInterval(...., 500);

function compareAndGet(prev) {
  let data = fetch("https://curriculum-api.codesmith.io/messages", {
  method: "GET"
})
  .then(function(response) {

    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(function(json) {
    let messages = json;
    // console.log(messages);
    if (messages.length != prev.length) {
      const start = prev.length;
      getMessages(messages.slice(0, messages.length - start));

    }
    return messages;
  }).then(previousSet => {
    setTimeout(compareAndGet(previousSet, 500));
  })
  .catch(function(error) {
    console.log("Request failed:" + error.message);
  });
}

function postMessage() {
    const input = document.querySelector('#input');
    const message = input.value;
    input.value = '';
    const username = document.querySelector('#username').value;



    const body = {
      'created_by': username,
      'message': message
    }

    // console.log(body);


    fetch('https://cors-anywhere.herokuapp.com/https://curriculum-api.codesmith.io/messages', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {'Content_Type': 'application/json'}
      // 'Access-Control-Allow-Headers': '*'
      // mode: 'no-cors'
    })
    // .then(data => data.json())
    //   .then(data => {
    //     console.log(data)
    //     getMessages(data);
    //   })


}
