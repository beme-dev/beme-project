// import { graphql as gpl } from '@octokit/graphql';
import { Octokit } from "@octokit/rest";
import {
  CreateAppProps,
  CreateRepoByTemplateProps,
  CreateRepoProps,
} from "./types";

export async function createRepo({
  name,
  auth,
  org,
  isPrivate = true,
  gitignore_template,
}: CreateRepoProps) {
  const octokit = new Octokit({ auth });

  await octokit.request(
    "POST /repos/{template_owner}/{template_repo}/generate",
    {
      template_owner: "template_owner",
      template_repo: "template_repo",
      name: "name",
      private: true,
      mediaType: {
        previews: ["baptiste"],
      },
    }
  );

  return octokit.rest.repos
    .createInOrg({
      org,
      name,
      private: isPrivate,
      gitignore_template,
    })
    .then(() => {
      console.log(
        "Creating **************************************************"
      );
      return 200;
    })
    .catch(() => {
      console.log(
        "Creating Error ********************************************"
      );
      return 400;
    });
}

export async function createRepoByTemplate({
  name,
  auth,
  org,
  isPrivate = true,
  template_owner = org,
  template_repo,
  include_all_branches,
}: CreateRepoByTemplateProps) {
  const octokit = new Octokit({ auth });

  return octokit
    .request("POST /repos/{template_owner}/{template_repo}/generate", {
      template_owner: template_owner,
      template_repo: template_repo,
      owner: org,
      name,
      private: isPrivate,
      include_all_branches,
      mediaType: {
        previews: ["baptiste"],
      },
    })
    .then(() => {
      console.log(
        "Creating **************************************************"
      );
      return 200;
    })
    .catch(() => {
      console.log(
        "Creating Error ********************************************"
      );
      return 400;
    });
}

export async function createApp({
  name,
  generate_auth = false,
  auth,
  org,
  isPrivate = true,
  gitignore_template = "Node",
}: CreateAppProps) {
  // #region Config
  const back = `${name}-back`;
  const front = `${name}-front`;
  // #endregion

  Promise.all([
    createRepo({
      auth,
      org,
      name: back,
      isPrivate,
      gitignore_template,
    }),
    createRepo({
      auth,
      org,
      name: front,
      isPrivate,
      gitignore_template,
    }),
  ])
    .then(() => 200)
    .catch(() => 400);

  if (generate_auth) {
    const _auth = `${name}-auth`;
    await createRepo({
      auth,
      org,
      name: _auth,
      isPrivate,
      gitignore_template,
    });
  }
}
