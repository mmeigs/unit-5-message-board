let data = fetch("https://curriculum-api.codesmith.io/messages", {
  method: "GET"
})
  .then(function(response) {
    console.log(response);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.statusText);
  })
  .then(function(json) {
    let messages = json;
    console.log(messages);
    getMessages(messages);
  })
  .catch(function(error) {
    console.log("Request failed:" + error.message);
  });

function getMessages(test) {
  for (let element of test) {
    //console.log(element);
    let wholeMessageBox = document.createElement("div");
    wholeMessageBox.setAttribute("class", "wholeMessageBox");
    const display = document.querySelector("#display");
    display.appendChild(wholeMessageBox);

    let first = document.createElement("div");
    first.setAttribute("class", "first");
    const readableDate =
      element["created_at"].slice(5, 10) +
      "   " +
      element["created_at"].slice(11, 16);
    first.innerHTML =
      "<h6>" + element.created_by + "</h6> <span> " + readableDate + " </span>";
    wholeMessageBox.appendChild(first);

    let second = document.createElement("div");
    second.setAttribute("class", "second");
    second.innerHTML = "<p>" + element.message + "</p>";
    wholeMessageBox.appendChild(second);
  }
}
