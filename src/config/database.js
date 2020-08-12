module.exports = {
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'docker',
  database: 'gobarber',
  define: {
    timestamps: true, // permite o save_at e upgrade_at
    underscored: true, // permitir o padrão undescore
    underscoredALL: true,
  },
};
