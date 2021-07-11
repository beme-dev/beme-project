import { graphql as gpl } from "@octokit/graphql";

const graphql = gpl.defaults({
  headers: {
    authorization: `Bearer ${process.env.GITHUB_OCTOKIT_TOKEN}`,
  },

  request: {
    timeout: 2000,
  },
});

// prettier-ignore
graphql(
  `#graphql
    mutation CreateRepository($input: CreateRepositoryInput!) {
      createRepository(input: $input) {
        repository {
          name
        }
      }
    }
  `,
  {
    input: {
      name: 'test3334',
      ownerId: process.env.REACT_IF_ID,
      visibility: 'PRIVATE',
    },
  },
)
  .then(console.log)
  .catch(console.log);

graphql(
  `
    #graphql
    mutation CreateRepository($input: CreateRepositoryInput!) {
      createRepository(input: $input) {
        repository {
          name
        }
      }
    }
  `,
  {
    input: {
      name: "test34",
      ownerId: process.env.REACT_IF_ID,
      visibility: "PRIVATE",
    },
  }
)
  .then(console.log)
  .catch(console.log);
