/* eslint-disable @next/next/no-img-element */
import { Disclosure, Menu, Transition } from "@headlessui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { HiMenu, HiX } from "react-icons/hi";
import { useRecoilValue } from "recoil";
import { auth } from "../../lib/firebase";
import { accountState } from "../../recoil/account";
import { signOutUser } from "../../services/user";

const navigation = [{ name: "Jobs", href: "/jobs", current: false }];

const userNavigation = [
  { name: "Your Profile", href: "" },
  { name: "Sign Out", href: "#" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const account = useRecoilValue(accountState);

  return (
    <Disclosure as="nav" className="bg-blue-900">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-fit py-4">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <HiX className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <HiMenu className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/images/minimal-logo.svg"
                    alt="Workflow"
                  />
                  <img
                    className="hidden lg:block h-12 w-auto"
                    src="/images/minimal-logo.svg"
                    alt="Workflow"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "text-white underline"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "px-3 py-2 rounded-md text-lg font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  {user && (
                    <Menu as="div" className="ml-3 relative">
                      <div>
                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                          <span className="sr-only">Open user menu</span>
                          <img
                            className="h-8 w-8 rounded-full"
                            src={user.photoURL ?? "/images/profile.png"}
                            alt=""
                          />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <div>
                                  {item.name === "Sign Out" ? (
                                    <a
                                      className={classNames(
                                        active ? "bg-gray-100" : "",
                                        "cursor-pointer  block px-4 py-2 text-sm text-gray-700"
                                      )}
                                      onClick={signOutUser}
                                    >
                                      {item.name}
                                    </a>
                                  ) : (
                                    <Link
                                      href={
                                        account.type === "client"
                                          ? "/client-profile"
                                          : "/freelancer-profile"
                                      }
                                      passHref
                                    >
                                      <a
                                        className={classNames(
                                          active ? "bg-gray-100" : "",
                                          "block px-4 py-2 text-sm text-gray-700"
                                        )}
                                      >
                                        {item.name}
                                      </a>
                                    </Link>
                                  )}
                                </div>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  )}
                  {!user && (
                    <button
                      className="text-base font-medium text-white"
                      onClick={() => router.replace("/login")}
                    >
                      Sign In
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white",
                    "block px-3 py-2 rounded-md text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {user && (
              <div className="pt-4 pb-3 border-t border-gray-700">
                <div className="flex items-center px-5 sm:px-6">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={user.photoURL ?? "/images/profile.png"}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">
                      {user.displayName}
                    </div>
                    <div className="text-sm font-medium text-gray-400">
                      {user.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 px-2 space-y-1 sm:px-3">
                  {userNavigation.map((item) =>
                    item.name === "Sign Out" ? (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 "
                        onClick={signOutUser}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ) : (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={
                          account.type === "client"
                            ? "/client-profile"
                            : "/freelancer-profile"
                        }
                        className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                      >
                        {item.name}
                      </Disclosure.Button>
                    )
                  )}
                </div>
              </div>
            )}
            {!user && (
              <Disclosure.Button
                as="a"
                className="block mx-2 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 sm:mx-3 px-3"
                onClick={() => router.replace("/login")}
              >
                Sign In
              </Disclosure.Button>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
