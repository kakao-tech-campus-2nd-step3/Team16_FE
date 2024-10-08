import styled from '@emotion/styled';

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
        backgroundColor: '#698474',
        color: 'white',
        border: 'none',

        '&:hover': {
          backgroundColor: '#567b65',
        },
      };
    }

    if (theme === 'ivory') {
      return {
        backgroundColor: '#FCF8F3',
        color: '#698474',
        border: 'solid 2px',
        borderColor: '#698474',

        '&:hover': {
          backgroundColor: '#eae5d1',
        },
      };
    }

    if (theme === 'red') {
      return {
        backgroundColor: '#d9534f',
        color: 'white',
        border: 'none',

        '&:hover': {
          backgroundColor: '#c9302c',
        },
      };
    }

    return {};
  },
);
