import { Octokit } from '@octokit/rest';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import { DeleteAppProps, DeleteRepoProps } from './types';

export async function deleteRepo({
  repo_name,
  github_auth_token,
  org_name,
}: DeleteRepoProps) {
  const octokit = new Octokit({ auth: github_auth_token });

  return octokit.rest.repos
    .delete({
      owner: org_name,
      repo: repo_name,
    })
    .then(() => {
      console.log(
        'Deleting **************************************************',
      );
      return 200;
    })
    .catch(() => {
      console.log(
        'Deleting Error ********************************************',
      );
      return 400;
    });
}

export async function deleteApp({
  app_name,
  github_auth_token,
  org_name,
}: DeleteAppProps) {
  // #region Config

  const octokit = new Octokit({ auth: github_auth_token });
  const repo_full_names = await octokit.rest.repos
    .listForOrg({ org: org_name, request: { timeout: 2000 } })
    .then((json) => json.data)
    .then((data) => data.map((repo) => repo.name))
    .then((data) =>
      data.filter((val) => val.startsWith(app_name)),
    );
  // #endregion
  if (repo_full_names.length < 1) {
    return Promise.reject().catch(() => 400);
  }

  return Promise.all(
    repo_full_names.map((repo_name) =>
      deleteRepo({
        github_auth_token,
        org_name,
        repo_name,
      }),
    ),
  );
}
