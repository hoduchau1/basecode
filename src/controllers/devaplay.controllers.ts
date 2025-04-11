import { Request, Response, NextFunction } from 'express';
import { SuccessWithStatus } from '../models/responses/Success';
import {BadRequestError} from '../utils/errors'
import * as devaplayIntegrationService from '../services/devaplay.Integration.Service'
import * as devaplayseamlessService from '../services/devaplay.seamless.Service'
import * as devaplaydatafeed from '../services/devaplay.datafeed.Service'

export const getAgentBalanceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await devaplayIntegrationService.getAgentBalance()

    return new SuccessWithStatus({
      message: 'GET Balance successful',
      data: data
  }).send(res)
  
  } catch (err) {
    next(err);
  }
}
export const getGameProvidersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await devaplayIntegrationService.getGameProviders()

    return new SuccessWithStatus({
      message: 'GET Game Providers successful',
      data: data
  }).send(res)

  } catch (err) {
    next(err);  }
}

export const getGameController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providerCode = req.query.providerCode?.toString()
    const category = req.query.category?.toString() as 'Slot' | 'Live Casino' | 'Other' | undefined

    if (!providerCode) {
      return next(new BadRequestError('providerCode là bắt buộc'));
    }

    const data = await devaplayIntegrationService.getGame({ providerCode, category })

    return new SuccessWithStatus({
      message: 'GET Game successful',
      data: data
  }).send(res)

  } catch (err) {
    next(err);  }
}


// hàm này gặp lỗi user kết nối được nhưng ko có tiền chơi game nên game ko launch
// {
//   "message": "Lỗi khi launch game",
//   "err": {
//       "status": "InsufficientPlayerBalance",
//       "message": ""
//   }
// }
export const postlaunchGameController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await devaplayIntegrationService.postlaunchGame(req.body)

    return new SuccessWithStatus({
      message: 'GET Launch Game successful',
      data: data
  }).send(res)

  } catch (err) {
    next(err);  }
}

// em ko rõ nhưng hình player ko launche game là không kick được , tên user giống với user của agent mới hiện lỗi này còn tên không đúng
// nó hiện lỗi PlayerNotFound
// 
//   "err": {
//       "status": "Unknownerr",
//       "message": ""
// }
export const postKickPlayerController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await devaplayIntegrationService.postKickPlayer(req.body)

    return new SuccessWithStatus({
      message: 'POST Kick Player successful',
      data: data
  }).send(res)

  } catch (err) {
    next(err);  }
}



export const getBalanceController = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const playerCode = req.query.playerCode?.toString()

    if (!playerCode) {
      return next(new BadRequestError('Thiếu playerCodec'));
    }

    const data = await devaplayseamlessService.getBalance({playerCode})

    return new SuccessWithStatus({
      message: 'GET số dư người chơi thành công',
      data: data,
    }).send(res)
  } catch (err) {
    next(err);  }
}


export const postTransactionController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await devaplayseamlessService.postTransaction(req.body)

    return new SuccessWithStatus({
      message: 'POST Transaction successful',
      data: data
  }).send(res)

  } catch (err) {
    next(err);  }
}


export const getTransactionUuidController = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const uuid = req.query.uuid?.toString()
    if (!uuid) {
      return next(new BadRequestError('Thiếu uuid'));
    }
    const data = await devaplaydatafeed.getTransactionUuid({uuid})

    return new SuccessWithStatus({
      message: 'GET thông tin TransactionUuid thành công',
      data: data,
    }).send(res)
  } catch (err) {
    next(err);  }
}

export const getTransactionTimepointController = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const timepoint = Number(req.query.timepoint);

    if (isNaN(timepoint)) {
      return next(new BadRequestError('Thiếu hoặc sai định dạng timepoint'));
    }

    const data = await devaplaydatafeed.getTransactionTimepoint({timepoint})

    return new SuccessWithStatus({
      message: 'GET thông tin TransactionTimepoint thành công',
      data: data,
    }).send(res)
  } catch (err) {
    next(err);  }
}

export const getTransactionByPeriodController = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const startTimepoint = Number(req.query.startTimepoint);
    const endTimepoint = Number(req.query.startTimepoint);

    if (isNaN(startTimepoint)) {
    return next(new BadRequestError('Thiếu hoặc sai định dạng startTimepoint'));
    }

    const data = await devaplaydatafeed.getTransactionByPeriod({startTimepoint,endTimepoint})

    return new SuccessWithStatus({
      message: 'GET thông tin TransactionByPeriod thành công',
      data: data,
    }).send(res)
  } catch (err) {
    next(err);  }
}

export const postOpenGameHistoryController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await devaplaydatafeed.postOpenGameHistoryParams(req.body)

    return new SuccessWithStatus({
      message: 'POST OpenGameHistory successful',
      data: data
  }).send(res)

  } catch (err) {
    next(err);  }
}


export const getGameRoundDetailsByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const providerCode = req.query.providerCode?.toString()
    const roundId = req.query.roundId?.toString() 

    if (!providerCode) {
      return next(new BadRequestError('providerCode là bắt buộc'));
    }

    const data = await devaplaydatafeed.getGameRoundDetailsById({providerCode,roundId})

    return new SuccessWithStatus({
      message: 'GET thông tin GameRoundDetailsById thành công',
      data: data,
    }).send(res)
  } catch (err) {
    next(err);  }
}


export const getGameRoundDetailsController = async (req: Request, res: Response, next: NextFunction) => {
  try {

    const timepoint = Number(req.query.timepoint);

    if (isNaN(timepoint)) {
    return next(new BadRequestError('Thiếu hoặc sai định dạng timepoint'));
    }

    const data = await devaplaydatafeed.getGameRoundDetails({timepoint})

    return new SuccessWithStatus({
      message: 'GET thông tin GameRoundDetails thành công',
      data: data,
    }).send(res)
  } catch (err) {
    next(err);  }
}
