const url = "https://jsonplaceholder.typicode.com/posts";

fetch(url)
  .then((res) => {
    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }
    return res.json();
  })
  .then((result) => DisplayData(result))
  .catch((error) =>
    console.error("There was a problem with the request:", error)
  );

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
