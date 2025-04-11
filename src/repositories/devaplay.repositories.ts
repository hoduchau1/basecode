import { db, SqlParameter } from '../databases/mssql.database'
import { TYPES } from 'mssql'
import { DEVAPLAYER_PROCEDURE } from '../constants/devaplayer'
import {GetBalanceParams,TransactionParams} from '../interface/devaplay.interface'

export class DEVAPLAYERRepository {
   
    async getBalancerData({ playerCode }: { playerCode: string }) {
        const parameters: SqlParameter[] = [
            { name: 'i_playerCode', type: TYPES.NVarChar(100), value: playerCode }
        ]

        return db.executeStoredProcedure<any>({
            procedureName: DEVAPLAYER_PROCEDURE.BALANCE_USER,
            parameters
        })
    }

    async processTransaction(payload: TransactionParams) {
        const parameters: SqlParameter[] = [
          { name: 'i_uuid', type: TYPES.NVarChar(100), value: payload.uuid },
          { name: 'i_playerCode', type: TYPES.NVarChar(100), value: payload.playerCode },
          { name: 'i_providerCode', type: TYPES.NVarChar(50), value: payload.providerCode },
          { name: 'i_gameCode', type: TYPES.NVarChar(255), value: payload.gameCode },
          { name: 'i_gameName', type: TYPES.NVarChar(255), value: payload.gameName },
          { name: 'i_gameName_en', type: TYPES.NVarChar(255), value: payload.gameName_en },
          { name: 'i_gameCategory', type: TYPES.NVarChar(50), value: payload.gameCategory },
          { name: 'i_roundId', type: TYPES.NVarChar(100), value: payload.roundId },
          { name: 'i_type', type: TYPES.NVarChar(50), value: payload.type },
          { name: 'i_amount', type: TYPES.Decimal(18, 2), value: payload.amount },
          { name: 'i_referenceUuid', type: TYPES.NVarChar(100), value: payload.referenceUuid },
          { name: 'i_roundStarted', type: TYPES.Bit, value: payload.roundStarted },
          { name: 'i_roundFinished', type: TYPES.Bit, value: payload.roundFinished },
          { name: 'i_details', type: TYPES.NVarChar(255), value: payload.details }
        ];
    
        return db.executeStoredProcedure<any>({
          procedureName: DEVAPLAYER_PROCEDURE.TRANSACTION,
          parameters
        });
      }
 
}
