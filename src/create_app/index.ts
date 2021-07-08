// import { graphql as gpl } from '@octokit/graphql';
import { Octokit } from '@octokit/rest';
import { CreateAppProps, CreateRepoProps } from './types';

// const graphql = gpl.defaults({
//   headers: {
//     authorization: `Bearer ${process.env.GITHUB_OCTOKIT_TOKEN}`,
//   },

//   request: {
//     timeout: 2000,
//   },
// });

export async function createRepo({
  name,
  github_auth_token,
  org,
  isPrivate = true,
  gitignore_template,
}: CreateRepoProps) {
  const octokit = new Octokit({ auth: github_auth_token });

  return octokit.rest.repos
    .createInOrg({
      org,
      name,
      private: isPrivate,
      gitignore_template,
    })
    .then(() => {
      console.log(
        'Creating **************************************************',
      );
      return 200;
    })
    .catch(() => {
      console.log(
        'Creating Error ********************************************',
      );
      return 400;
    });
}

export async function createApp({
  name,
  generate_auth = false,
  github_auth_token,
  org,
  isPrivate = true,
  gitignore_template = 'Node',
}: CreateAppProps) {
  // #region Config
  const back = `${name}-back`;
  const front = `${name}-front`;
  // #endregion

  Promise.all([
    createRepo({
      github_auth_token,
      org,
      name: back,
      isPrivate,
      gitignore_template,
    }),
    createRepo({
      github_auth_token,
      org,
      name: front,
      isPrivate,
      gitignore_template,
    }),
  ])
    .then(() => 200)
    .catch(() => 400);

  if (generate_auth) {
    const auth = `${name}-auth`;
    await createRepo({
      github_auth_token,
      org,
      name: auth,
      isPrivate,
      gitignore_template,
    });
  }
}
