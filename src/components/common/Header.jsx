import Icon from "./Icon";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Link,
} from "@nextui-org/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

const NAV_ITEMS = [
  { label: "Dashboard", path: "/dashboard", icon: "fa-solid fa-gauge-high" },
  { label: "Punto de venta", path: "/pos", icon: "fa-solid fa-cash-register" },
  { label: "Fardos", path: "/fardos", icon: "fa-solid fa-boxes-stacked" },
];

const Header = () => {
  const { user, logout } = useAuth0();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout({ logoutParams: { returnTo: window.location.origin + "/login" } });
  };

  const handleNavClick = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <Navbar isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        />
        <NavbarBrand>
          <p className="text-lg font-bold text-primary">Ayudante</p>
        </NavbarBrand>
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

      <NavbarMenu>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.path;
          return (
            <NavbarMenuItem key={item.path} isActive={isActive}>
              <Link
                as="button"
                className="w-full flex items-center gap-3 text-left"
                color={isActive ? "primary" : "foreground"}
                size="lg"
                onPress={() => handleNavClick(item.path)}
              >
                <Icon icon={item.icon} className="w-5" />
                {item.label}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
