const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  console.log('Iniciando migración...');
  
  // Conexión Local
  const localDb = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  });

  // Conexión Remota
  const remoteDb = await mysql.createConnection({
    host: '162.222.226.195',
    user: 'cohorsil_kevin',
    password: 'jnKJDSF**..hfhd45678',
    database: 'cohorsil_gastos'
  });

  console.log('Conectado a ambas bases de datos.');

  // Disable foreign key checks on remote
  await remoteDb.query('SET FOREIGN_KEY_CHECKS = 0');

  const tables = ['activities', 'partners', 'bank_accounts', 'transactions'];

  for (const table of tables) {
    console.log(`Migrando tabla: ${table}...`);
    
    // Obtener datos locales
    const [rows] = await localDb.query(`SELECT * FROM \`${table}\``);
    
    if (rows.length === 0) {
      console.log(`Tabla ${table} vacía, saltando...`);
      continue;
    }

    // Limpiar tabla remota
    await remoteDb.query(`TRUNCATE TABLE \`${table}\``);

    // Insertar datos en remoto
    const keys = Object.keys(rows[0]);
    const columns = keys.map(k => `\`${k}\``).join(', ');
    const placeholders = keys.map(() => '?').join(', ');
    
    const insertQuery = `INSERT INTO \`${table}\` (${columns}) VALUES (${placeholders})`;

    for (const row of rows) {
      const values = keys.map(k => row[k]);
      await remoteDb.execute(insertQuery, values);
    }
    
    console.log(`Migrados ${rows.length} registros en ${table}.`);
  }

  // Re-enable foreign key checks
  await remoteDb.query('SET FOREIGN_KEY_CHECKS = 1');

  await localDb.end();
  await remoteDb.end();
  
  console.log('¡Migración completada exitosamente!');
}

migrate().catch(console.error);
