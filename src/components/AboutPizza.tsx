import React from 'react';
import {useParams} from "react-router-dom";
import axios from "axios";

type Pizza = {
    title: string;
    price: number;
    imageUrl: string;
}

const AboutPizza: React.FC = () => {
    const [pizza, setPizza] = React.useState<Pizza>();
    const params = useParams();

    React.useEffect(() => {
        const fetchPizza = async () => {
            try {
                const {data} = await axios.get('https://63fc646c859df29986bb930b.mockapi.io/items/' + params.id);
                setPizza(data);
            } catch (error) {
                console.log(error)
            }
        }

        fetchPizza();
    }, []);

    return (
        <div className='container'>
            {
                pizza &&
                <>
                    <img src={pizza.imageUrl} alt="Pizza"/>
                    <h2>{pizza.title}</h2>
                    <p>{pizza.price} ₽</p>
                </>
            }
        </div>
    );
};

export default AboutPizza;

