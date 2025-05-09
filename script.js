function getData(username) {
    return fetch(`https://api.github.com/users/${username}`)
    .then((data)=>{
        if(!data.ok) throw new Error("User not found ⚠️");
        return data.json();
    });
}
function getRepos(url) {
    return fetch(url)
    .then(data=>data.json());
}
const months = {
    1:"January",
    2:"Febuary",
    3:"March",
    4:"April",
    5:"May",
    6:"June",
    7:"July",
    8:"August",
    9:"September",
    10:"October",
    11:"November",
    12:"Descember",
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
    const joinDate = document.querySelector(".profile-info > p");

    const username = input.value.trim();
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
        // website.href = `https://www.github.com/${username}`;
        website.href = data.html_url;
        
        let rawDate = data.created_at.split("-");
        console.log(rawDate);
        joinDate.innerText = `Joined ${rawDate[2].slice(0,2)} ${months[rawDate[1]]} ${rawDate[0]}`
    });
    
})

const themeSwitcher = document.querySelector(".theme-switcher");
const searchBar = document.querySelector(".search-bar");
const userCard = document.querySelector(".user-card");
const userAura = document.querySelector(".user-aura");
const locationNode = document.querySelector("#location");
const websiteNode = document.querySelector("#website");

themeSwitcher.addEventListener('click',()=>{
    const themeMode = themeSwitcher.childNodes;
    const themeLogo = themeMode[3].childNodes;
    let locationLogo = locationNode.previousElementSibling.children[0];
    let websiteLogo = websiteNode.previousElementSibling.children[0];
    if (themeMode[1].textContent == "LIGHT") {
        themeMode[1].textContent = "DARK";
        themeLogo[1].src = "./assets/icon-moon.svg";
        locationLogo.src = "./assets/icon-location.svg";
        websiteLogo.src = "./assets/icon-website.svg";
    }
    else{
        themeMode[1].textContent = "LIGHT";
        themeLogo[1].src = "./assets/icon-sun.svg";
        locationLogo.src = "./assets/icon-location-white.svg";
        websiteLogo.src = "./assets/icon-website-white.svg";
    }
    document.body.classList.toggle('light');
    searchBar.classList.toggle('light-search');
    userCard.classList.toggle('light-search');
    userAura.classList.toggle('user-aura-light');
    input.classList.toggle('input-light');
    console.log(locationNode.previousElementSibling.children[0]);
})