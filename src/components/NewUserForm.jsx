import PropTypes from "prop-types";

import { Button } from "@nextui-org/react";
import { Input } from "@nextui-org/react";

const NewUserForm = ({ setStep, setIsLoading }) => {
  const handleContinueBtn = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep(1);
    }, 3000);
  };

  return (
    <div className="flex flex-col gap-7 text-left px-6">
      <p className="text-base text-balance">
        Bienvenido!
        <br />
        Vamos a empezar el quiz para validar tus conocimientos
      </p>
      <Input
        type="email"
        label="Correo electronico"
        placeholder="Ingresa tu correo"
      />
      <Button
        color="primary"
        variant="shadow"
        onClick={() => handleContinueBtn()}
      >
        INICIAR
      </Button>
    </div>
  );
};

NewUserForm.propTypes = {
  setStep: PropTypes.func,
  setIsLoading: PropTypes.func,
};

export default NewUserForm;
