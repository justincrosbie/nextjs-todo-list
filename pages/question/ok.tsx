
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
            Your question has been submitted! I&apos;ll reply in due course.....might be an hour, might be a week. Sit tight ;)
            </p>

            <Button
              onClick={() => {
                gotoQuestions()
              }}
            >
                <div className="flex gap-3 md:order-2">Return to question list</div>
            </Button>
          </Card>
          </div>
      </div>  
    );
};

export default AskQuestionOk;
