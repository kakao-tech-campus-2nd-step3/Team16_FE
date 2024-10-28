import styled from '@emotion/styled';

import { colors } from '@/styles/variants';

type Props = {
  theme?: 'green' | 'ivory' | 'red';
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: React.FC<Props> = ({ ...props }: Props) => {
  return <Wrapper {...props} />;
};

const Wrapper = styled.button<Pick<Props, 'theme'>>(
  {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 700,
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    transition: 'background-color 200ms',
  },

  ({ theme = 'green' }) => {
    if (theme === 'green') {
      return {
        backgroundColor: colors.primary,
        color: 'white',
        border: 'none',

        '&:hover': {
          backgroundColor: colors.primary_hover,
        },
      };
    }

    if (theme === 'ivory') {
      return {
        backgroundColor: colors.secondary,
        color: '#698474',
        border: 'solid 2px',
        borderColor: colors.primary,

        '&:hover': {
          backgroundColor: colors.secondary_hover,
        },
      };
    }

    if (theme === 'red') {
      return {
        backgroundColor: colors.third,
        color: 'white',
        border: 'none',

        '&:hover': {
          backgroundColor: colors.third_hover,
        },
      };
    }

    return {};
  },
);
