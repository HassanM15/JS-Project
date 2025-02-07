const url = "https://jsonplaceholder.typicode.com/posts";

fetch(url)
  .then((res) => res.json())
  .then((result) => DisplayData(result))
  .catch((error) => console.log(error));

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
