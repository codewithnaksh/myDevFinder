function getData(username) {
    return fetch(`https://api.github.com/users/${username}`)
    .then(data=>data.json());
}
function getRepos(url) {
    return fetch(url)
    .then(data=>data.json());
}

const submitBtn = document.querySelector('input[type="submit"]');
const input = document.querySelector('input[type = "text"]');
submitBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    // console.log('clicked');
    const profile = document.querySelector(".profile-pic > img");
    const name = document.querySelector(".profile-identity > h2");
    const bio = document.querySelector(".card-bio > p");
    const repos = document.getElementById("repos");
    const followers = document.getElementById("followers");
    const following = document.getElementById("following");
    const location = document.getElementById("location");
    const website = document.getElementById("website");


    const username = input.value;
    getData(username)
    .then((data)=>{
        console.log(data);
        profile.src = data.avatar_url;
        name.innerText = data.name;
        bio.innerText = data.bio;
        getRepos(data.repos_url)
        .then((myRepos)=>{
            const reposLen = myRepos.length;
            console.log("Number of repositories:",reposLen);
            repos.innerText = reposLen;
        });
        followers.innerText = data.followers;
        following.innerText = data.following;
        if(data.location){
            location.innerText = data.location;
        } 
        else{
            location.innerText = "unknown";
            location.parentElement.style.opacity = "0.35";
        }
        website.href = `https://www.github.com/${username}`;
    });
    
})