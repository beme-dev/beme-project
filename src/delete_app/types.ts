export type DeleteAppProps = {
  app_name: string;
  github_auth_token?: string;
  org_name: string;
};

export type DeleteRepoProps = {
  repo_name: string;
  github_auth_token?: string;
  org_name: string;
};
