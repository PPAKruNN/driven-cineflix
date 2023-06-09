import axios from "axios"
import { useEffect, useState } from "react"
import styled from "styled-components"
import ENDPOINTS from "../../endpoints"
import { Link } from "react-router-dom"

export default function HomePage() {

    const [movies, setMovies] = useState([]);

    useEffect( () => {
        const promisse = axios.get(ENDPOINTS.movies)

        promisse.then( res => setMovies(res.data) )

        promisse.catch( e => console.error(e))

    }, [])

    console.log(movies)


    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                {movies.map((curr) => {
                    return (
                        <MovieContainer data-test="movie" key={curr.id}>
                            <Link to={"/sessoes/" + curr.id}>
                                <img src={curr.posterURL} alt={curr.title}/>
                            </Link>
                        </MovieContainer>
                    )
                })
                }
            </ListContainer>

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
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
const MovieContainer = styled.div`
    width: 145px;
    height: 210px;
    box-shadow: 0px 2px 4px 2px #0000001A;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 10px;
    img {
        width: 130px;
        height: 190px;
    }
`