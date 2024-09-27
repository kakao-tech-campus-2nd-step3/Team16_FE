import styled from '@emotion/styled';
import { forwardRef } from 'react';

import { vars } from '@/styles';

type Props = {
  maxWidth?: string;
  flexDirection?: 'row' | 'column';
  justifyContent?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around';
  alignItems?: 'center' | 'flex-start' | 'flex-end' | 'baseline' | 'stretch';
} & React.HTMLAttributes<HTMLDivElement>;

export const Container: React.FC<Props> = forwardRef(
  (
    { children, maxWidth, flexDirection, justifyContent, alignItems, ...props }: Props,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    return (
      <Wrapper ref={ref} {...props}>
        <Inner
          className="inner"
          maxWidth={maxWidth}
          flexDirection={flexDirection}
          justifyContent={justifyContent}
          alignItems={alignItems}
        >
          {children}
        </Inner>
      </Wrapper>
    );
  },
);

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Inner = styled.div<
  Pick<Props, 'maxWidth' | 'flexDirection' | 'justifyContent' | 'alignItems'>
>`
  width: 100%;
  max-width: ${({ maxWidth }) => maxWidth ?? vars.breakpoints.md};
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection ?? 'column'};
  justify-content: ${({ justifyContent }) => justifyContent ?? 'flex-start'};
  align-items: ${({ alignItems }) => alignItems ?? 'flex-start'};
`;
