import mysql from "mysql2/promise"

let pool: mysql.Pool | null = null

export function getPool(): mysql.Pool {
  if (!pool) {
    pool = mysql.createPool({
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT) || 3306,
      database: process.env.MYSQL_DATABASE,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      waitForConnections: true,
      connectionLimit: 5,
      queueLimit: 0,
      connectTimeout: 10000,
      enableKeepAlive: true,
      keepAliveInitialDelay: 10000,
    })
  }
  return pool
}

export async function query<T = unknown>(
  sql: string,
  params?: unknown[]
): Promise<T> {
  const db = getPool()
  const [rows] = await db.execute(sql, params)
  return rows as T
}
