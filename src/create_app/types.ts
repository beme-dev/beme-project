import { gitIgnores } from "./../constants/number";

export type CreateRepoProps = {
  name: string;
  auth?: string;
  org: string;
  isPrivate?: boolean;
  gitignore_template: typeof gitIgnores[number];
};

export type CreateAppProps = CreateRepoProps & {
  generate_auth?: boolean;
};

export type CreateRepoByTemplateProps = Omit<
  CreateRepoProps,
  "gitignore_template"
> & {
  template_owner?: string;
  template_repo: string;
  include_all_branches?: boolean;
};
