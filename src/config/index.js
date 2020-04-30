require('env2')('./.env');
const { env } = process;

export default {
  PORT: env.PORT,
  HOST: env.HOST,
};
