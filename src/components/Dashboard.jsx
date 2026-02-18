import Header from "./common/Header";
import Icon from "./common/Icon";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />
      <div className="flex flex-col flex-1 items-center justify-center gap-4 px-4 text-default-400">
        <Icon icon="fa-solid fa-gauge-high" size="3x" />
        <p className="text-lg">Dashboard</p>
      </div>
    </div>
  );
};

export default Dashboard;
