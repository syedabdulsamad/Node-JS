console.log("Before");
getUser(1)
    .then(user => getRepoforUser(user.githubUsername))
    .then(repos => displayRepos(repos))
    .catch(error => console.log(error.message));

console.log("After");

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetching user with Id :" + id);
            //resolve({id: id, githubUsername: "abdulsamadsyed"});
            reject(Error ("Failed to get user"));
        }, 2000);
    });
}

function displayRepos(repos) {
    console.log(repos);
}

function getRepoforUser(userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("Fetch repos for user :" + userName);
            resolve(["repo0","repo1","repo2","repo3","repo4"]);
            //reject(Error ("Failed to get repos"));
        }, 2000);
    });
}
