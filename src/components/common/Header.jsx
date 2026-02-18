import Icon from "./Icon";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
} from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin + "/login" } });
  };

  return (
    <Navbar>
      <NavbarBrand>
        <Icon icon="fa-solid fa-bars" size="xl" />
      </NavbarBrand>

      <NavbarContent justify="center">
        <NavbarItem>
          <p className="text-xl sm:text-2xl font-semibold">Titulo</p>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                as="button"
                size="sm"
                src={user?.picture}
                fallback={<Icon icon="fa-solid fa-circle-user" size="xl" />}
                className="cursor-pointer transition-opacity hover:opacity-80"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Opciones de perfil">
              <DropdownItem
                key="user-info"
                isReadOnly
                className="opacity-100 cursor-default"
                textValue={user?.name ?? "Usuario"}
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-default-400">{user?.email}</p>
                </div>
              </DropdownItem>
              <DropdownItem key="profile" onPress={() => navigate("/profile")}>
                Mi perfil
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                className="text-danger"
                onPress={handleLogout}
              >
                Cerrar sesión
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
