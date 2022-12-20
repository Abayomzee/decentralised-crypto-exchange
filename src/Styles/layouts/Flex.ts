import styled from "styled-components";
import {
  FlexRow,
  FlexRowReverse,
  FlexRowAiCenter,
  FlexRowJcBetween,
  FlexRowJcBetweenAiCenter,
  FlexRowWrapJcBetween,
  FlexColumnJcCenter,
  FlexColumnAiCenter,
  FlexRowJcCenter,
} from "../Abstract/Mixins";

interface Props {
  // Flex rows
  flexRow?: boolean;
  flexRowReverse?: boolean;
  flexRowAiCenter?: boolean;
  flexRowJcBetween?: boolean;
  flexRowJcCenter?: boolean;
  flexRowJcBetweenAiCenter?: boolean;

  // Flex row wraps
  flexRowWrapJcBetween?: boolean;

  //   Flex columns
  flexColumn?: boolean;
  flexColumnReverse?: boolean;
  flexColumnJcCenter?: boolean;
  flexColumnAiCenter?: boolean;

  //   Flex gaps
  gap?: string;
  columnGap?: string;
  rowGap?: string;
}
export const Flex = styled.div<Props>`
  ${({
    flexRow,
    flexRowReverse,
    flexRowAiCenter,
    flexRowJcBetween,
    flexRowJcCenter,
    flexRowJcBetweenAiCenter,
    flexRowWrapJcBetween,
    flexColumn,
    flexColumnReverse,
    flexColumnJcCenter,
    flexColumnAiCenter,
  }) => {
    /* Rows */
    if (flexRow) return `${FlexRow}`;
    if (flexRowReverse) return `${FlexRowReverse}`;
    if (flexRowAiCenter) return `${FlexRowAiCenter}`;
    if (flexRowJcBetween) return `${FlexRowJcBetween}`;
    if (flexRowJcCenter) return `${FlexRowJcCenter}`;
    if (flexRowJcBetweenAiCenter) return `${FlexRowJcBetweenAiCenter}`;
    if (flexRowWrapJcBetween) return `${FlexRowWrapJcBetween}`;

    /* Columns */
    if (flexColumn) return "flex-direction: column";
    if (flexColumnReverse) return "flex-direction: column-reverse";
    if (flexColumnJcCenter) return `${FlexColumnJcCenter}`;
    if (flexColumnAiCenter) return `${FlexColumnAiCenter}`;
  }};

  ${({ gap, columnGap, rowGap }) => {
    if (gap) return `gap: ${gap}`;
    if (columnGap) return `column-gap: ${columnGap}`;
    if (rowGap) return `row-gap: ${rowGap}`;
  }}
`;
