import { Link, useLocation } from "react-router-dom"
import styled from "styled-components"

export default function SuccessPage() {
    const {state} = useLocation()


    return (
        <PageContainer>
            <h1>Pedido feito <br /> com sucesso!</h1>

            <TextContainer>
                <strong><p>Filme e sessao</p></strong>
                <p>{state.session.movie.title}</p>
                <p>{state.session.day.date} - {state.session.name}</p>
            </TextContainer>

            <TextContainer>
                <strong><p>Ingressos</p></strong>
                {state.ids.map( seatId => <p key={seatId}>Assento {state.session.seats.find(c => c.id === seatId).name}</p>)}
            </TextContainer>

            <TextContainer>
                <strong><p>Comprador</p></strong>
                <p>Nome: {state.name}</p>
                <p>CPF: {state.cpf}</p>
            </TextContainer>

            <Link to={"/"}><button>Voltar para Home</button></Link>
        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    color: #293845;
    margin: 30px 20px;
    padding-bottom: 120px;
    padding-top: 70px;

    gap: 20px;
    a {
        text-decoration: none;
    }
    button {
        margin-top: 50px;
        color: #fff;
        font-size: 18px;
        background-color: #E8833A;
        border-radius: 3px;
        padding: 10px;
        border: none;
    }
    h1 {
        font-family: 'Roboto';
        font-style: normal;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        display: flex;
        align-items: center;
        text-align: center;
        color: #247A6B;
    }
`
const TextContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 5px;
    p{
        padding: 0px;
        margin: 0px;
    }
    strong {
        font-weight: bold;
        margin-bottom: 5px;
    }
`