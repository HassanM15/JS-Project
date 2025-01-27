var NewReq = new XMLHttpRequest();

var url = "https://jsonplaceholder.typicode.com/posts";

NewReq.open("GET", url);

NewReq.send()

console.log(NewReq.readyState)


NewReq.addEventListener('readystatechange',function(e){
    
    if(NewReq.readyState === 4)
    {
        Data = JSON.parse(NewReq.response);
        DisplayData(Data);
    }

})

function DisplayData(Data)
{
    var result = ``;
    
    for (var i = 0; i < Data.length; i++)
    {
        result += `
        <div class="post">
            <h2>${Data[i].title}</h2>
            <p>${Data[i].body}</p>
        </div>
        `;
    }
    document.getElementById('result').innerHTML = result
}