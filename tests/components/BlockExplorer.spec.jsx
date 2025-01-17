import { I18nContext } from "@solid-primitives/i18n";
import { render, screen } from "@solidjs/testing-library";
import i18n from "../../src/i18n/i18n";
import createI18n from "../../src/i18n";
import BlockExplorer from "../../src/components/BlockExplorer";
import { blockexplorer_url, blockexplorer_url_liquid } from "../../src/config";

describe("BlockExplorer", () => {
    test.each`
        asset      | baseLink                    | address
        ${"BTC"}   | ${blockexplorer_url}        | ${"bcrt1qh47qjmkkdxmg8cjxhe7gnnuluwddcw692cfjsv"}
        ${"L-BTC"} | ${blockexplorer_url_liquid} | ${"el1qqfvxkyk2973r8y0dd42ce34r33gplzaharn0sj69qs6gvkua0r0evkk6skde36hgfx2gufy8s8ppdz54kqwkcn9az63n5pcj3"}
    `(
        "should link to $asset addresses",
        async ({ asset, baseLink, address }) => {
            render(() => (
                <I18nContext.Provider value={createI18n()}>
                    <BlockExplorer asset={asset} address={address} />
                </I18nContext.Provider>
            ));

            const button = await screen.findByText(i18n.en.blockexplorer);
            expect(button).not.toBeUndefined();
            expect(button.href).toEqual(`${baseLink}/address/${address}`);
        }
    );

    test.each`
        asset      | baseLink                    | address
        ${"BTC"}   | ${blockexplorer_url}        | ${"813c90372c9b774396c66099cf8015f9510a8ba5686cbb78d8e848959fe7bb5d"}
        ${"L-BTC"} | ${blockexplorer_url_liquid} | ${"9193b769c217808a17a86890195851eab78fdfd2f14d877163587327620324af"}
    `(
        "should link to $asset transactions",
        async ({ asset, baseLink, txId }) => {
            render(() => (
                <I18nContext.Provider value={createI18n()}>
                    <BlockExplorer asset={asset} txId={txId} />
                </I18nContext.Provider>
            ));

            const button = await screen.findByText(i18n.en.blockexplorer);
            expect(button).not.toBeUndefined();
            expect(button.href).toEqual(`${baseLink}/tx/${txId}`);
        }
    );
});
