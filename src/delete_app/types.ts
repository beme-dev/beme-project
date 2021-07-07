export type CreateAppProps = {
  app_name: string;
  generate_auth?: boolean;
  github_auth_token?: string;
  org_name:string
};

export type CreateRepoProps = {
  repo_name: string;
  github_auth_token?: string;
  org_name:string
};
