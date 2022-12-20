import { css } from "styled-components";

// Flex Displays

// ===> Flex rows
export const FlexRow = css`
  display: flex;
  flex-direction: row;
`;

export const FlexRowReverse = css`
  display: flex;
  flex-direction: row-reverse;
`;

export const FlexRowAiCenter = css`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FlexRowAiEnd = css`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`;

export const FlexRowJcBetween = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const FlexRowJcCenter = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

export const FlexRowJcBetweenAiCenter = css`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const FlexRowJcCenterAiCenter = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

// flex wraps
export const FlexRowWrap = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const FlexRowWrapJcCenter = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const FlexRowWrapJcCenterAiCenter = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const FlexRowWrapJcBetween = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

// ===>End of Flex rows
// ===> Flex columns
export const FlexColumn = css`
  display: flex;
  flex-direction: column;
`;
export const FlexColumnJcCenterAiCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FlexColumnJcCenter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FlexColumnJcBetween = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const FlexColumnAiCenter = css`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// ===>End of Flex columns

// End of Flex Displays

// Grid mixins
export const clearfix = css`
  &::after {
    content: "";
    display: table;
    clear: both;
  }
`;
