import {useContext, useState} from "react";
import {AuthContext} from "../context/AuthContext";

interface Sentiment{
    type: string;
    vote: string;
    score: number;
    locale: string;
    average: number;
    numHits: number;
    numWords: number;
}

interface Message{
    text: string;
    userName: string;
    createdAt: string;
    sentiments: Sentiment[]
};

// interface formMessage{
//     message: string;
//     name: string;
// }

interface MessageResponse{
    status: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;


export const useMessage = () => {


    const [error, setError] = useState<string>('');
    const [messages,setMessages] = useState<Message[]>([]);
    const { token } = useContext(AuthContext)
    const [loadingMessages, setLoadingMessages] = useState<boolean>(false);
    const [loadingSend, setLoadingSend] = useState<boolean>(false);


    const sendMessage = async (message: string) => {
        try {
            setLoadingSend(true);


            const response = await fetch(`${BASE_URL}/api/feedback/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    message: message
                })
            });

            const responseData: MessageResponse = await response.json();
            console.log('Login Response:', responseData);

            if (!response.ok) {
                throw new Error('Message was not sent.Please Try again later!');
            } else {
                return true;
            }

            // if (responseData.status === 'success' && responseData?.ok) {
            //     return true;
            // } else {
            //     throw new Error('Authentication failed');
            // }
        } catch(error) {
            console.error('Login Error:', error);
            setError(error instanceof Error ? error.message : 'Something went wrong');
            return false;
        }finally{
            setLoadingSend(false);
        }
        ;


    }


    const getAllMessages = async() =>{
        console.log(token,'this is our token')
        try{
            setLoadingMessages(true);


            const response = await fetch(`${BASE_URL}/api/feedback/get`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setMessages(data);


        }catch (error){
            console.error('Login Error:', error);
            setError(error instanceof Error ? error.message : 'Something went wrong');
            return false;
        }finally {
                setLoadingMessages(false);
        }
    }

    const getAdminMessages = async(sentimentType: string = '')=>{
        try{
            setLoadingMessages(true);


            const params = {
                vote: sentimentType,
            };

            const queryString = new URLSearchParams(params).toString();

            const response = await fetch(`${BASE_URL}/api/feedback/all?${queryString}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            setMessages(data);


        }catch (error){
            console.error('Login Error:', error);
            setError(error instanceof Error ? error.message : 'Something went wrong');
            return false;
        }finally{
            setLoadingMessages(false);
        }
    }

    return {
        sendMessage,
        error,
        messages,
        getAllMessages,
        getAdminMessages,
        loadingMessages,
        loadingSend
    };


}