'use client'
import React, { useEffect } from "react";
import Image from "next/image";
import { Rating } from "primereact/rating";
import { useMessage } from "../../../hooks/useMessage";
import { format } from "date-fns";

export default function AdminPage() {
  const { getAdminMessages, messages } = useMessage();


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

  useEffect(() => {
    getAdminMessages();
  }, []);
  return (
    <div className='flex h-[800px] w-[600px]  flex-col mx-auto  justify-center align-middle   overflow-y-auto  mt-[30px] '>


      {messages?.map((msg, index) => (
        <div key={index} className='ml-16'>
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
            <div>{msg.sentiments[0].score * 100 } %</div>
          </div>
          {emojiType(msg.sentiments[0].vote)}

        </div >
      ))}

    </div>
  );
}
