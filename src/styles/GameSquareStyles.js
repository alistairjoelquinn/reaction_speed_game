import styled from "styled-components";

export const WelcomeMessageStlyes = styled.div`
    position: absolute;
    bottom: 20px;
    left: 0;
    font-size: 5rem;
    font-weight: bold;
    color: transparent;
    -webkit-text-stroke: 1px var(--orange);
    user-select: none;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    .dots {
        margin-top: 2rem;
        margin-left: 2.7rem;
    }
`;

export const GameAreaStyles = styled.div`
    margin-top: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .game-container {
        background-color: lightgray;
    }
`;

export const GameStyles = styled.div`
    --corners: 7rem;
    background-color: lightgrey;
    padding: 10px;
    border-radius: 8rem;
    position: absolute;
    height: 60vh;
    width: 50vw;
    z-index: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    gap: 1.3rem;
    .game-item {
        border: 2px solid var(--black);
        user-select: none;
    }
    .game-item:hover {
        opacity: 0.6;
    }
    .green {
        background-color: var(--green);
        border-top-left-radius: var(--corners);
    }
    .pink {
        background-color: var(--pink);
        border-top-right-radius: var(--corners);
    }
    .blue {
        background-color: var(--blue);
        border-bottom-left-radius: var(--corners);
    }
    .orange {
        background-color: var(--orange);
        border-bottom-right-radius: var(--corners);
    }
    .disabled {
        color: black;
        font-weight: bold;
        font-size: 30px;
        -webkit-text-stroke: 0.5px white;
        display: flex;
        justify-content: center;
        align-items:center;
    }
    .disabled:hover {
        opacity: 1;
    }
`;

export const DisplayUserColorStyles = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 5;
`;