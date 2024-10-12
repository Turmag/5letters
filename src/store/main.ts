import { defineStore } from 'pinia';
import { getRandom } from '@/shared/helpers';
import type {
    IPanelItem, ITrial, ILetter, 
} from '@/shared/types';
import { useLocalStorage } from '@vueuse/core';
import { modalStore } from '@/store/modal';

export const mainStore = defineStore('main', {
    state: () => {
        return {
            currentWord: [] as string[],
            searchWord: '',
            searchWords: [] as string[],
            guessedWords: [] as string[],
            trials: [
                { isActive: true },
                {},
                {},
                {},
                {},
                {},
            ] as ITrial[],
            trialIndex: 0,
            winsCount: 0,
            isWin: false,
            isLost: false,
            isGameFinished: false,
            panelItems: [
                {
                    step: 1,
                    isGift: true,
                    isDecor: true,
                },
                {
                    step: 2,
                    isDecor: true,
                },
                {
                    step: 3,
                    isDecor: true,
                },
                {
                    step: 4,
                    isDecor: true,
                },
                {
                    step: 5,
                    isGift: true,
                },
            ] as IPanelItem[],
        };
    },
    actions: {
        resetWord() {
            this.currentWord = [];
        },

        resetTrials() {
            this.trials = [
                { isActive: true },
                {},
                {},
                {},
                {},
                {},
            ];
            this.trialIndex = 0;
        },

        resetLostWin() {
            this.isLost = false;
            this.isWin = false;
        },

        setLetterInWord({ index, letter }: {index: number; letter: string}) {
            this.currentWord[index] = letter;
        },

        setSearchWords(words: string[]) {
            this.searchWords = words;
        },

        setSearchWord() {
            const randomIndex = getRandom(0, this.searchWords.length - 1);
            this.searchWord = this.searchWords[randomIndex];
            this.searchWords.splice(randomIndex, 1);
        },

        setGuessedWords(words: string[]) {
            this.guessedWords = words;
        },

        setWinsCount(winsCount: number) {
            this.winsCount = winsCount;
        },

        setPanelItems({ winsCount, words }: {winsCount: number; words: string[]}) {
            const startStep = winsCount === 0 ? 1 : Math.floor((winsCount - 1) / 5) * 5 + 1;
            this.panelItems = [
                {
                    isGift: winsCount < 6,
                    step: startStep,
                    isDecor: true,
                    isActive: winsCount % 5 > 0 || (winsCount !== 0 && winsCount % 5 === 0),
                    word: words[startStep - 1]
                        ? words[startStep - 1][0] + words[startStep - 1].slice(1).toLowerCase()
                        : '',
                },
                {
                    step: startStep + 1,
                    isDecor: true,
                    isActive: winsCount % 5 > 1 || (winsCount !== 0 && winsCount % 5 === 0),
                    word: words[startStep]
                        ? words[startStep][0] + words[startStep].slice(1).toLowerCase()
                        : '',
                },
                {
                    step: startStep + 2,
                    isDecor: true,
                    isActive: winsCount % 5 > 2 || (winsCount !== 0 && winsCount % 5 === 0),
                    word: words[startStep + 1]
                        ? words[startStep + 1][0] + words[startStep + 1].slice(1).toLowerCase()
                        : '',
                },
                {
                    step: startStep + 3,
                    isDecor: true,
                    isActive: winsCount % 5 > 3 || (winsCount !== 0 && winsCount % 5 === 0),
                    word: words[startStep + 2]
                        ? words[startStep + 2][0] + words[startStep + 2].slice(1).toLowerCase()
                        : '',
                },
                {
                    step: startStep + 4,
                    isGift: true,
                    isActive: winsCount % 5 > 4 || (winsCount !== 0 && winsCount % 5 === 0),
                    word: words[startStep + 3]
                        ? words[startStep + 3][0] + words[startStep + 3].slice(1).toLowerCase()
                        : '',
                },
            ];
        },

        setIsGameFinished(isGameFinished: boolean) {
            this.isGameFinished = isGameFinished;
        },
        
        excludeSearchWords(words: string[]) {
            for (let i = 0, l = this.searchWords.length; i < l; i++) {
                words.forEach(el => {
                    if (this.searchWords.includes(el)) {
                        this.searchWords.splice(this.searchWords.indexOf(el), 1);
                        i--;
                    }
                });
            }
        },

        checkTrial() {
            const letters = this.trials[this.trialIndex].letters = [] as ILetter[];
            const rightIndexes = [];
            const compareWord: string[] = [];
            this.currentWord.forEach((el, i) => {
                if (this.currentWord[i] === this.searchWord[i]) {
                    rightIndexes.push(i);
                } else {
                    compareWord.push(this.searchWord[i]);
                }
            });

            this.currentWord.forEach((el, i) => {
                if (this.currentWord[i] === this.searchWord[i]) {
                    letters.push({
                        letter: el,
                        isRight: true,
                    });
                } else if (compareWord.includes(el)) {
                    letters.push({
                        letter: el,
                        isAlmost: true,
                    });
                } else {
                    letters.push({
                        letter: el,
                        isWrong: true,
                    });
                }
            });

            if (rightIndexes.length === this.searchWord.length) {
                this.isWin = true;

                this.winsCount += 1;
                if (
                    (this.winsCount - 1) % 5 === 0 &&
                    this.winsCount > 5 &&
                    !this.isGameFinished
                ) {
                    this.panelItems = [
                        {
                            step: this.winsCount,
                            isDecor: true,
                        },
                        {
                            step: this.winsCount + 1,
                            isDecor: true,
                        },
                        {
                            step: this.winsCount + 2,
                            isDecor: true,
                        },
                        {
                            step: this.winsCount + 3,
                            isDecor: true,
                        },
                        {
                            step: this.winsCount + 4,
                            isGift: true,
                        },
                    ];
                }

                this.guessedWords.push(this.searchWord);

                this.panelItems.forEach(el => {
                    if (el.step === this.winsCount) {
                        el.isActive = true;
                        el.word = this.searchWord[0] + this.searchWord.slice(1).toLowerCase();
                    }
                });

                this.trials[this.trialIndex].isAnimate = true;
            }

            if (
                this.trialIndex === this.trials.length - 1 &&
                rightIndexes.length !== this.searchWord.length
            ) {
                this.isLost = true;
            }

            if (
                rightIndexes.length !== this.searchWord.length &&
                this.trialIndex < this.trials.length - 1
            ) {
                this.trials[this.trialIndex].isActive = false;
                this.trials[this.trialIndex].letters = letters;
                this.trialIndex += 1;
                this.trials[this.trialIndex].isActive = true;
                this.currentWord = [];
            }
        },

        checkTrialAction() {
            const storeModal = modalStore();
            const winsCount = this.winsCount;
            this.checkTrial();
            if (this.winsCount > winsCount) {
                storeModal.increasePrizeWords(1);
                if (!this.isGameFinished) {
                    const isGameFinished = storeModal.getIsPrizesUnlocked();
                    this.setIsGameFinished(isGameFinished);
                    if (isGameFinished) {
                        setTimeout(() => storeModal.setIsShowBonus(isGameFinished), 1600);
                    }
                }
            }
        },

        saveGame() {
            const storeModal = modalStore();
            const receivedPrizes = storeModal.getReveivedPrizes();
            const isGameFinished = this.isGameFinished;
            const data = {
                words: this.guessedWords,
                receivedPrizes,
                isGameFinished,
            };
            const fiveLettersData = useLocalStorage('5lettersData', JSON.stringify(data));
            fiveLettersData.value = JSON.stringify(data);
        },

        setNewWord() {
            this.resetWord();
            this.resetLostWin();
            this.resetTrials();
            this.setSearchWord();
        },

        setWordsEnded() {
            const storeModal = modalStore();
            storeModal.setIsShowWordsEnded(true);
            this.trials.forEach(el => (el.isActive = false));
        },
    },
});
