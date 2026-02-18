import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@nextui-org/react";
import PageLoading from "./common/PageLoading";
import Icon from "./common/Icon";

const Login = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center h-[100vh] items-center">
        <PageLoading fixed />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh] gap-8 px-6">
      <div className="flex flex-col items-center gap-3">
        <Icon icon="fa-solid fa-circle-user" size="4x" className="text-primary" />
        <h1 className="text-3xl font-bold text-primary">Super POS</h1>
        <p className="text-default-500 text-sm text-center">
          Inicia sesión para continuar
        </p>
      </div>

      <div className="w-full max-w-xs flex flex-col gap-4">
        <Button
          color="primary"
          variant="shadow"
          size="lg"
          fullWidth
          onClick={() => loginWithRedirect()}
        >
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
};

export default Login;
