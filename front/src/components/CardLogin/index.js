import { useContext, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.scss';
import { AlertContext } from "../../context/alert";
import {SECRET} from "../../env";
import CryptoJS from 'crypto-js';
import axios from 'axios';

export default function CardLogin(){
    const { setMessage, setShow, setVariant } = useContext(AlertContext);

    const navigate = useNavigate();
    var [login, setLogin] = useState('');
    var [password, setPassword] = useState('');

    async function handleSubmit(e){
        e.preventDefault();
        if(!formValid()) return

        const json = {
            login, password
        }
        try {
            const jsonCrypt = CryptoJS.AES.encrypt(JSON.stringify(json), SECRET).toString();
            var res = await axios.post('http://localhost:8080/api/user/login',{
                jsonCrypt
            })
            sessionStorage.setItem('token', res.data.token);
            navigate('/home')
        } catch (error) {
            setMessage('Erro ao se conectar');
            setShow(true);
            setVariant('danger');
        }
    }

    function formValid(){
        if(!login.includes('@')){
            setMessage('Insira um e-mail válidos')
            setShow(true);
            setVariant('danger')
            return false;
        }
        if(login.length < 5){
            setMessage('Insira um e-mail válido')
            setShow(true);
            setVariant('danger')
            return false;
        }

        return true
    }

    return(
        <Card className={styles.card}>
            <Card.Header className={styles.card__header}>
                <Card.Title>Login</Card.Title>
            </Card.Header>
            <Card.Body>
                <Form
                    className={styles.card__form}
                    onSubmit={handleSubmit}
                >
                    <Form.Control
                        value={login}
                        placeholder="Insira seu e-mail"
                        onChange={(e) => setLogin(e.target.value)}
                    />
                    <Form.Control
                        value={password}
                        placeholder="Insira sua senha"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className={styles.card__form__button}
                        type='submit'
                    >
                        Entrar
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    )
}