import Header from "./common/Header";
import NewUserForm from "./NewUserForm";
import Question from "./Question";
import PageLoading from "./common/PageLoading";

import { useState } from "react";

const Home = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  return isLoading ? (
    <div className="flex justify-center min-h-[100vh] items-center">
      <PageLoading fixed />
    </div>
  ) : (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="flex flex-col flex-1 items-center w-full">
        <div className="w-full max-w-2xl px-4 sm:px-6 py-4 flex flex-col gap-3 flex-1">
          {step === 0 && (
            <NewUserForm setStep={setStep} setIsLoading={setIsLoading} />
          )}
          {step === 1 && (
            <Question setStep={setStep} setIsLoading={setIsLoading} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
