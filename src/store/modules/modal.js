export default {
    state: {
        isShowInfo: false,
        isShowPrize: false,
        isShowBonus: false,
        isShowWordsEnded: false,
        isBonusAnimate: true,
        prizes: [
            {
                name: 'Кэшбэк 3%<br />в магазине рыбной чешуи',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Да-а, чешуя будет не лишней!',
                img: 'fish-scales.png',
                wordsToOpen: 1,
            },
            {
                name: 'Кэшбэк 8%<br />на доставку печенек',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Печеньки - вкуснятина!',
                img: 'cookies.png',
                wordsToOpen: 5,
            },
            {
                name: 'Кэшбэк 35%<br />на домино',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Ошки-йошки, доминошки!',
                img: 'dominoes.png',
                wordsToOpen: 10,
            },
            {
                name: 'Кэшбэк 10%<br />на запуск ракеты',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Ракета полетит, ух как!',
                img: 'rocket.png',
                wordsToOpen: 15,
            },
            {
                name: 'Кэшбэк 15%<br />на новое заклинание',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Быть волшебником - круто!',
                img: 'magic.png',
                wordsToOpen: 20,
            },
            {
                name: 'Кэшбэк 10%<br />в барах',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Барчик ждёт, когда кое-кто придёт!',
                img: 'bar.png',
                isRound: true,
                wordsToOpen: 25,
            },
            {
                name: 'Скидка 400 у.ё.<br />на удары тапком',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Еее! Удары тапком!',
                img: 'slipper-kick.png',
                wordsToOpen: 30,
            },
            {
                name: 'Кэшбэк 17%<br />на путешествие<br />в глушь тайги',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Приключения ждут!',
                img: 'taiga.png',
                isRound: true,
                wordsToOpen: 35,
            },
            {
                name: 'Жареные гвозди<br />в подарок',
                isActive: false,
                isReceived: false,
                receivedMessage: 'А жареных гвоздей не хочешь, нет?',
                img: 'fried-nails.png',
                wordsToOpen: 40,
            },
            {
                name: 'Кэшбэк 24%<br />на лампочки в переходе',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Ага, и лампочка!..',
                img: 'light-bulb.png',
                isRound: true,
                wordsToOpen: 45,
            },
            {
                name: 'Кэшбэк 10%<br />на мармеладки',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Ну, вкуснятина же!)',
                img: 'marmalade.png',
                wordsToOpen: 50,
            },
            {
                name: 'Полёт<br />до самого неба',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Не упустите красоту!',
                img: 'sky.png',
                wordsToOpen: 55,
            },
            {
                name: 'Лампа джина<br />',
                isActive: false,
                isReceived: false,
                receivedMessage: 'Насладитесь вкусом джина!',
                img: 'gin-lamp.png',
                wordsToOpen: 60,
            },
        ],
    },
    actions: {
        increasePrizeWords({ commit }, numb) {
            commit('increasePrizeWords', numb);
        },
        getReveivedPrizes({ state }) {
            return state.prizes.map(({ isReceived }) => isReceived);
        },
        getIsPrizesUnlocked({ state }) {
            return state.prizes.every(el => el.isActive);
        },
        setIsShowBonus({ commit }, isShow) {
            commit('setIsShowBonus', isShow);
        },
        isShowWordsEnded({ commit }, isShow) {
            commit('setIsShowWordsEnded', isShow);
        },
    },
    mutations: {
        setIsShowInfo(state, isShow) {
            state.isShowInfo = isShow;
        },
        setIsShowPrize(state, isShow) {
            state.isShowPrize = isShow;
        },
        setIsShowBonus(state, isShow) {
            state.isShowBonus = isShow;
        },
        setIsShowWordsEnded(state, isShow) {
            state.isShowWordsEnded = isShow;
        },
        setIsBonusAnimate(state, isAnimate) {
            state.isBonusAnimate = isAnimate;
        },
        setPrizeIsReceived(state, index) {
            state.prizes[index].isReceived = true;
        },
        increasePrizeWords(state, numb) {
            state.prizes.forEach(el => {
                el.wordsToOpen -= numb;
                if (el.wordsToOpen <= 0) {
                    el.isActive = true;
                }
            });
        },
        setReceivedPrizes(state, receivedArr) {
            receivedArr.forEach((el, i) => {
                state.prizes[i].isReceived = el;
            });
        },
    },
};
