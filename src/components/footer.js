import styled from "styled-components";

function Footer(){
    return (
        <FooterContainer>
            <footer>Footer</footer>
        </FooterContainer>
    )
}

export default Footer;
const FooterContainer = styled.div`
    background-color: var(--color-background);
    padding: 20px;
    text-align: center;
    height: 300px;
`;