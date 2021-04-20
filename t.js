
const XylohpneKeys = ['KeyR', 'Digit6', 'KeyI', 'KeyR', 'KeyI', 'Digit0', 'KeyR', 'KeyU', 'KeyO', 'KeyR', 'Digit6', 'KeyI', 'KeyR', 'KeyI', 'Digit0', 'KeyR', 'KeyI', 'Digit0', 'KeyR', 'KeyU', 'KeyO', 'KeyR', 'KeyU', 'KeyO', 'KeyR', 'Digit6', 'KeyI'];
const XylophoneTempo = [0, 0, 0, 400, 400, 400, 800, 800, 800, 1400, 1400, 1400, 1800, 1800, 1800, 2200, 2200, 2200, 2400, 2400, 2400, 2600, 2600, 2600, 2800, 2800, 2800];

// Using map()

const Xylophone = XylohpneKeys.map((code, i) => {
    return {code, timeStamp: XylophoneTempo[i]};
})
console.log(JSON.stringify(Xylophone, null, 4));


const sample1 = [
    {
        code: "KeyE",
        timeStamp: 0
    },
    {
        code: "KeyQ",
        timeStamp: 167
    },
    {
        code: "KeyY",
        timeStamp: 334
    },
    {
        code: "KeyP",
        timeStamp: 334
    },
    {
        code: "KeyQ",
        timeStamp: 501
    },
    {
        code: "KeyT",
        timeStamp: 668
    },
    {
        code: "KeyY",
        timeStamp: 835
    },
    {
        code: "KeyP",
        timeStamp: 835
    },
    {
        code: "KeyT",
        timeStamp: 1002
    },
    {
        code: "KeyQ",
        timeStamp: 1169
    },
    {
        code: "KeyY",
        timeStamp: 1336
    },
    {
        code: "KeyP",
        timeStamp: 1336
    },
    {
        code: "KeyI",
        timeStamp: 1509
    },
    {
        code: "KeyT",
        timeStamp: 1509
    },
    {
        code: "KeyQ",
        timeStamp: 1670
    },
    {
        code: "KeyT",
        timeStamp: 1837
    },
    {
        code: "KeyI",
        timeStamp: 1837
    }
];




const sample2 = [
    {
        code: "KeyR",
        timeStamp: 0
    },
    {
        code: "Digit6",
        timeStamp: 0
    },
    {
        code: "KeyI",
        timeStamp: 0
    },
    {
        code: "KeyR",
        timeStamp: 400
    },
    {
        code: "KeyI",
        timeStamp: 400
    },
    {
        code: "Digit0",
        timeStamp: 400
    },
    {
        code: "KeyR",
        timeStamp: 800
    },
    {
        code: "KeyU",
        timeStamp: 800
    },
    {
        code: "KeyO",
        timeStamp: 800
    },
    {
        code: "KeyR",
        timeStamp: 1400
    },
    {
        code: "Digit6",
        timeStamp: 1400
    },
    {
        code: "KeyI",
        timeStamp: 1400
    },
    {
        code: "KeyR",
        timeStamp: 1800
    },
    {
        code: "KeyI",
        timeStamp: 1800
    },
    {
        code: "Digit0",
        timeStamp: 1800
    },
    {
        code: "KeyR",
        timeStamp: 2200
    },
    {
        code: "KeyI",
        timeStamp: 2200
    },
    {
        code: "Digit0",
        timeStamp: 2200
    },
    {
        code: "KeyR",
        timeStamp: 2400
    },
    {
        code: "KeyU",
        timeStamp: 2400
    },
    {
        code: "KeyO",
        timeStamp: 2400
    },
    {
        code: "KeyR",
        timeStamp: 2600
    },
    {
        code: "KeyU",
        timeStamp: 2600
    },
    {
        code: "KeyO",
        timeStamp: 2600
    },
    {
        code: "KeyR",
        timeStamp: 2800
    },
    {
        code: "Digit6",
        timeStamp: 2800
    },
    {
        code: "KeyI",
        timeStamp: 2800
    }
];


const sample1 = [
    {
        code: "KeyE",
        timeStamp: 0
    },
    {
        code: "KeyQ",
        timeStamp: 167
    },
    {
        code: "KeyY",
        timeStamp: 334
    },
    {
        code: "KeyP",
        timeStamp: 334
    },
    {
        code: "KeyQ",
        timeStamp: 501
    },
    {
        code: "KeyT",
        timeStamp: 668
    },
    {
        code: "KeyY",
        timeStamp: 835
    },
    {
        code: "KeyP",
        timeStamp: 835
    },
    {
        code: "KeyT",
        timeStamp: 1002
    },
    {
        code: "KeyQ",
        timeStamp: 1169
    },
    {
        code: "KeyY",
        timeStamp: 1336
    },
    {
        code: "KeyP",
        timeStamp: 1336
    },
    {
        code: "KeyI",
        timeStamp: 1509
    },
    {
        code: "KeyT",
        timeStamp: 1509
    },
    {
        code: "KeyQ",
        timeStamp: 1670
    },
    {
        code: "KeyT",
        timeStamp: 1837
    },
    {
        code: "KeyI",
        timeStamp: 1837
    },



    {
        code: "KeyE",
        timeStamp: 2504
    },
    {
        code: "KeyQ",
        timeStamp: 2671
    },
    {
        code: "KeyY",
        timeStamp: 2838
    },
    {
        code: "KeyP",
        timeStamp: 2838
    },
    {
        code: "KeyQ",
        timeStamp: 3005
    },
    {
        code: "KeyT",
        timeStamp: 3172
    },
    {
        code: "KeyY",
        timeStamp: 3339
    },
    {
        code: "KeyP",
        timeStamp: 3339
    },
    {
        code: "KeyT",
        timeStamp: 3506
    },
    {
        code: "KeyQ",
        timeStamp: 3673
    },
    {
        code: "KeyY",
        timeStamp: 3840
    },
    {
        code: "KeyP",
        timeStamp: 3840
    },
    {
        code: "KeyI",
        timeStamp: 4013
    },
    {
        code: "KeyT",
        timeStamp: 4013
    },
    {
        code: "KeyQ",
        timeStamp: 4174
    },
    {
        code: "KeyT",
        timeStamp: 4341
    },
    {
        code: "KeyI",
        timeStamp: 4341
    }
];