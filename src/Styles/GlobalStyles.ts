import { createGlobalStyle } from "styled-components";
import { Fonts } from "./Abstract/Fonts";
import { Variables } from "./Abstract/Variables";
import { Reset } from "./Base/Reset";
import { Typography } from "./Base/Typography";
import { Utilities } from "./Base/Utilities";

export const GlobalStyle = createGlobalStyle`
${Variables}
${Fonts};

${Reset};
${Typography}
${Utilities}
`;
