import { Octokit } from '@octokit/rest';
import { CreateAppProps, CreateRepoProps } from './types';

// const octokit = new Octokit({ auth: process.env.GITHUB_OCTOKIT_TOKEN });

export async function createRepo({
  repo_name,
  github_auth_token,
  org_name,
}: CreateRepoProps) {
  // if(!github_auth_token) return ;
  const octokit = new Octokit({ auth: github_auth_token });

  return octokit.rest.repos
    .createInOrg({
      org: org_name,
      name: `${repo_name}`,
    })
    .then((val) => {
      const res = val.data;
      console.log('**************************');
      console.log('id :', res.id);
      console.log('Full Name :', res.full_name);

      console.log('url :', res.url);
      console.log('git_url :', res.git_url);
      console.log('html_url :', res.html_url);

      console.log('**************************');
      console.log('**************************');

      console.log('status :', val.status);
      console.log('server :', val.headers.server);
    })
    .catch((er) => {
      const res = er.response;
      console.log('Request status :', res.status);
      console.log('Global Messages :', res.data.message);
      console.log(
        'errors :',
        res.data.errors.map(({ code, message }: any) => ({
          code,
          message,
        })),
      );
      console.log('Error docs :', res.data.documentation_url);
    });
}

export async function createApp({
  app_name,
  generate_auth = false,
  github_auth_token,
  org_name,
}: CreateAppProps) {
  // #region Config
  const back = `${app_name}-back`;
  const front = `${app_name}-front`;
  // #endregion

  await createRepo({
    github_auth_token,
    org_name,
    repo_name: back,
  });
  await createRepo({
    github_auth_token,
    org_name,
    repo_name: front,
  });

  if (generate_auth) {
    const auth = `${app_name}-auth`;
    await createRepo({
      github_auth_token,
      org_name,
      repo_name: auth,
    });
  }
}
