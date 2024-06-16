import React from 'react'
import { AcmeLogo } from './AcmeLogo'


import { Link , useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, DropdownItem, DropdownTrigger, Dropdown, DropdownMenu, Avatar} from "@nextui-org/react";




function NavbarAll() {
  const navigate = useNavigate();
  const handleProfile = () => {
    return navigate("/user/myprofile");
  }
  const logout = () => {
    localStorage.removeItem("auth-token");
    return navigate("/");
  }
  return (
    <Navbar>
    <NavbarBrand>
      <AcmeLogo />
      <p className="font-bold text-inherit">ACME</p>
    </NavbarBrand>

    <NavbarContent className="hidden sm:flex gap-4" justify="center">
      <NavbarItem>
        <Link to="/user/signup" color="foreground">
          Home
        </Link>
      </NavbarItem>
      <NavbarItem isActive>
        <Link to="/user/signup" aria-current="page" color="secondary">
          Create Account
        </Link>
      </NavbarItem>
      <NavbarItem>
        <Link to= "/user/login" color="foreground">
          Login
        </Link>
        
      </NavbarItem>
      <NavbarItem>
        <Button onClick = {logout} href= "/user/login" color="foreground">
          Logout
        </Button>
        
      </NavbarItem>
      <NavbarItem>
        <Link to="/user/followers" color="foreground">
          Followers
        </Link>
      </NavbarItem>
    </NavbarContent>

    <NavbarContent as="div" justify="end">
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            color="secondary"
            name="Jason Hughes"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">zoey@example.com</p>
          </DropdownItem>
          <DropdownItem onClick={handleProfile} key="settings">My Profile</DropdownItem>
          <DropdownItem key="team_settings">Team Settings</DropdownItem>
          <DropdownItem key="analytics">Analytics</DropdownItem>
          <DropdownItem key="system">System</DropdownItem>
          <DropdownItem key="configurations">Configurations</DropdownItem>
          <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
          <DropdownItem key="logout" color="danger">
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </NavbarContent>
  </Navbar>
  )
}

export default NavbarAll
