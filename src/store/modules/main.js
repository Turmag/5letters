import { getRandom, setStorage } from './../../helpers/functions';
export default {
    state: {
        currentWord: [],
        searchWord: '',
        searchWords: [],
        guessedWords: [],
        trials: [
            {
                isActive: true,
            },
            {},
            {},
            {},
            {},
            {},
        ],
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
        ],
    },
    actions: {
        async checkTrialAction({ state, commit, dispatch }) {
            const winsCount = state.winsCount;
            commit('checkTrial');
            if (state.winsCount > winsCount) {
                dispatch('increasePrizeWords', 1, { root: true });
                if (!state.isGameFinished) {
                    const isGameFinished = await dispatch('getIsPrizesUnlocked', null, {
                        root: true,
                    });
                    commit('setIsGameFinished', isGameFinished);
                    if (isGameFinished) {
                        setTimeout(() => dispatch('setIsShowBonus', true, { root: true }), 1600);
                    }
                }
            }
        },
        async saveGame({ state, dispatch }) {
            const receivedPrizes = await dispatch('getReveivedPrizes', null, { root: true });
            const isGameFinished = state.isGameFinished;
            setStorage({
                data: {
                    words: state.guessedWords,
                    receivedPrizes,
                    isGameFinished,
                },
                key: '5lettersData',
            });
        },
        setNewWord({ commit }) {
            commit('resetWord');
            commit('resetLostWin');
            commit('resetTrials');
            commit('setSearchWord');
        },
        async setWordsEnded({ commit, dispatch }) {
            await dispatch('isShowWordsEnded', true, { root: true });
            commit('setWordsEnded');
        },
    },
    mutations: {
        resetWord(state) {
            state.currentWord = [];
        },
        resetTrials(state) {
            state.trials = [
                {
                    isActive: true,
                },
                {},
                {},
                {},
                {},
                {},
            ];
            state.trialIndex = 0;
        },
        resetLostWin(state) {
            state.isLost = false;
            state.isWin = false;
        },
        setLetterInWord(state, { index, letter }) {
            state.currentWord[index] = letter;
        },
        setSearchWords(state, words) {
            state.searchWords = words;
        },
        setSearchWord(state) {
            const randomIndex = getRandom(0, state.searchWords.length - 1);
            state.searchWord = state.searchWords[randomIndex];
            state.searchWords.splice(randomIndex, 1);
        },
        setGuessedWords(state, words) {
            state.guessedWords = words;
        },
        setWinsCount(state, winsCount) {
            state.winsCount = winsCount;
        },
        setPanelItems(state, { winsCount, words }) {
            const startStep = winsCount === 0 ? 1 : Math.floor((winsCount - 1) / 5) * 5 + 1;
            state.panelItems = [
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
        setIsGameFinished(state, isGameFinished) {
            state.isGameFinished = isGameFinished;
        },
        setWordsEnded(state) {
            state.trials.forEach(el => (el.isActive = false));
        },
        excludeSearchWords(state, words) {
            for (let i = 0, l = state.searchWords.length; i < l; i++) {
                words.forEach(el => {
                    if (state.searchWords.includes(el)) {
                        state.searchWords.splice(state.searchWords.indexOf(el), 1);
                        i--;
                    }
                });
            }
        },
        checkTrial(state) {
            state.trials[state.trialIndex]['letters'] = [];
            const letters = state.trials[state.trialIndex]['letters'];
            const rightIndexes = [];
            const compareWord = [];
            state.currentWord.forEach((el, i) => {
                if (state.currentWord[i] === state.searchWord[i]) {
                    rightIndexes.push(i);
                } else {
                    compareWord.push(state.searchWord[i]);
                }
            });

            state.currentWord.forEach((el, i) => {
                if (state.currentWord[i] === state.searchWord[i]) {
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

            if (rightIndexes.length === state.searchWord.length) {
                state.isWin = true;

                state.winsCount += 1;
                if (
                    (state.winsCount - 1) % 5 === 0 &&
                    state.winsCount > 5 &&
                    !state.isGameFinished
                ) {
                    state.panelItems = [
                        {
                            step: state.winsCount,
                            isDecor: true,
                        },
                        {
                            step: state.winsCount + 1,
                            isDecor: true,
                        },
                        {
                            step: state.winsCount + 2,
                            isDecor: true,
                        },
                        {
                            step: state.winsCount + 3,
                            isDecor: true,
                        },
                        {
                            step: state.winsCount + 4,
                            isGift: true,
                        },
                    ];
                }

                state.guessedWords.push(state.searchWord);

                state.panelItems.forEach(el => {
                    if (el.step === state.winsCount) {
                        el.isActive = true;
                        el.word = state.searchWord[0] + state.searchWord.slice(1).toLowerCase();
                    }
                });

                state.trials[state.trialIndex].isAnimate = true;
            }

            if (
                state.trialIndex === state.trials.length - 1 &&
                rightIndexes.length !== state.searchWord.length
            ) {
                state.isLost = true;
            }

            if (
                rightIndexes.length !== state.searchWord.length &&
                state.trialIndex < state.trials.length - 1
            ) {
                state.trials[state.trialIndex].isActive = false;
                state.trials[state.trialIndex].letters = letters;
                state.trialIndex += 1;
                state.trials[state.trialIndex].isActive = true;
                state.currentWord = [];
            }
        },
    },
};
