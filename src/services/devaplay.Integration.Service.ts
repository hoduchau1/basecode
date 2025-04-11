import {axiosClientDevaplay} from '../api/evob'
import {GetGamesParams, LaunchGameParams, KickGameParams} from '../interface/devaplay.interface'
import {API_DEVAPLAY} from '../constants/apidevaplay'

import { AppError } from '../utils/appError';

export const getAgentBalance = async () => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.AGENTBALANCE);
    return response.data;
  } catch (error) {
    console.error('[getAgentBalance Error]', error);
    throw new AppError('Lỗi khi lấy số dư đại lý từ Devaplay', 502);
  }
};

export const getGameProviders = async () => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.GAMEPROVIDERS);
    return response.data;
  } catch (error) {
    console.error('[getGameProviders Error]', error);
    throw new AppError('Lỗi khi lấy danh sách nhà cung cấp trò chơi', 502);
  }
};

export const getGame = async (params: GetGamesParams) => {
  try {
    const response = await axiosClientDevaplay.get(API_DEVAPLAY.GAMES, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('[getGame Error]', error);
    throw new AppError('Lỗi khi lấy danh sách trò chơi', 502);
  }
};

export const postlaunchGame = async (body: LaunchGameParams) => {
  try {
    const response = await axiosClientDevaplay.post(API_DEVAPLAY.LAUNCHGAME, body);
    return response.data;
  } catch (error) {
    console.error('[postlaunchgame Error]', error);
    throw new AppError('Lỗi khi khởi chạy trò chơi', 502);
  }
};

export const postKickPlayer = async (body: KickGameParams) => {
  try {
    const response = await axiosClientDevaplay.post(API_DEVAPLAY.KICKPLAY, body);
    return response.data;
  } catch (error) {
    console.error('[postKickPlay Error]', error);
    throw new AppError('Lỗi khi kick người chơi khỏi trò chơi', 502);
  }
};
