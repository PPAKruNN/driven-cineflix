import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import styled from "styled-components"
import ENDPOINTS from "../../endpoints";
import SeatItem from "./SeatItem";

        // TODO:    
        // Gerar assentos dinamicamente.
        // Fazer verificacoes do formulario.
        // Alterar informacoes do footer.
        // Passar informacoes pra sucess page. (Usando NAVIGATE e USELOCATION)
        // arrumar css das paginas

export default function SeatsPage() {
    const {idSessao} = useParams();
    const [sessionData, setSessionData] = useState({});
    const [selectedSeats, setSelectedSeats] = useState([]);
    
    useEffect( () => {
        const promisse = axios.get(ENDPOINTS.seats(idSessao));
        promisse.then( res => setSessionData(res.data))
        promisse.catch( error => console.log(error))



    }, [idSessao])

    function genSeatsItem() {
        if(!sessionData.seats) return [];

        return sessionData.seats.map( seat => {
            return (
            <SeatItem 
                key={seat.id} 
                seat={seat} 
                isSelected={selectedSeats.includes(seat.id)} 
                selectedSeatsState={ {selectedSeats, setSelectedSeats} } 
            >
                {seat.name}
            </SeatItem>)
        })
        
    } 

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {genSeatsItem()}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle $isAvailable={true} $isSelected={true} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle $isAvailable={true} $isSelected={false}/>
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle $isAvailable={false} $isSelected={false} />
        
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer>
                Nome do Comprador:
                <input placeholder="Digite seu nome..." />

                CPF do Comprador:
                <input placeholder="Digite seu CPF..." />

                <button>Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer>
                <div>
                    <img src={"https://br.web.img2.acsta.net/pictures/22/05/16/17/59/5165498.jpg"} alt="poster" />
                </div>
                <div>
                    <p>Tudo em todo lugar ao mesmo tempo</p>
                    <p>Sexta - 14h00</p>
                </div>
            </FooterContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.div`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${props => !props.$isAvailable ? "#F7C52B" : props.$isSelected ? "#0E7D71" : "#7B8B99"};      // Essa cor deve mudar
    background-color: ${props => !props.$isAvailable ? "#FBE192" : props.$isSelected ? "#1AAE9E" : "#C3CFD9"};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`