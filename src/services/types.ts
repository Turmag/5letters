export interface Letter {
    letter?: string;
    isRight?: boolean;
    isWrong?: boolean;
    isAlmost?: boolean;
}

export interface Prize {
    name: string;
    receivedMessage: string;
    img: string;
    wordsToOpen: number;
    isActive: boolean;
    isReceived: boolean;
    isRound?: boolean;
}

export interface PanelItem {
    step: number;
    isDecor?: boolean;
    isGift?: boolean;
    isActive?: boolean;
    word?: string;
}

export interface Trial {
    isActive?: boolean;
    isAnimate?: boolean;
    letters?: Letter[];
}

export interface FiveLettersData {
    words: string[];
    receivedPrizes: boolean[];
    isGameFinished: boolean;
}
