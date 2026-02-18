import { useAuth0 } from "@auth0/auth0-react";
import { Button, Card, CardBody } from "@nextui-org/react";
import PageLoading from "./common/PageLoading";
import Icon from "./common/Icon";

const Login = () => {
  const { loginWithRedirect, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center min-h-[100vh] items-center">
        <PageLoading fixed />
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-[100vh] p-4 bg-default-50">
      <Card className="w-full max-w-sm shadow-lg">
        <CardBody className="flex flex-col items-center gap-8 p-8">
          <div className="flex flex-col items-center gap-3">
            <Icon
              icon="fa-solid fa-circle-user"
              size="4x"
              className="text-primary"
            />
            <h1 className="text-3xl font-bold text-primary">Super POS</h1>
            <p className="text-default-500 text-sm text-center">
              Inicia sesión para continuar
            </p>
          </div>

          <Button
            color="primary"
            variant="shadow"
            size="lg"
            fullWidth
            onPress={() => loginWithRedirect()}
          >
            Iniciar sesión
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
