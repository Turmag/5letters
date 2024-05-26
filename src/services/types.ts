export interface Letter {
    letter: string;
    isRight?: boolean;
    isWrong?: boolean;
    isAlmost?: boolean;
}

export interface Prize {
    name: string;
    isActive: boolean;
    isReceived: boolean;
    receivedMessage: string;
    img: string;
    wordsToOpen: number;
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
