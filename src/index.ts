import { Octokit } from "@octokit/rest";
import { sleep, sleepPromise } from "./utils/sleep";
import { createApp } from "./create_app";
import { deleteApp } from "./delete_app";

const octokit = new Octokit({ auth: process.env.GITHUB_OCTOKIT_TOKEN });
// console.log("token :", process.env.GITHUB_OCTOKIT_TOKEN);
// console.log('auth :', octokit.auth);

// octokit.rest.repos
//   .createInOrg({
//     org: "react-if",
//     name: "from-octokit10",
//   })
//   .then((val) => {
//     const res = val.data;
//     console.log("**************************");
//     console.log("id :", res.id);
//     console.log("Full Name :", res.full_name);

//     console.log("url :", res.url);
//     console.log("git_url :", res.git_url);
//     console.log("html_url :", res.html_url);

//     console.log("**************************");
//     console.log("**************************");

//     console.log("status :", val.status);
//     console.log("server :", val.headers.server);
//   })
//   .catch((er) => {
//     const res = er.response;
//     console.log("Request status :", res.status);
//     console.log("Global Messages :", res.data.message);
//     console.log(
//       "errors :",
//       res.data.errors.map(({ code, message }: any) => ({ code, message }))
//     );
//     console.log("Error docs :", res.data.documentation_url);
//   });

// octokit.gitignore
//   .getAllTemplates({ request: { timeout: 2000 } })
//   .then(console.log);

// octokit.repos
//   .listForOrg({
//     org: "react-if",
//   })
//   .then((val) => {
//     const res = val.data.map((data) => ({
//       repo: data.full_name,
//       owner: data.owner?.login || "chlbri",
//     }));
//     console.log("Repos :", res);
//     res.forEach(({ owner, repo }) => {
//       octokit.rest.repos.delete({ owner, repo });
//     });
//   });

// octokit.rest.orgs.get({ org: "react-if" }).then((val) => val);
// octokit.rest.repos
//   .listForOrg({ org: "react-if" })
//   .then((val) => val.data)
//   .then((data) => data.map((data) => data.owner?.login))
//   .then(console.log);
// octokit.rest.repos
//   .delete({
//     owner: "react-if",
//     repo: "from-octokit2",
//   })
//   .then(console.log)
//   .catch(console.log);

// const list = octokit.rest.repos.listForUser({ username: "chlbri" });
// list.then((val) =>
//   console.log(
//     "list Public : ",
//     val.data.map((data) => data.full_name)
//     // .filter((val) => val.owner?.html_url === "https://github.com/chlbri")
//   )
// );

// octokit.auth().then(console.log)

async function exec() {
  await createApp({
    app_name: "test-gitpod-octokit",
    org_name: "react-if",
    github_auth_token: process.env.GITHUB_OCTOKIT_TOKEN,
    generate_auth: true,
  });

  await sleep(20 * 1000);

  await deleteApp({
    app_name: "test-gitpod-octokit",
    org_name: "react-if",
    github_auth_token: process.env.GITHUB_OCTOKIT_TOKEN,
  });
}

exec();
