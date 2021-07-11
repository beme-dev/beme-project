import { Octokit } from "@octokit/rest";
import { POINT_CONVERSION_COMPRESSED } from "constants";
import { DeleteAppProps, DeleteRepoProps } from "./types";

export async function deleteRepo({ name, auth, org }: DeleteRepoProps) {
  const octokit = new Octokit({ auth });

  return octokit.rest.repos
    .delete({
      owner: org,
      repo: name,
    })
    .then(() => {
      console.log(
        "Deleting **************************************************"
      );
      return 200;
    })
    .catch(() => {
      console.log(
        "Deleting Error ********************************************"
      );
      return 400;
    });
}

export async function deleteApp({ name, auth, org }: DeleteAppProps) {
  // #region Config

  const octokit = new Octokit({ auth });
  const repo_full_names = await octokit.rest.repos
    .listForOrg({ org: org, request: { timeout: 2000 } })
    .then((json) => json.data)
    .then((data) => data.map((repo) => repo.name))
    .then((data) => data.filter((val) => val.startsWith(name)));
  // #endregion
  if (repo_full_names.length < 1) {
    return Promise.reject().catch(() => 400);
  }

  return Promise.all(
    repo_full_names.map((name) =>
      deleteRepo({
        auth,
        org,
        name,
      })
    )
  );
}
