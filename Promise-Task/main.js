const getData = (url) => {
  return new Promise((resolve, rejected) => {
    var http = new XMLHttpRequest();
    http.open("GET", url);
    http.send();
    http.addEventListener("readystatechange", function (e) {
      if (http.readyState === 4) {
        if (http.status === 200) {
          resolve(JSON.parse(http.response));
        } else {
          rejected(Error("error"));
        }
      }
    });
  });
};

function DisplayData(Data) {
  var result = ``;

  for (var i = 0; i < Data.length; i++) {
    result += `
        <div class="post">
            <h2>${Data[i].title}</h2>
            <p>${Data[i].body}</p>
        </div>
        `;
  }
  document.getElementById("result").innerHTML = result;
}

// Call the function using the promise
getData("https://jsonplaceholder.typicode.com/posts")
  .then((data) => DisplayData(data))
  .catch((error) =>
    console.error("There was a problem with the request:", error)
  );
