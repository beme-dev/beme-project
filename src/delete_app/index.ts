import { Octokit } from "@octokit/rest";
import { CreateAppProps, CreateRepoProps } from "./types";

// const octokit = new Octokit({ auth: process.env.GITHUB_OCTOKIT_TOKEN });

export async function deleteRepo({
  repo_name,
  github_auth_token,
  org_name,
}: CreateRepoProps) {
  // if(!github_auth_token) return ;
  const octokit = new Octokit({ auth: github_auth_token });

  return octokit.rest.repos
    .delete({
      owner: org_name,
      repo: repo_name,
    })

    .then((val) => {
      const res = val.data;
      console.log("**************************");

      console.log("status :", val.status);
      console.log("server :", val.headers.server);
    })
    .catch((er) => {
      const res = er.response;
      console.log("Request status :", res.status);
      console.log("Global Messages :", res.data.message);
      console.log("Error docs :", res.data.documentation_url);
    });
}

export async function deleteApp({
  app_name,
  github_auth_token,
  org_name,
}: CreateAppProps) {
  // #region Config

  const octokit = new Octokit({ auth: github_auth_token });
  const repo_full_names = await octokit.rest.repos
    .listForOrg({ org: org_name, request: { timeout: 2000 } })
    .then((json) => json.data)
    .then((data) => data.map((repo) => repo.name))
    .then((data) => data.filter((val) => val.includes(app_name)));
  // #endregion

  repo_full_names.forEach((repo_name) =>
    deleteRepo({
      github_auth_token,
      org_name,
      repo_name,
    })
  );
}
