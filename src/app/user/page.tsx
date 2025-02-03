'use client'
import React, { useEffect, useState } from 'react';
import { useMessage } from '../../../hooks/useMessage';
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Rating } from "primereact/rating";
import Image from "next/image";
import { format } from 'date-fns';
// interface Message {
//     message: string;
//     name: string;
//     rating?: number;
//     helpfulPercentage?: number;
// }



export default function ChatPage() {
  const { sendMessage, getAllMessages, messages,loadingSend } = useMessage();
  const [messageInput, setMessageInput] = useState('');
  useEffect(() => {
    getAllMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // if (!messageInput.trim()) return;
    //
    // const message: Message = {
    //     message: messageInput,
    // };

    await sendMessage(messageInput);
    setMessageInput('');
    await getAllMessages()
  };

  function getAlias(word: string): string {
    const words = word.split(' ');
    if (words.length > 1) {
      return words.map(w => w[0]).join('');
    } else {
      return word[0];
    }
  }

  function emojiType(vote: string) {
    if (vote === 'positive') {
      return (<i className="pi pi-thumbs-up-fill"></i>);
    } else if (vote === 'negative') {
      return (<i className="pi pi-thumbs-down-fill"></i>);
    } else if (vote === 'neutral') {
      return (<Image src='/neutral.png' alt='neutral' width={20} height={20} />);
    }
  }

  function calculateRating(
    value: number,
    maxValue: number = 1.0,
    maxStars: number = 5
  ): number {
    // Ensure value is within bounds
    const boundedValue = Math.max(0, Math.min(value, maxValue));

    // Calculate rating
    const rating = (boundedValue / maxValue) * maxStars;

    return rating;
  }

  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a')
  }


  return (
    <div className="flex h-[100vh] flex-col">


      {
        messages.length === 0 ? (<div className='mt-6 flex h-3/4 flex-col items-center space-y-2'>
            <Image src='/noReviews.png' width={200} height={200} alt='No reviews'/>
            <p>Add your Reviews to our products</p>
        </div>)
            :
            (<div className="mt-6 flex h-3/4 flex-col items-center space-y-8 overflow-y-auto">
          {messages?.map((msg, index) => (
              <div key={index}>
                <li className="flex ms-auto gap-x-2 sm:gap-x-4">
                  <div className="grow text-end space-y-3">
                    <div className="inline-flex flex-col justify-end">
                      <div className="inline-block bg-blue-600 rounded-2xl p-4 shadow-sm">
                        <p className="text-sm text-white">{msg.text}</p>
                      </div>
                      <span
                          className="mt-1.5 ms-auto flex items-center gap-x-1 text-xs text-gray-500 dark:text-neutral-500">
                    <svg
                        className="shrink-0 size-3"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                      <path d="M18 6 7 17l-5-5"></path>
                      <path d="m22 10-7.5 7.5L13 16"></path>
                    </svg>
                        {msg.userName}
                        <p>{formatDate(msg.createdAt)}</p>

                  </span>
                    </div>
                  </div>
                  <span
                      className="shrink-0 inline-flex items-center justify-center size-[38px] rounded-full bg-gray-600">
                <span
                    className="text-sm font-medium text-white leading-none">{getAlias(msg.userName)}</span>
              </span>
                </li>
                <div className="flex flex-row justify-between">
                  <Rating value={calculateRating(msg.sentiments[0].score)} readOnly cancel={false} />
                  <div>{msg.sentiments[0].score * 100}%</div>
                </div>
                {emojiType(msg.sentiments[0].vote)}

              </div>
          ))}


        </div>)
      }


      <form
        onSubmit={handleSubmit}
        className="mt-auto flex gap-2 p-4 p-inputgroup flex-1"
      >
        <InputTextarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Send a message"
          className="min-h-[50px] flex-1"
        />

          {
              loadingSend ? (<div className="flex items-center text-nowrap">
                  <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                  >
                      <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                      />
                      <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                  </svg>
                  Sending
              </div>
              ) :(
                  <>
              <Button icon="pi pi-send" className="p-button-danger text-white p-4 bg-primaryRed hover:bg-red-800" />
              </>

              )
          }
      </form>
    </div>
  );
}

