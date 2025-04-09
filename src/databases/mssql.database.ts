import sql, { ConnectionPool, Request, Transaction, TYPES } from 'mssql'
import { mssqlConfig } from '../config/mssql.config'

export interface SqlParameter {
  name: string
  type: any
  value?: any
  isOutput?: boolean
}

class MSSQLHelper {
  private pool: ConnectionPool
  private poolPromise: Promise<ConnectionPool>
  private isConnected = false

  constructor() {
    this.pool = new sql.ConnectionPool(mssqlConfig)
    this.poolPromise = this.connectWithRetry()

    this.pool.on('error', (err) => {
      console.error('❌ SQL POOL ERROR:', err)
      this.isConnected = false
      this.poolPromise = this.connectWithRetry()
    })

    // Đóng kết nối khi dừng process
    process.on('SIGINT', async () => {
      await this.close()
      process.exit(0)
    })
  }

  private async connectWithRetry(attempt = 1): Promise<ConnectionPool> {
    try {
      const pool = await this.pool.connect()
      console.log('✅ Connected to MSSQL')
      this.isConnected = true
      return pool
    } catch (err) {
      this.isConnected = false
      if (attempt > (mssqlConfig.retry?.maxAttempts || 5)) {
        console.error('❌ Cannot connect to MSSQL:', err)
        throw err
      }

      const delay = Math.min(
        (mssqlConfig.retry?.initialDelay || 1000) * 2 ** (attempt - 1),
        mssqlConfig.retry?.maxDelay || 10000
      )

      console.warn(`🔁 Retry MSSQL connection in ${delay}ms (attempt ${attempt})`)
      await new Promise((res) => setTimeout(res, delay))

      return this.connectWithRetry(attempt + 1)
    }
  }

  public async getPool(): Promise<ConnectionPool> {
    if (!this.isConnected) {
      this.poolPromise = this.connectWithRetry()
    }
    return this.poolPromise
  }

  public async beginTransaction(): Promise<Transaction> {
    const pool = await this.getPool()
    const transaction = new sql.Transaction(pool)
    await transaction.begin()
    return transaction
  }

  public async executeQuery<T>(
    query: string,
    params?: { [key: string]: any },
    transaction?: Transaction
  ): Promise<T[]> {
    const pool = await this.getPool()
    const request = transaction ? new sql.Request(transaction) : new sql.Request(pool)

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        request.input(key, value)
      }
    }

    const result = await request.query<T>(query)
    return result.recordset
  }

  // public async executeStoredProcedure<T>({
  //   procedureName,
  //   parameters = [],
  //   transaction
  // }: {
  //   procedureName: string
  //   parameters?: SqlParameter[]
  //   transaction?: Transaction
  // }): Promise<{
  //   recordset: T[]
  //   outputParameters: { [key: string]: any }
  //   returnValue: number
  // }> {
  //   const pool = await this.getPool()
  //   const request = transaction ? new sql.Request(transaction) : new sql.Request(pool)

  //   const outputParams: { [key: string]: any } = {}
  //   parameters.push({ name: 'o_Result', type: TYPES.Int, isOutput: true })

  //   for (const param of parameters) {
  //     if (param.isOutput) {
  //       request.output(param.name, param.type)
  //       outputParams[param.name] = null
  //     } else {
  //       request.input(param.name, param.type, param.value)
  //     }
  //   }

  //   const result = await request.execute(procedureName)

  //   for (const name in outputParams) {
  //     outputParams[name] = result.output[name]
  //   }

  //   return {
  //     recordset: result.recordset || [],
  //     outputParameters: outputParams,
  //     returnValue: result.returnValue
  //   }
  // }
  public async executeStoredProcedure<T>({
    procedureName,
    parameters = [],
    transaction
  }: {
    procedureName: string
    parameters?: SqlParameter[]
    transaction?: Transaction
  }): Promise<{
    recordset: T[]
    outputParameters: { [key: string]: any }
    returnValue: number
  }> {
    const pool = await this.getPool()
    const request = transaction ? new sql.Request(transaction) : new sql.Request(pool)

    const outputParams: { [key: string]: any } = {}

    for (const param of parameters) {
      if (param.isOutput) {
        request.output(param.name, param.type)
        outputParams[param.name] = null
      } else {
        request.input(param.name, param.type, param.value)
      }
    }

    const result = await request.execute(procedureName)

    for (const name in outputParams) {
      outputParams[name] = result.output[name]
    }

    return {
      recordset: result.recordset || [],
      outputParameters: outputParams,
      returnValue: result.returnValue
    }
  }

  public async close(): Promise<void> {
    try {
      await this.pool.close()
      this.isConnected = false
      console.log('🔌 MSSQL connection closed.')
    } catch (err) {
      console.error('❌ Error closing MSSQL pool:', err)
    }
  }
}

export const db = new MSSQLHelper()
