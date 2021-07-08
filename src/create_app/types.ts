import { gitIgnores } from './../constants/number';

export type CreateAppProps = {
  name: string;
  generate_auth?: boolean;
  github_auth_token?: string;
  org: string;
  isPrivate?: boolean;
  gitignore_template?: typeof gitIgnores[number];
};

export type CreateRepoProps = {
  name: string;
  github_auth_token?: string;
  org: string;
  isPrivate?: boolean;
  gitignore_template: typeof gitIgnores[number];
};
