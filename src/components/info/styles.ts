import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;

    strong{
    font-size: 24px;
    line-height: 100%;
    font-weight: bold;
    color: var(--white);
    }

    span{
    font-size: 20px;
    line-height: 100%;
    font-weight: bold;
    color: var(--white);
    }
`;
