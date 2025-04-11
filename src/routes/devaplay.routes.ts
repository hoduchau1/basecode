import express from 'express';
import { getAgentBalanceController,getGameProvidersController,getGameController ,postlaunchGameController,postKickPlayerController,
    getBalanceController,postTransactionController,
    getTransactionUuidController,getTransactionTimepointController,getTransactionByPeriodController,postOpenGameHistoryController,getGameRoundDetailsByIdController,getGameRoundDetailsController
} from '../controllers/devaplay.controllers';
import { asyncHandler } from '../utils/asyncHandler';

// import { authenticate } from '../middlewares/auth';
// import { userIdValidator, loginValidator } from '../schema/user.schema';

import {verifyDevaplayMiddleware} from '../middlewares/verifyDevaplay'

const router = express.Router();
router.get('/balance',  asyncHandler(getAgentBalanceController));
router.get('/gameproviders',  asyncHandler(getGameProvidersController));
router.get('/game',  asyncHandler(getGameController));
router.post('/launchgame',  asyncHandler(postlaunchGameController));
router.post('/kickplayer',  asyncHandler(postKickPlayerController));

router.get('/Balance',  asyncHandler(getBalanceController));
router.post('/Transaction',  asyncHandler(postTransactionController));

router.get('/transactionuuid',  asyncHandler(getTransactionUuidController));
router.get('/transactiontimepoint',  asyncHandler(getTransactionTimepointController));
router.get('/transactionbyperiod',  asyncHandler(getTransactionByPeriodController));
router.post('/opengamehistory',  asyncHandler(postOpenGameHistoryController));
router.get('/gamerounddetailsbyId',  asyncHandler(getGameRoundDetailsByIdController));
router.get('/gamerounddetails',  asyncHandler(getGameRoundDetailsController));

export default router;
