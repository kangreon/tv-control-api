const config = {
  client: 'postgresql',
  connection: {
    database: 'tv-control',
    user: 'user',
    password: 'g45h4htg43wgw3',
    port: 11231,
  },
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations'
  }
}

module.exports = {
  development: config,
  staging: config,
  production: config,
};
