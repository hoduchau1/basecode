import {axiosClientDevaplay} from '../api/evob'
import {GetBalanceParams,TransactionParams} from '../interface/devaplay.interface'
import {API_DEVAPLAY} from '../constants/apidevaplay'
import { AppError } from '../utils/appError';

export const getBalance = async (params: GetBalanceParams) => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.BALANCE, { params });
    return response.data;
  } catch (error) {
    console.error('[getBalance Error]', error);
    throw new AppError('Lỗi khi lấy số dư từ Devaplay', 502);
  }
};

export const postTransaction = async (body: TransactionParams) => {
  try {
    const response = await axiosClientDevaplay.post(API_DEVAPLAY.TRANSACTION, body);
    return response.data;
  } catch (error) {
    console.error('[postTransaction Error]', error);
    throw new AppError('Lỗi khi gửi transaction đến Devaplay', 502);
  }
};