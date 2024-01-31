import { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Container
} from 'react-bootstrap'
import { AiOutlineLike } from 'react-icons/ai'
import styles from './styles.module.scss';
import axios from 'axios';
import * as jwt_decode from 'jwt-decode';

export default function Post(){
    var [artigos, setArtigos] = useState([]);

    async function getPosts(){
        const res = await axios.get('http://localhost:8080/api/article')
        console.log(res);
        setArtigos(res.data)
    }

    async function handleClick(id){
        const token = sessionStorage.getItem('token');
        const decodeToken = jwt_decode.jwtDecode(token)
        await axios.post(`http://localhost:8080/api/article/like/${id}`, {userId: decodeToken.id})
        getPosts();
    }

    useEffect(() => {
        getPosts();
    }, [])

    const RenderPosts = () => {
        return artigos.map((artigo) => {
            return(
                <Card key={artigo._id} className={styles.card} >
                    <Card.Title className={styles.card__title}>
                        {artigo.title}
                    </Card.Title>
                    <Card.Body className={styles.card__body}>
                        <Card.Text className={styles.card__body__article}>{artigo.text}</Card.Text>
                        <div className='d-flex align-items-center '>
                            {artigo.likes.length-1}<Button variant='light' onClick={() => handleClick(artigo._id)}><AiOutlineLike /></Button>
                        </div>
                    </Card.Body>
                </Card>
            )
        })
    }

    return(
        <Container>
            <RenderPosts />
        </Container>
    )
}
