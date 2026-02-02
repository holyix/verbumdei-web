import type { Locale } from "$lib/types";
import { commonUiText, mergeUiText } from "$lib/content/common";

const homeSpecificUiText: Record<Locale, Record<string, string>> = {
    en: {},
    es: {},
    pt: {},
    sv: {},
};

export const homeUiText = mergeUiText(commonUiText, homeSpecificUiText);
