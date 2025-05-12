function getData(username) {
  return fetch(`https://api.github.com/users/${username}`).then((data) => {
    if (!data.ok) {
        console.log(data);
        const userContainer = document.querySelector(".user-card-container");
        userContainer.classList.add("alert-container");
        const error = document.createElement("div");
        error.classList = "popup-alert";
        error.textContent = "User not found ⚠️";
        userContainer.append(error);
        // console.log(error);
        throw new Error("User not found ⚠️");
    }
    return data.json();
  });
}
function getRepos(url) {
  return fetch(url).then((data) => data.json());
}
// months by number mapping
const months = {
  "01": "January",
  "02": "Febuary",
  "03": "March",
  "04": "April",
  "05": "May",
  "06": "June",
  "07": "July",
  "08": "August",
  "09": "September",
  10: "October",
  11: "November",
  12: "Descember",
};
const submitBtn = document.querySelector('input[type="submit"]');
const input = document.querySelector('input[type = "text"]');
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const cardContainer = document.querySelector(".user-card-container");
  const userCard = document.createElement("div");
  userCard.className = "user-card";
  cardContainer.innerHTML = "";
  // console.log(userCard.hasChildNodes());

  const username = input.value.trim();
  getData(username).then((data) => {
    console.log(data);

    // data hai ya nhi wala logic
    let location = data.location;
    if (!data.location) {
      location = "unknown";
    }
    let userName = data.name;
    if (!userName) {
      userName = "Name not found!";
    }
    let bio = data.bio;
    if (!bio) {
      bio = "No bio...";
    }

    //fetching user repositories
    getRepos(data.repos_url).then((myRepos) => {
      let reposLength = myRepos.length;
      let rawDate = data.created_at.split("-");
      let joinDate = `Joined ${rawDate[2].slice(0, 2)} ${months[rawDate[1]]} ${
        rawDate[0]
      }`;

      userCard.innerHTML = `
         <div class="user-card">
                <div class="card-header">
                    <div class="profile-pic">
                        <img src=${data.avatar_url} alt="profile pic">
                    </div>
                    <div class="profile-info">
                        <div class="profile-identity">
                            <h2>${userName}</h2>
                            <p>${data.login}</p>
                        </div>
                        <p>${joinDate}</p>
                    </div>
                </div>
                <div class="card-bio">
                    <p>${bio}</p>
                </div>
                <div class="user-aura">
                    <div class="user-aura-col">
                        <p>Repos</p>
                        <h3 id="repos">${reposLength}</h3>
                    </div>
                    <div class="user-aura-col">
                        <p>Followers</p>
                        <h3 id="followers">${data.followers}</h3>
                    </div>
                    <div class="user-aura-col">
                        <p>Following</p>
                        <h3 id="following">${data.following}</h3>
                    </div>
                </div>
                <div class="other-info-container">
                    <div class="other-info-col">
                        <div class="other-info">
                            <div class="other-info-logo">
                                <img src="./assets/icon-location-white.svg" alt="location svg">
                            </div>
                            <p id="location">${location}</p>
                        </div>
                        <div class="other-info">
                            <div class="other-info-logo">
                                <img src="./assets/icon-website-white.svg" alt="location svg">
                            </div>
                            <a href=${data.html_url} id="website" target="_blank">Profile</a>
                        </div>
                    </div>
                    <div class="other-info-col"></div>
                </div>
            </div>
        `;
      cardContainer.appendChild(userCard);
    }).then(()=>themeToggle());
  });
});

// theme toggle functionality
function themeToggle() {
    const themeSwitcher = document.querySelector(".theme-switcher");
    const searchBar = document.querySelector(".search-bar");
    const userCard = document.querySelector(".user-card-container");
    const userAura = document.querySelector(".user-aura");
    const locationNode = document.querySelector("#location");
    const websiteNode = document.querySelector("#website");
    
    themeSwitcher.addEventListener("click", () => {
        const themeMode = themeSwitcher.childNodes;
        const themeLogo = themeMode[3].childNodes;
        let locationLogo = locationNode.previousElementSibling.children[0];
        let websiteLogo = websiteNode.previousElementSibling.children[0];
        if (themeMode[1].textContent == "LIGHT") {
            themeMode[1].textContent = "DARK";
            themeLogo[1].src = "./assets/icon-moon.svg";
            locationLogo.src = "./assets/icon-location.svg";
            websiteLogo.src = "./assets/icon-website.svg";
            // userCard.style.backgroundColor = "var(--light-tertiary) !important"
        } else {
            themeMode[1].textContent = "LIGHT";
            themeLogo[1].src = "./assets/icon-sun.svg";
            locationLogo.src = "./assets/icon-location-white.svg";
            websiteLogo.src = "./assets/icon-website-white.svg";
        }
        document.body.classList.toggle("light");
        searchBar.classList.toggle("light-search");
        userCard.classList.toggle("light-search");
        userAura.classList.toggle("user-aura-light");
        input.classList.toggle("input-light");
    });    
}