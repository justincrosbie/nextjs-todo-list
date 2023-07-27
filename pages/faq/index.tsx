
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
            <span  className="font-bold">Q: Who are you?</span><br></br>
            A: It would do this resource, and you, a disservice to reveal my identity.
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400">
            <span  className="font-bold">Q: Is this just generating answers from ChatGPT?</span><br></br>
            A: No, rest assured, this is 100% human ;)
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400">
            <span  className="font-bold">Q: What if you are asked a question you can&apos;t answer?</span><br></br>
            A: I will conduct some research and do my best to answer it.
            </p>

            <p className="font-normal text-gray-700 dark:text-gray-400">
            <span  className="font-bold">Q: What if you are asked a question that involves you making assumptions?</span><br></br>
            A: If I have to answer with assumptions being made, or cannot omit my personal opinion or biases, I will make that clear that I have done so with a disclaimer. However, I will answer purely from an evidence perspective.
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
