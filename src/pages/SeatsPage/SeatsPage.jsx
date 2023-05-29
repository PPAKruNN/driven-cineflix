/* eslint-disable no-useless-escape */
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
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
    const [sessionData, setSessionData] = useState({movie: {}, day: {}, });
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [buyerName, setBuyerName] = useState("");
    const [buyerCPF, setBuyerCPF] = useState("");
    
    const navigator = useNavigate()

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

    function cpfInput(event) {
        console.log("teste")
        let input = event.target.value.replace(/[\D\s\._\-]+/g, "")
        input = input ? parseInt( input, 10 ) : ""; 
        const arr = input.toString().split("");
    
        if(arr.length > 3 )arr.splice(3,0,".")
        if(arr.length > 7 )arr.splice(7,0,".")
        if(arr.length > 11 )arr.splice(11,0,"-")
        setBuyerCPF(arr.join(""));
    }

    function seatBuySubmission() {
        event.preventDefault();

        if(selectedSeats.length === 0) return alert("Nenhum assento escolhido!"); 
        console.log("Seat buy submitted!")
        const cpf = buyerCPF.replace(/[\D\s\._\-]+/g, "")
        const booking = {
            ids: selectedSeats,
            name: buyerName,
            cpf: cpf,
        }
        axios.post(ENDPOINTS.reservate, booking)
        console.log(booking);


        booking.cpf = buyerCPF;
        booking.session = sessionData;
        navigator("/sucesso", {state: booking})
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

            <FormContainer onSubmit={seatBuySubmission}>
                <label htmlFor="client">Nome do comprador</label>
                <input data-test="client-name" id="client" placeholder="Digite seu nome..." required  value={buyerName} onChange={e => setBuyerName(e.target.value)}/>

                <label htmlFor="cpf">CPF do comprador</label>
                <input data-test="client-cpf" id="cpf"value={buyerCPF} onChange={cpfInput} maxLength={14} required placeholder="XXX.XXX.XXX-XX" />

                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>
            </FormContainer>

            <FooterContainer data-test="footer">
                <div>
                    <img src={sessionData.movie.posterURL} alt={sessionData.movie.title} />
                </div>
                <div>
                    <p>{sessionData.movie.title}</p>
                    <p>{sessionData.day.weekday + " - " + sessionData.name}</p>
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
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;

    gap: 15px;

    button {
        margin-top: 50px;
        align-self: center;

        color: #fff;
        font-size: 18px;
        background-color: #E8833A;
        border-radius: 3px;
        padding: 10px;
        border: none;
    }
    input {
        border: 1px solid #D5D5D5;
        border-radius: 3px;
        padding: 12px;
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
            padding: 0px;
            margin: 0px;
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`