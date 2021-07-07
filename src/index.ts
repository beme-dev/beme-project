import { Octokit, App } from "octokit";

const octokit = new Octokit({ auth: process.env.GITHUB_OCTOKIT_TOKEN });

console.log("token :", process.env.GITHUB_OCTOKIT_TOKEN);
// console.log('auth :', octokit.auth);

const list = octokit.rest.repos.listForUser({ username: "chlbri" });
list.then((val) =>
  console.log(
    "list Public : ",
    val.data.map((data) => data.full_name)
    // .filter((val) => val.owner?.html_url === "https://github.com/chlbri")
  )
);

// octokit.auth().then(console.log)
