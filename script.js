function getData(username) {
    return fetch(`https://api.github.com/users/${username}`)
    .then(data=>data.json());
}

getData("codewithnaksh")
.then((data)=>{
    console.log(data);
});