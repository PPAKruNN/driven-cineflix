import { styled } from "styled-components"

// eslint-disable-next-line react/prop-types
export default function SeatItem({seat: {id, name, isAvailable}, isSelected, isNotFunctional = false, selectedSeatsState: {selectedSeats, setSelectedSeats} }) {
    // SeatsState eh a variavel que vou atualizar no componente pai para adicioanr o seat como SELECIONADO. 

    function select() {
        let newArray = [...selectedSeats];

        console.log(isSelected, isAvailable);
        if(!isAvailable) return alert("Esse assento nao esta disponivel! Escolha outro assento!")      
        if (!isSelected){
            newArray.push(id);
        }
        else {
            const seatIndex = newArray.findIndex( c => c === id );
            const fpart = newArray.slice(0, seatIndex);
            const lpart = newArray.slice(seatIndex + 1, newArray.length);
            newArray = [...fpart, ...lpart];
        }
        console.log(newArray)
        setSelectedSeats(newArray);
    }

    if(isNotFunctional) {
        return <StyledSeatItem $isAvailable={isAvailable} $isSelected={isSelected}></StyledSeatItem>
    } 

    return (
        <StyledSeatItem onClick={select} $isAvailable={isAvailable} $isSelected={isSelected} >
            {name}
        </StyledSeatItem>
    )

}


const StyledSeatItem = styled.div`
    border: 1px solid ${props => !props.$isAvailable ? "#F7C52B" : props.$isSelected ? "#0E7D71" : "#7B8B99"};      // Essa cor deve mudar
    background-color: ${props => !props.$isAvailable ? "#FBE192" : props.$isSelected ? "#1AAE9E" : "#C3CFD9"};      // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`