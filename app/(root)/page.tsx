import Link from 'next/link';
import React from 'react';
import Image from 'next/image';
import './page.css';
import { Button } from '@/components/Button';
import { testDataCards } from '@/constants';
import InterviewCard from '@/components/InterviewCard';

const Page = () => {
  return (
    <div>
      <div className="flex flex-row bg-gradient-to-b from-[#171532] to-[#08090D] rounded-3xl mx-16 my-10 items-center justify-between  max-sm:mx-4">
        <div className='flex gap-10 mt-10 mb-10 max-sm:mt-0 max-sm:mb-3 max-sm:ml-2 max-sm:mr-2 '>
          <section
            className="
    flex flex-col gap-4 blue-gradient-dark rounded-3xl px-16 pt-6 pb-6 items-start 
    max-w-[1400px]
    px-10-[1400]:max-w-full 
    max-sm:px-3 
  "
          >

            <h1 className="text-3xl font-semibold max-lg:ml-0 max-lg:mt-3">
              Prepare for real interviews with your AI buddy!
            </h1>
            <p className="text-lg text-light-100 max-lm:ml-0">
              Practice real interview questions and receive instant feedback to improve.
            </p>
            <Button
              asChild
              className="mt-2 w-fit !bg-primary-200 !text-dark-100 hover:!bg-primary-200/80 !rounded-full !font-bold px-5 cursor-pointer min-h-10 max-sm:w-full max-sm:ml-0"
            >
              <Link href="/interview">Start Interview</Link>
            </Button>
          </section>
          <section className='flex justify-center items-center max-[1400px]:hidden'>
            <Image
              src="/robot.png"
              alt="Robot"
              width={400}
              height={400}
              className='max-sm:hidden flex justify-center items-center'
            />
          </section>
        </div>


      </div>

      <div className="mx-16 my-10 max-sm:mx-4">
        <section className="flex flex-col gap-6 mt-8">
          <h2 className="text-3xl font-semibold">Your Interviews</h2>
          <div className="flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch">
            {/* <p className="text-light-100">You haven't taken any interviews yet.</p> */}

            {testDataCards.map((interview) => (
              <InterviewCard {...interview} key={interview.id} />
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-6 mt-8">
          <h2 className="text-3xl font-semibold">Take an Interview</h2>
          <div className="flex flex-wrap gap-4 max-lg:flex-col w-full items-stretch">
            <p className="text-light-100">There are no interview available.</p>
          </div>
        </section>
      </div>
    </div>


  );
};

export default Page;
