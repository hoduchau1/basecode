export interface LaunchGameParams {
    playerCode: string
    providerCode: string
    gameCode?: string
    countryCode: string
    localeCode: string
    isMobile?: boolean
    isIframe?: boolean
    nickname?: string
    lobbyUrl?: string
    cashierUrl?: string
    closeUrl?: string
    betLimitMin?: number
    betLimitMax?: number
    winLimitMax?: number
    playMode?: 'REAL' | 'DEMO'
  }
  

export interface KickGameParams {
    playerCode: string
    providerCode: string
}
  

export interface GetBalanceParams {
  playerCode: string
}

export interface GetGamesParams {
  providerCode: string
  category?: 'Slot' | 'Live Casino' | 'Other'
}


export interface TransactionParams {
  uuid: string
  playerCode: string
  providerCode: string
  gameCode?: string
  gameName?: string
  gameName_en?: string
  gameCategory?: 'Slot' | 'Live Casino' | 'Other'
  roundId?: string
  type: 'Bet' | 'Win' | 'CancelBet' | 'CancelWin' | 'Other'
  amount: number
  referenceUuid?: string | null
  roundStarted: boolean
  roundFinished: boolean
  details?: string
}


export interface GetTransactionUuidParams {
  uuid: string
}

export interface GetTransactionTimepointParams {
  timepoint: number
}


export interface GetTransactionByPeriodParams {
  startTimepoint: number,
  endTimepoint: number

}


export interface PostOpenGameHistoryParams {
  Uuid: string,
  providerCode: string,
  roundId: string,
  countryCode: string,
  localeCode: string
}

export interface GetGameRoundDetailsByIdParams {
  providerCode: string,
  roundId?: string
}

export interface GetGameRoundDetailsParams {
  timepoint: number
}
