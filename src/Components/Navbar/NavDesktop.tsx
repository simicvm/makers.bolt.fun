import { BsSearch } from "react-icons/bs";
import { motion } from "framer-motion";
import { useAppSelector, useCurrentSection } from "src/utils/hooks";
import ASSETS from "src/assets";
import Search from "./Search/Search";
import IconButton from "../IconButton/IconButton";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { FiChevronDown, FiPlusCircle } from "react-icons/fi";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { createRoute } from "src/utils/routing";
import Button from "../Button/Button";
import { FaPlusCircle } from "react-icons/fa";

export default function NavDesktop() {
  const [searchOpen, setSearchOpen] = useState(false);

  const { curUser } = useAppSelector((state) => ({
    curUser: state.user.me,
  }));

  const openSearch = () => {
    setSearchOpen(true);
  };

  const currentSection = useCurrentSection();
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b-2 py-16 w-full min-w-full">
      <div className="content-container">
        <div className="flex gap-16 items-center">
          <Link to="/">
            <img
              className="h-40 mr-40 lg:mr-64"
              src={ASSETS.Logo}
              alt="BOLT.FUN"
            />
          </Link>
          <div className="ml-auto">
            <Menu
              align="end"
              offsetY={4}
              menuClassName="!p-8 !rounded-12"
              menuButton={
                <Button color="gray" size="sm">
                  <FiPlusCircle className="text-gray-600 mr-8" />
                  <span className="align-middle">Create</span>{" "}
                </Button>
              }
            >
              <MenuItem
                href={createRoute({
                  type: "write-story",
                })}
                className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
              >
                ✍️ Story
              </MenuItem>
              <MenuItem
                href={createRoute({
                  type: "write-story",
                })}
                className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
              >
                🙋‍♂️ Question
              </MenuItem>
              <MenuItem
                href={createRoute({
                  type: "edit-project",
                })}
                className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
              >
                🚀 Project
              </MenuItem>
            </Menu>
          </div>

          <motion.div
            animate={searchOpen ? { opacity: 0 } : { opacity: 1 }}
            className="flex"
          >
            {/* <Button
                color="primary"
                size="md"
                className="lg:px-40"
                href="https://airtable.com/shr2VkxarNsIFilDz"
                newTab
            >
                Submit App️
            </Button> */}
            {/* {isWalletConnected ?
                            <Button className="ml-16 py-12 px-16 lg:px-20">Connected <AiFillThunderbolt className='inline-block text-thunder transform scale-125' /></Button>
                            : <Button className="ml-16 py-12 px-16 lg:px-20" onClick={onConnectWallet}><AiFillThunderbolt className='inline-block text-thunder transform scale-125' /> Connect Wallet </Button>
                        } */}

            {currentSection === "apps" && (
              <IconButton className="mr-16 self-center" onClick={openSearch}>
                <BsSearch className="scale-125 text-gray-400" />
              </IconButton>
            )}
          </motion.div>
          {curUser !== undefined &&
            (curUser ? (
              <Menu
                align="end"
                offsetY={4}
                menuClassName="!p-8 !rounded-12"
                menuButton={
                  <MenuButton>
                    <Avatar src={curUser.avatar} width={40} />{" "}
                  </MenuButton>
                }
              >
                <MenuItem
                  href={createRoute({
                    type: "profile",
                    id: curUser.id,
                    username: curUser.name,
                  })}
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate(
                      createRoute({
                        type: "profile",
                        id: curUser.id,
                        username: curUser.name,
                      })
                    );
                  }}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  👾 Profile
                </MenuItem>
                <MenuItem
                  href="/edit-profile"
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate("/edit-profile");
                  }}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  ⚙️ Settings
                </MenuItem>
                <MenuItem
                  href="/logout"
                  onClick={(e) => {
                    e.syntheticEvent.preventDefault();
                    navigate("/logout");
                  }}
                  className="!p-16 font-medium flex gap-16 hover:bg-gray-100 !rounded-12"
                >
                  👋 Logout
                </MenuItem>
              </Menu>
            ) : (
              <Button size="sm" color="white" href="/login">
                Sign in 🔑
              </Button>
            ))}
          <div className="relative h-36">
            <motion.div
              initial={{
                opacity: 0,
                y: "0",
              }}
              animate={
                searchOpen
                  ? {
                      opacity: 1,
                      y: "0",
                      transition: { type: "spring", stiffness: 70 },
                    }
                  : {
                      opacity: 0,
                      y: "-120px",
                      transition: {
                        ease: "easeIn",
                      },
                    }
              }
              className="absolute top-0 right-0 flex items-center h-full"
            >
              <Search
                width={326}
                isOpen={searchOpen}
                onClose={() => setSearchOpen(false)}
                onResultClick={() => setSearchOpen(false)}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </nav>
  );
}
