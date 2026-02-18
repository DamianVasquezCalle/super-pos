import Header from "./common/Header";
import FardosList from "./FardosList";

const Home = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="flex flex-col flex-1 items-center w-full">
        <div className="w-full max-w-4xl px-4 sm:px-6 py-6">
          <FardosList />
        </div>
      </div>
    </div>
  );
};

export default Home;
