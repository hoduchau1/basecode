import {axiosClientDevaplay} from '../api/evob'
import {GetBalanceParams,TransactionParams} from '../interface/devaplay.interface'
import {API_DEVAPLAY} from '../constants/apidevaplay'
import {DEVAPLAYERRepository} from '../repositories/devaplay.repositories'
import { AppError } from '../utils/appError';
import HTTP_STATUS from '../constants/httpStatus'


// NOTE!!!!!
// data mà em trả về hiện tại ko đúng cấu trúc với bên devaplay yêu cầu.

// data của em trả
// {
//   "code": 0,
//   "message": "GET số dư người chơi thành công",
//   "data": {
//     "balance": 498000.0
//   }
// }

// data mà devaplay nhận
// {
//   "status": "OK",
//   "result": {
//     "balance": 498000.0
//   }
// }

export const getBalance = async (params: GetBalanceParams) => {

    const result = await new DEVAPLAYERRepository().getBalancerData(params)
    if (!result) {
        throw new AppError('Player not found', HTTP_STATUS.NOT_FOUND); 
    }
    return result.recordset

};


export const PostprocessTransaction= async(payload: TransactionParams) => {
  try {
    const result = await new DEVAPLAYERRepository().processTransaction(payload)
    const { Status, Balance } = result.recordset[0] ?? {}

    switch (Status) {
      case 'PlayerNotFound':
        throw new AppError('Player not found', HTTP_STATUS.NOT_FOUND)

      case 'AlreadyProcessed':
        throw new AppError('Transaction already processed', HTTP_STATUS.FORBIDDEN, true,{ balance: Balance })

      case 'InsufficientPlayerBalance':
        throw new AppError('Insufficient balance', HTTP_STATUS.PAYMENT_REQUIRED, true,{ balance: Balance })

      case 'ReferenceNotFound':
        throw new AppError('Reference transaction not found', HTTP_STATUS.NOT_FOUND, true,{ balance: Balance })


      case 'OK':
        return {balance: Balance }
      default:
        throw new AppError('Lỗi xử lý transaction', 500)

    }
  } catch (error) {
    throw new AppError('Lỗi xử lý transaction', 500)
  }
}