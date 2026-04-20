import { GithubLogoIcon } from '@phosphor-icons/react';
import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--black-blue);
    height: 100vh;
    width: 100vw;
`;

export const Content = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    background-color: var(--dark-blue);
    width: 380px;
    padding: 32px;
    border-radius: 8px;
    color: var(--white);

     h1{
        font-size: 24px;
        color: var(--white);
        font-weight: bold;
        margin-bottom: 20px;
    }

     p{
        color: var(--white);
          font-weight: 300;
          font-size: 12px;
          text-align: center;
          margin-top: 20px;
          width: 212px;
        }
`;

export const Button = styled.button`
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--info);
        border: none;
        color: var(--white);
        font-size: 16px;
        height: 36px;
        width: 100%;
        border-radius: 4px;
        margin-top: 32px;

        transition: background 100ms;

        &&:hover {
            background-color: var(--info-hover);
        }
`;

export const GitHubIcon = styled(GithubLogoIcon)`
    width: 20px;
    height: 20px;
    margin-right: 4px;
`;
