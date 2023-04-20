import { motion } from "framer-motion";
import { useEffect } from "react";
import { GrClose, GrFormDown } from "react-icons/gr";
import Button from "../Button/Button";
import ASSETS from "src/assets";
import Search from "./Search/Search";
import IconButton from "../IconButton/IconButton";
import { useAppSelector } from "src/utils/hooks";
import { FiBell, FiMenu } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useToggle } from "@react-hookz/web";
import styles from "./styles.module.css";
import "@szhsin/react-menu/dist/index.css";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import Avatar from "src/features/Profiles/Components/Avatar/Avatar";
import { createRoute, PAGES_ROUTES } from "src/utils/routing";

const navBtnVariant = {
  menuHide: { rotate: 90, opacity: 0 },
  menuShow: { rotate: 0, opacity: 1 },
  closeHide: { rotate: -90, opacity: 0 },
  closeShow: { rotate: 0, opacity: 1 },
};

const navListVariants = {
  init: { x: 0 },
  show: { x: "-100%" },
  hide: { x: 0 },
};

const categoriesListVariants = {
  open: {
    opacity: 1,
    y: 0,
    display: "block",
    transition: { ease: "easeOut" },
  },
  closed: {
    opacity: 0,
    y: -50,
    transition: {
      ease: "easeIn",
      duration: 0.2,
    },
    transitionEnd: {
      display: "none",
    },
  },
};

const listArrowVariants = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};

interface Props {
  renderNotificationsList: () => JSX.Element;
}

export default function NavMobile({ renderNotificationsList }: Props) {
  const [drawerOpen, toggleDrawerOpen] = useToggle(false);
  const [eventsOpen, toggleEventsOpen] = useToggle(false);

  const { curUser } = useAppSelector((state) => ({
    curUser: state.user.me,
  }));

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash !== "#nav-menu") toggleDrawerOpen(false);
    if (location.hash === "#nav-menu" && !drawerOpen)
      window.history.replaceState("", document.title, window.location.pathname);
  }, [drawerOpen, location.hash, toggleDrawerOpen]);

  useEffect(() => {
    if (drawerOpen) document.body.style.overflowY = "hidden";
    else {
      document.body.style.overflowY = "initial";
    }
  }, [drawerOpen]);

  const onToggleDrawer = (value?: boolean) => {
    toggleDrawerOpen((v) => value ?? !v);
    if (value === false || (!value && drawerOpen))
      window.history.length === 0
        ? navigate(window.location.pathname, { replace: true })
        : navigate(-1);
    else {
      navigate("#nav-menu");
    }
  };

  return (
    <div className={`${styles.navMobile}`}>
      <nav className={`bg-white h-[67px] w-full py-16`}>
        <div className="content-container">
          <div className="flex justify-between items-center">
            <div className="flex-1 flex content-start">
              <button
                className="rounded-full border-0 text-2xl w-[42px] h-[42px] hover:bg-gray-200 flex flex-col justify-center items-center self-center !p-0"
                onClick={() => onToggleDrawer()}
              >
                {!drawerOpen ? (
                  <motion.div
                    key={drawerOpen ? 1 : 0}
                    variants={navBtnVariant}
                    initial="menuHide"
                    animate="menuShow"
                  >
                    <FiMenu />
                  </motion.div>
                ) : (
                  <motion.div
                    key={drawerOpen ? 1 : 0}
                    variants={navBtnVariant}
                    initial="closeHide"
                    animate="closeShow"
                  >
                    <GrClose aria-label="close navigation" />
                  </motion.div>
                )}
              </button>
            </div>

            <div className="flex-[2] flex justify-center">
              <Link to="/">
                <img
                  className="max-h-32"
                  src={ASSETS.Logo}
                  alt="Bolt fun logo"
                />
              </Link>
            </div>

            <div className="flex-1 shrink-0 flex gap-4 justify-end">
              <Menu
                align="end"
                arrow
                menuClassName="!p-8 !rounded-12 !w-[min(80vw,375px)] position"
                viewScroll="initial"
                menuButton={
                  <IconButton className="text-gray-900 hover:text-orange-300">
                    <FiBell />
                  </IconButton>
                }
              >
                {renderNotificationsList()}
              </Menu>
              {curUser !== undefined &&
                (curUser ? (
                  <Menu
                    align="end"
                    offsetY={4}
                    menuClassName="!p-8 !rounded-12"
                    menuButton={
                      <MenuButton>
                        <Avatar src={curUser.avatar} width={32} />{" "}
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
                  <Link
                    to={PAGES_ROUTES.auth.login}
                    state={{ from: window.location.pathname }}
                  >
                    <Button
                      size="sm"
                      color="none"
                      className="!text-body5 whitespace-nowrap"
                    >
                      Connect ⚡
                    </Button>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </nav>

      <div className="fixed left-0 top-[67px] pointer-events-none z-[2010] w-full min-h-[calc(100vh-67px)]">
        {drawerOpen && (
          <button
            onClick={() => onToggleDrawer()}
            tabIndex={-1}
            className="pointer-events-auto absolute left-0 w-full min-h-full bg-gray-400 opacity-20"
          ></button>
        )}
        <motion.div
          className="pointer-events-auto bg-white w-full sm:max-w-[400px] overflow-y-scroll absolute left-full  border px-16 flex flex-col"
          variants={navListVariants}
          style={{ height: "calc(100vh - 67px)" }}
          animate={drawerOpen ? "show" : "hide"}
        >
          <div className="flex flex-col gap-16 py-16">
            <Search onResultClick={() => onToggleDrawer(false)} />
          </div>
          <ul className="flex flex-col py-16 gap-16 border-t">
            <li className="relative">
              <Link
                to={"/feed"}
                className="text-body4 py-8 px-4 w-full inline-block font-bold hover:text-primary-600 active:bg-gray-50"
              >
                Feed
              </Link>
            </li>
            <li className="relative">
              <Link
                to={"/projects"}
                className="text-body4 py-8 px-4 w-full inline-block font-bold hover:text-primary-600 active:bg-gray-50"
              >
                Projects
              </Link>
            </li>
            <li className="relative">
              <Link
                to={createRoute({ type: "hangout" })}
                className="text-body4 py-8 px-4 w-full inline-block font-bold hover:text-primary-600 active:bg-gray-50"
              >
                Hangout{" "}
                <span className="font-medium text-xs leading-5 rounded text-red-600 bg-red-400/10 px-2 py-0.1">
                  Live
                </span>
              </Link>
            </li>
            <li>
              <button
                className="text-body4 py-8 px-4 w-full inline-block font-bold hover:text-primary-600 active:bg-gray-50 w-full flex justify-between"
                onClick={() => toggleEventsOpen()}
              >
                Events
                <motion.span
                  variants={listArrowVariants}
                  initial={"closed"}
                  animate={eventsOpen ? "open" : "closed"}
                  className="ml-auto"
                >
                  <GrFormDown className=" text-gray-400" />
                </motion.span>
              </button>
              {
                <motion.div
                  variants={categoriesListVariants}
                  initial={"closed"}
                  animate={eventsOpen ? "open" : "closed"}
                >
                  <div className="flex flex-col gap-24 pt-16">
                    <Link
                      to="/tournaments/2"
                      className="font-medium flex gap-16 !rounded-12 p-8 group bg-pink-100 hover:bg-purple-100 border-2 border-pink-200 hover:border-purple-200"
                    >
                      <div className="shrink-0 bg-white border border-pink-200 group-hover:border-purple-200 w-48 h-48 rounded-full flex justify-center items-center">
                        <span className="text-body2 shrink-0">🦩</span>
                      </div>
                      <div>
                        <p className="text-body4 text-black font-medium">
                          Nostr Hack & Design{" "}
                          <span className="text-red-500 text-body6 bg-red-200 p-4 px-8 rounded-24 font-bold">
                            Hot! 🔥
                          </span>
                        </p>
                        <p className="text-body5 font-normal text-gray-600 mt-4">
                          Design & Build cool social things!
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/hackathons"
                      className="font-medium flex gap-16 !rounded-12"
                    >
                      <div className="shrink-0 bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                        <span className="text-body2 shrink-0">👩‍💻</span>
                      </div>
                      <div>
                        <p className="text-body4 text-black font-medium">
                          Upcoming Hackathons
                        </p>
                        <p className="text-body5 font-normal text-gray-600 mt-4">
                          Take part in hackathons & tournaments
                        </p>
                      </div>
                    </Link>
                    <Link
                      to="/tournaments/1"
                      className="font-medium flex gap-16 !rounded-12 "
                    >
                      <div className="shrink-0 bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                        <span className="text-body2 shrink-0">🏆</span>
                      </div>
                      <div>
                        <p className="text-body4 text-black font-medium">
                          #LegendsOfLightning
                        </p>
                        <p className="text-body5 font-normal text-gray-600 mt-4">
                          In 2022 we put on the largest
                          <br /> bitcoin hackathon.
                        </p>
                      </div>
                    </Link>
                    <a
                      href="mailto:team@peakshift.com"
                      className="font-medium flex gap-16 !rounded-12"
                    >
                      <div className="shrink-0 bg-white border border-gray-100 w-48 h-48 rounded-full flex justify-center items-center">
                        <span className="text-body2 shrink-0">💬</span>
                      </div>
                      <div>
                        <p className="text-body4 text-black font-medium">
                          Host a Hackathon
                        </p>
                        <p className="text-body5 font-normal text-gray-600 mt-4">
                          Need some help setting up your own?
                        </p>
                      </div>
                    </a>
                  </div>
                </motion.div>
              }
            </li>
            <li className="relative">
              <a
                href={"https://bolt.fun/guide/"}
                target="_blank"
                rel="noreferrer"
                className="text-body4 py-8 px-4 w-full inline-block font-bold hover:text-primary-600 active:bg-gray-50"
              >
                Guide
              </a>
            </li>
            <li className="relative">
              <Link
                to={"/donate"}
                className="text-body4 py-8 px-4 w-full inline-block font-bold hover:text-primary-600 active:bg-gray-50"
              >
                Donate
              </Link>
            </li>
            {curUser && (
              <li className="relative">
                <Link
                  to={"/logout"}
                  className="text-body4 py-8 px-4 w-full inline-block font-bold hover:text-primary-600 active:bg-gray-50"
                >
                  Logout 👋
                </Link>
              </li>
            )}
          </ul>
          <ul className="px-16 py-16 pb-32 flex flex-wrap gap-y-12  border-t pt-32 mt-auto">
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">About Us</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">Support</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">Press</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">Contacts</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">Careers</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">Sitemap</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">Legal</a>
            </li>
            <li className="text-body4 text-gray-500 hover:text-gray-700 w-1/2">
              <a href="/#">Cookies Settings</a>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
