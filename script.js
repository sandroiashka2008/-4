let myform = document.getElementById("myform");
let input = document.getElementById("username");
let isDarkMode = false;

document.querySelector(".moon").addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle("dark-mode", isDarkMode);

    const modeText = isDarkMode ? "LIGHT" : "DARK";
    document.querySelector(".dark").textContent = modeText;

    const toggleIcon = document.getElementById("toggle-icon");
    toggleIcon.src = isDarkMode ? "./images/002-sun.svg" : "./moon.png"; 
    toggleIcon.alt = isDarkMode ? "sun" : "moon";
});

myform.addEventListener("submit", (e) => {
    e.preventDefault();
    getData();
});

async function getData() {
    try {
        let username = input.value.trim(); 
        if (!username) {
            showError("no username.");
            return;
        }
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) {
            showError("User not found. Please try another username.");
            return;
        }
        const data = await res.json();
        renderToHtml(data);
    } catch (error) {
        console.error(error);
        showError("Something went wrong. Please try again later.");
    }
}

function renderToHtml(data) {
    clearError(); 
    let container = document.querySelector(".last-box");

    container.innerHTML = `
        <div class="fiso1">
            <img class="fiso" src="${data.avatar_url}" alt="${data.name || "User's avatar"}" />
        </div>
        <div class="last-sectiom">
            <div class="last">
                <div class="gap">
                    <div class="fourdiv">
                        <div class="divs">
                            <div class="twoText">
                                <h3 class="text3">${data.name || "No Name"}</h3>
                                <h3 class="text4">@${data.login}</h3>
                            </div>
                            <div class="thirdDiv">
                                <h3 class="text5">Joined ${new Date(data.created_at).toDateString()}</h3>
                            </div>
                        </div>
                        <div>
                            <h3 class="text6">${data.bio || "This profile has no bio"}</h3>
                        </div>
                    </div>
                    <div class="box">
                        <div class="item1">
                            <h2 class="h21">Repos</h2>
                            <h4 class="h41">${data.public_repos}</h4>
                        </div>
                        <div class="item">
                            <h2 class="h22">Followers</h2>
                            <h4 class="h41">${data.followers}</h4>
                        </div>
                        <div class="item3">
                            <h2 class="h23">Following</h2>
                            <h4 class="h41">${data.following}</h4>
                        </div>
                    </div>
                </div>
                <div class="lastdivs">
                    <div class="last-twodiv">
                        <div class="icons">
                            <img src="./images/003-pin.svg" alt="location" />
                            <h3 class="texts">${data.location || "Not Available"}</h3>
                        </div>
                        <div class="icons">
                            <img src="./images/002-url.svg" alt="blog" />
                            <h3 class="texts">
                                ${
                                  data.blog
                                    ? `<a href="${data.blog}" target="_blank" rel="noopener noreferrer">${data.blog}</a>`
                                    : "Not Available"
                                }
                            </h3>
                        </div>
                    </div>
                    <div class="last-twodiv1">
                        <div class="icons">
                            <img src="./images/004-twitter.svg" alt="twitter" />
                            <h3 class="texts">${data.twitter_username || "Not Available"}</h3>
                        </div>
                        <div class="icons">
                            <img src="./images/001-office-building.svg" alt="company" />
                            <h3 class="texts">${data.company || "Not Available"}</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function showError(message) {
    clearError(); 
 input.style.position = "relative";
 const errorSpan = document.createElement("span");
 errorSpan.textContent = message;
 errorSpan.className = "error-message";
 errorSpan.style.position = "absolute";
 errorSpan.style.right = "140px"; 
 errorSpan.style.top = "50%"; 
 errorSpan.style.transform = "translateY(-50%)";
 errorSpan.style.color = "red";
 errorSpan.style.fontSize = "14px";
 errorSpan.style.fontWeight = "bold";
 const parent = input.parentElement;
 parent.style.position = "relative";
 parent.appendChild(errorSpan);



}

function clearError() {
    const errorSpan = document.querySelector(".error-message");
    if (errorSpan) errorSpan.remove();
    input.style.border = ""; 
}
