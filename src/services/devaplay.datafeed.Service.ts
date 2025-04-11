import {axiosClientDevaplay} from '../api/evob'
import {KickGameParams,GetTransactionUuidParams,GetTransactionTimepointParams,GetTransactionByPeriodParams,PostOpenGameHistoryParams,GetGameRoundDetailsByIdParams, GetGameRoundDetailsParams} from '../interface/devaplay.interface'
import {API_DEVAPLAY} from '../constants/apidevaplay'
import { AppError } from '../utils/appError';


export const getTransactionUuid = async (params: GetTransactionUuidParams) => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.TRANSACTIONUUID, { params });
    return response.data;
  } catch (error) {
    console.error('[getTransactionUuid Error]', error);
    throw new AppError('Lỗi khi lấy transaction theo UUID từ Devaplay', 502);
  }
};

export const getTransactionTimepoint = async (params: GetTransactionTimepointParams) => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.TRANSACTIONTIMEPOINT, { params });
    return response.data;
  } catch (error) {
    console.error('[getTransactionTimepoint Error]', error);
    throw new AppError('Lỗi khi lấy transaction theo Timepoint từ Devaplay', 502);
  }
};

export const getTransactionByPeriod = async (params: GetTransactionByPeriodParams) => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.TRANSACTIONSBYPERIOD, { params });
    return response.data;
  } catch (error) {
    console.error('[getTransactionByPeriod Error]', error);
    throw new AppError('Lỗi khi lấy giao dịch theo khoảng thời gian', 502);
  }
};

export const postOpenGameHistoryParams = async (body: PostOpenGameHistoryParams) => {
  try {
    const response = await axiosClientDevaplay.post(API_DEVAPLAY.OPENGAMEHISTORY, body);
    return response.data;
  } catch (error) {
    console.error('[postOpenGameHistoryParams Error]', error);
    throw new AppError('Lỗi khi mở lịch sử trò chơi', 502);
  }
};

export const getGameRoundDetailsById = async (params: GetGameRoundDetailsByIdParams) => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.GAMEROUNĐETAILSBYID, { params });
    return response.data;
  } catch (error) {
    console.error('[getGameRoundDetailsById Error]', error);
    throw new AppError('Lỗi khi lấy chi tiết vòng chơi theo ID', 502);
  }
};

export const getGameRoundDetails = async (params: GetGameRoundDetailsParams) => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.GAMEROUNĐETAILS, { params });
    return response.data;
  } catch (error) {
    console.error('[getGameRoundDetails Error]', error);
    throw new AppError('Lỗi khi lấy chi tiết vòng chơi', 502);
  }
};