document
  .getElementById("userForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const url = "https://jsonplaceholder.typicode.com/posts";

    const data = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      age: document.getElementById("age").value,
      email: document.getElementById("email").value,
    };

    let Post = {
      method: "POST",
      body: JSON.stringify(data),
    };

    fetch(url, Post)
      .then((res) => res.json())
      .then((result) => console.log(result))
      .catch((error) => console.log(error));
  });

