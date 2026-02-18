import { useAuth0 } from "@auth0/auth0-react";
import {
  Avatar,
  Card,
  CardBody,
  Chip,
  Divider,
} from "@nextui-org/react";
import Header from "./common/Header";

const ProfileField = ({ label, value }) => (
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 py-2">
    <span className="text-sm text-default-500">{label}</span>
    <span className="text-sm font-medium break-all">{value}</span>
  </div>
);

const MyProfile = () => {
  const { user } = useAuth0();

  return (
    <div className="flex flex-col min-h-[100vh]">
      <Header />

      <div className="flex justify-center items-start flex-1 p-4 sm:p-8">
        <Card className="w-full max-w-lg shadow-md">
          <CardBody className="p-6 flex flex-col gap-6">
            {/* Avatar + name */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <Avatar
                src={user?.picture}
                className="w-20 h-20 text-large shrink-0"
              />
              <div className="flex flex-col items-center sm:items-start gap-1">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                {user?.nickname && user.nickname !== user.name && (
                  <p className="text-default-500 text-sm">@{user.nickname}</p>
                )}
                <Chip
                  size="sm"
                  variant="flat"
                  color={user?.email_verified ? "success" : "warning"}
                >
                  {user?.email_verified ? "Verificado" : "No verificado"}
                </Chip>
              </div>
            </div>

            <Divider />

            {/* Info fields */}
            <div className="flex flex-col divide-y divide-default-100">
              {user?.email && (
                <ProfileField label="Correo electrónico" value={user.email} />
              )}
              {user?.sub && (
                <ProfileField label="ID de usuario" value={user.sub} />
              )}
              {user?.updated_at && (
                <ProfileField
                  label="Última actualización"
                  value={new Date(user.updated_at).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                />
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default MyProfile;
