import { setConfig, setAsset } from "../../src/signals";
import { feeChecker } from "../../src/utils/feeChecker";

const cfg = {
    "BTC/BTC": {
        hash: "3c45e394f2cb8b84ceee2a8e51849616a8981a7eab09e5194cd1ab7787b6b12e",
    },
    "L-BTC/BTC": {
        hash: "8cc20e549082be62f4d043966c838694cfb11c7ac6aca7e62467b6911e1d5117",
    },
};
const changed_cfg = {
    "BTC/BTC": {
        hash: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
    "L-BTC/BTC": {
        hash: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    },
};

describe("feeChecker", () => {
    beforeAll(() => {
        setConfig(cfg);
        setAsset("BTC");
    });

    test("same config should be valid", () => {
        expect(feeChecker(cfg)).toEqual(true);
    });

    test("fees changed, invalid", () => {
        expect(feeChecker(changed_cfg)).toEqual(false);
    });
});
