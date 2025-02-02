import {useState} from "react";

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

    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [messages,setMessages] = useState<Message[]>([]);


    const sendMessage = async (message: string,name: string) => {

        try {
            const params = {
                name: name,
            };

            const queryString = new URLSearchParams(params).toString();


            const response = await fetch(`${BASE_URL}/api/feedback/create?${queryString}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
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
            setLoading(false);
        }
        ;


    }


    const getAllMessages = async(name: string) =>{

        try{

            const params = {
                name: name,
            };

            const queryString = new URLSearchParams(params).toString();

            const response = await fetch(`${BASE_URL}/api/feedback/get?${queryString}`, {
                method: 'GET',
                headers: {},
            });

            const data = await response.json();
            setMessages(data);


        }catch (error){
            console.error('Login Error:', error);
            setError(error instanceof Error ? error.message : 'Something went wrong');
            return false;
        }
    }

    const getAdminMessages = async(sentimentType: string = '')=>{
        try{

            const params = {
                vote: sentimentType,
            };

            const queryString = new URLSearchParams(params).toString();

            const response = await fetch(`${BASE_URL}/api/feedback/all?${queryString}`, {
                method: 'GET',
                headers: {},
            });

            const data = await response.json();
            setMessages(data);


        }catch (error){
            console.error('Login Error:', error);
            setError(error instanceof Error ? error.message : 'Something went wrong');
            return false;
        }
    }

    return {
        sendMessage,
        loading,
        error,
        messages,
        getAllMessages,
        getAdminMessages
    };


}