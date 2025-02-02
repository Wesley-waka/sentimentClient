// Imports Start
'use client'
import Image from 'next/image';
import Link from 'next/link';


// Imports End

const TopBar = () => {

  // const currentDateTime = useDateTime()


  return (
    <header className="h-[10vh] bg-white border-b shadow-sm">
      <main className="h-full px-6 flex items-center justify-between">
        {/* GOK Flag Start */}
        <section className="flex items-center">
          <div className="relative w-10 h-10">
            <Image
              src="/logo.png"
              alt="National Flag"
              width={120}
              height={120}
              className="object-cover"
              priority
            />
          </div>
        </section>
        {/* GOK Flag End */}

        {/* Date && Notification Start */}
        <section className="flex items-center space-x-8">
          {/* Date Time Display Start */}
          <div className="text-[#4b5563] font-medium text-[14px]">
            {/*{currentDateTime}*/}
          </div>
          {/* Date Time Display End */}

          {/* Notifications Bell Start */}
          <Link href='/' className="relative text-blue-600 hover:text-blue-700 transition-colors duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#2563EB"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log Out
          </Link>
          {/* Notifications Bell End */}
        </section>
        {/* Date && Notification End */}
      </main>
    </header>
  );
};

export default TopBar;