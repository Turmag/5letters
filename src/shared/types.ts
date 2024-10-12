export interface ILetter {
    letter?: string;
    isRight?: boolean;
    isWrong?: boolean;
    isAlmost?: boolean;
}

export interface IPrize {
    name: string;
    receivedMessage: string;
    img: string;
    wordsToOpen: number;
    isActive: boolean;
    isReceived: boolean;
    isRound?: boolean;
}

export interface IPanelItem {
    step: number;
    isDecor?: boolean;
    isGift?: boolean;
    isActive?: boolean;
    word?: string;
}

export interface ITrial {
    isActive?: boolean;
    isAnimate?: boolean;
    letters?: ILetter[];
}

export interface IFiveLettersData {
    words: string[];
    receivedPrizes: boolean[];
    isGameFinished: boolean;
}
