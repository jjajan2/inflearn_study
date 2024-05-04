const githubToken = "";
const apiUrl = "https://api.github.com";

async function findUser(id) {
  try {
    const response = await fetch(`${apiUrl}/users/${id}`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (response.status === 200) {
      return response.json();
    }

    if (response.status === 404) {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

async function findUserRepos(id) {
  try {
    const response = await fetch(`${apiUrl}/users/${id}/repos`, {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${githubToken}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    if (response.status === 200) {
      return response.json();
    }

    if (response.status === 404) {
      return [];
    }
    return response.json();
  } catch (error) {
    console.error(error);
  }
}

const userReposElement = document.querySelector(".user_repos");

async function renderUserProfile(event) {
  event.preventDefault();
  const searchInput = document.querySelector(".search_input");
  const userElement = document.querySelector(".user_area");
  const userData = await findUser(searchInput.value);
  searchInput.value = "";

  userElement.innerHTML = "";
  userReposElement.innerHTML = "";

  if (userData) {
    const {
      bio,
      login,
      avatar_url,
      followers,
      following,
      public_repos,
      public_gists,
      company,
      created_at,
      location,
      blog,
    } = userData;

    userElement.innerHTML = `
      <div class="user_profile">
        <img src="${avatar_url}" />
        <h4>${login}</h4>
        ${bio ? `<p>${bio}</p>` : ""}
        <div class="follow">
          <i class="fa-regular fa-user"></i>
          <span class="followers_cnt">${followers}</span> followers · <span class="following_cnt">${following}</span> following
        </div>
        <a href="https://github.com/${login}" target="_blank" class="user_profile_go">View Profile</a>
      </div>
      <div class="user_info">
        <div class="user_default_info">
          <p class="default_item">Public Repos : ${public_repos}</p>
          <p class="default_item">Public Gists : ${public_gists}</p>
        </div>
        <p class="user_info_item">Member since : ${created_at}</p>
        ${company ? `<p class="user_info_item">Company : ${company}</p>` : ""}
        ${
          location ? `<p class="user_info_item">Location : ${location}</p>` : ""
        }
        ${
          blog
            ? `<p class="user_info_item">Website/Blog : <a href="${blog}" target="_blank">${blog}</a></p>`
            : ""
        }
      </div>
    `;

    renderUserRepos(login);
  } else {
    userElement.innerHTML = `<div class="no_content">Not Found</div>`;
    userReposElement.innerHTML = "";
  }
}

async function renderUserRepos(userId) {
  const userReposData = await findUserRepos(userId);
  let reposHTML = "";

  userReposData.forEach((data) => {
    reposHTML += `
      <div class="repos">
        <h5 class="repos_name">
          <a href="${data.html_url}" target="_blank">${data.name}</a>
        </h5>
        <div class="repos_info">
          <span><i class="fa-solid fa-code-fork"></i> forks : ${data.forks_count}</span>
          <span><i class="fa-regular fa-star"></i> stars : ${data.stargazers_count}</span>
          <span><i class="fa-regular fa-eye"></i> watching : ${data.watchers_count}</span>
        </div>
      </div>
    `;
  });

  userReposElement.innerHTML = reposHTML;
}

const searchButton = document.querySelector(".search_button");

searchButton.addEventListener("click", (event) => {
  renderUserProfile(event);
});
