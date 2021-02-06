export var defaultEnv = {
    TODO_REPOSITORY: 'http://localhost:4000/graphql',
};
export var env = {
    endpoint: process.env.TODO_REPOSITORY || defaultEnv.TODO_REPOSITORY,
};
