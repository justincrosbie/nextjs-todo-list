
import { Alert, Button, Card } from 'flowbite-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const AskQuestionOk = () => {

  const router = useRouter()

  function gotoQuestions() {
    router.push('/')
  }

    return (
        <div className="w-full h-full bg-gray-200">
          <div
            className="w-full flex flex-col justify-center items-center p-4"
            style={{ minWidth: 250, maxWidth: 600, margin: 'auto' }}
          >
          <Card 
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="https://random.imagecdn.app/300/200"
            className="w-full h-full" href="#">

            <p className="font-normal text-gray-700 dark:text-gray-400">
            There is a lot of information out there. Most of it is misleading - it is designed to tear us apart, and polarise us, and confuse us. I hope this site will be helpful as an antidote to all of that. To bring peace, and understanding, and clarity, in a world of chaos and conflict and confusion.
            </p>
            
            <p className="font-normal text-gray-700 dark:text-gray-400">
            This is a simple site to help. If you have a question, I will do my best to answer it as accurately as possible, and I will keep my own opinions, biases, and assumptions out of it as much as I can.
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400">
            You might be asking why should I be answering anyone&apos;s questions. And maybe I can&apos;t. And I may not get to them all. But I&apos;ll try.
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400">
            I have a lot of life experience. And I have read a lot. And most importantly, I have come to some realisations. Mostly due to transformations that I experienced over certain periods in my life, that have caused me to grow.
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400">
            And I&apos;m happy to share those with you. And provide my insights from my perspective.
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400">
            With the hope that they may bring you peace, and some understanding.
            </p>

            <Button
              onClick={() => {
                gotoQuestions()
              }}
            >
                <div className="flex gap-3 md:order-2">Go to the question list</div>
            </Button>
          </Card>
          </div>
      </div>  
    );
};

export default AskQuestionOk;
