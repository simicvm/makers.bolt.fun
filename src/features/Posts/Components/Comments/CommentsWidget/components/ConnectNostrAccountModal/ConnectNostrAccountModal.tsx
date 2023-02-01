import { motion } from "framer-motion";
import {
  ModalCard,
  modalCardVariants,
} from "src/Components/Modals/ModalsContainer/ModalsContainer";
import { IoClose } from "react-icons/io5";
import Button from "src/Components/Button/Button";
import { useAppDispatch } from "src/utils/hooks";
import { useState } from "react";
import { NotificationsService } from "src/services";
import { useMyNostrKeysQuery } from "src/graphql";
import CopyToClipboard from "src/Components/CopyToClipboard/CopyToClipboard";
import { utils as secpUtils } from "@noble/secp256k1";
import { getPublicKey, nip19 } from "nostr-tools";
import Skeleton from "react-loading-skeleton";
import { extractErrorMessage } from "src/utils/helperFunctions";
import { PayloadAction } from "@reduxjs/toolkit";

export type NostrAccountConnection =
  | {
      type: "nostr-ext";
      pubkey: string;
    }
  | {
      type: "generated-keys";
      pubkey: string;
    }
  | {
      type: "inputted-keys";
      pubkey: string;
      prvkey: string;
    };

interface Props extends ModalCard {
  callbackAction: PayloadAction<{}>;
}

export default function ConnectNostrAccountModal({
  callbackAction,
  onClose,
  direction,
}: Props) {
  const myGeneratedKeysQuery = useMyNostrKeysQuery();

  const dispatch = useAppDispatch();
  const [prvkeyInput, setPrvkeyInput] = useState("");

  const [activeTab, setActiveTab] =
    useState<"extension" | "generated" | "inputted">("extension");

  const connect = async () => {
    let connectionObject: NostrAccountConnection;
    try {
      if (activeTab === "extension")
        connectionObject = await connectToNostrExtension();
      else if (activeTab === "generated")
        connectionObject = await connectGeneratedKeys();
      else if (activeTab === "inputted")
        connectionObject = await connectInputtedKey();
      else throw new Error("Invalid tab");
      localStorage.setItem(
        "nostr-connection",
        JSON.stringify(connectionObject)
      );
      const action = Object.assign({}, callbackAction);
      action.payload = {};
      dispatch(action);
      onClose?.();
    } catch (error) {
      const msg = extractErrorMessage(error);
      if (msg) NotificationsService.error(msg);
      else console.log(error);
    }
  };

  return (
    <motion.div
      custom={direction}
      variants={modalCardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="modal-card !overflow-auto max-w-[522px] rounded-xl relative"
    >
      <div className="p-24">
        <IoClose
          className="absolute text-body2 top-24 right-24 hover:cursor-pointer"
          onClick={onClose}
        />
        <h2 className="text-h5 font-bold text-center">
          Connect your Nostr Account
        </h2>
      </div>
      <hr className="bg-gray-200" />
      <div className="flex flex-col gap-24 p-24">
        <p className="text-body4 text-gray-600">
          Choose how you wish to connect your account:
        </p>

        <ul className="flex flex-wrap rounded border overflow-hidden ">
          <li className="grow ">
            <button
              className={`py-12 text-body5 md:text-body4 w-full text-center hover:bg-primary-25 active:text-primary-400 transition-shadow ${
                activeTab === "extension" &&
                "bg-primary-50 shadow-inner text-primary-600"
              }`}
              onClick={() => setActiveTab("extension")}
            >
              Extension
            </button>
          </li>
          <li className="grow border-l">
            <button
              className={`py-12 text-body5 md:text-body4 w-full text-center hover:bg-primary-25 active:text-primary-400 transition-shadow ${
                activeTab === "generated" &&
                "bg-primary-50 shadow-inner text-primary-600"
              }`}
              onClick={() => setActiveTab("generated")}
            >
              Generated Keys
            </button>
          </li>
          <li className="grow border-l">
            <button
              className={`py-12 text-body5 md:text-body4 w-full text-center hover:bg-primary-25 active:text-primary-400 transition-shadow ${
                activeTab === "inputted" &&
                "bg-primary-50 shadow-inner text-primary-600"
              }`}
              onClick={() => setActiveTab("inputted")}
            >
              Enter Manually
            </button>
          </li>
        </ul>

        {activeTab === "extension" && (
          <div className="flex flex-col gap-12">
            <h4 className="text-body3 font-bold text-gray-900">
              Use a Nostr Extension{" "}
              <span className="text-gray-400 text-body4 font-regular">
                (Desktop Only)
              </span>{" "}
            </h4>
            <p className="text-gray-600">
              There are several extension that you can add to your browser which
              will take care of storing your private key & signing your messages
              before publishing them.
              <br />
              <br />
              Extensions that support nostr:{" "}
              <a
                href="https://getalby.com/"
                className="text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                Alby
              </a>
              ,{" "}
              <a
                href="https://github.com/fiatjaf/nos2x"
                className="text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                nos2x
              </a>
              ,{" "}
              <a
                href="https://www.blockcore.net/wallet"
                className="text-blue-500"
                target="_blank"
                rel="noreferrer"
              >
                Blockcore
              </a>
            </p>

            <Button
              fullWidth
              color="primary"
              className="mt-8"
              onClick={connect}
            >
              Connect to My Extension
            </Button>
          </div>
        )}
        {activeTab === "generated" && (
          <div className="flex flex-col gap-12">
            <h4 className="text-body3 font-bold text-gray-900">
              Generated by Bolt.Fun
            </h4>
            <p className="text-gray-600">
              We generate a pair of private/public keys for you by default &
              store them in our Database. If you don't really care about storing
              your keys yourself, & just want the easiest way, go with this
              option.
              <br />
              <br />
              You can see your generated keys here in case you want to copy them
              & use them on other nostr clients:
            </p>
            {myGeneratedKeysQuery.loading && (
              <div className="flex flex-col gap-12">
                <p className="text-body5 mb-0">
                  <Skeleton width="24ch" />
                </p>
                <Skeleton width="100%" height={40} />
                <p className="text-body5 mb-0">
                  <Skeleton width="24ch" />
                </p>
                <Skeleton width="100%" height={40} />
              </div>
            )}
            {!myGeneratedKeysQuery.loading && myGeneratedKeysQuery.data?.me && (
              <div className="flex flex-col gap-8">
                <div>
                  <p className="text-body5 font-bold">Your Nostr Private Key</p>
                  <div className="input-wrapper mt-8 relative">
                    <input
                      type={"password"}
                      className="input-text"
                      defaultValue={
                        myGeneratedKeysQuery.data?.me.nostr_prv_key!
                      }
                      readOnly
                    />

                    <CopyToClipboard
                      text={myGeneratedKeysQuery.data?.me.nostr_prv_key!}
                    />
                  </div>
                </div>
                <div>
                  <p className="text-body5 font-bold">Your Nostr Public Key</p>
                  <div className="input-wrapper mt-8 relative">
                    <input
                      type="text"
                      className="input-text"
                      defaultValue={
                        myGeneratedKeysQuery.data?.me.nostr_pub_key!!
                      }
                      readOnly
                    />
                    <CopyToClipboard
                      text={myGeneratedKeysQuery.data?.me.nostr_pub_key! ?? ""}
                    />
                  </div>
                </div>
              </div>
            )}
            <Button
              disabled={!myGeneratedKeysQuery.data?.me?.nostr_prv_key}
              fullWidth
              color="primary"
              className="mt-8"
              onClick={connect}
            >
              Continue
            </Button>
          </div>
        )}

        {activeTab === "inputted" && (
          <div className="flex flex-col gap-12">
            <h4 className="text-body3 font-bold text-gray-900">
              Input your own keys
            </h4>
            <p className="text-gray-600">
              You enter your <span className="font-bold">private key</span> & we
              keep it in your own browser's{" "}
              <span className="font-bold">local storage</span>.
              <br />
              <br />
              This option is for the cases where you want to comment from your
              mobile browser where you can't use an extension, but you still
              want to use your own keys, not ours.
              <br />
              <br />
              Just please keep in mind that storing things in localStorage isn't
              that highly secure.
              <br />
              <br />
              We are only providing this option for now until a better
              alternative appear for mobile browsers.
            </p>
            <div>
              <p className="text-body5 font-bold">Your Private Key</p>
              <div className="input-wrapper mt-8 relative">
                <input
                  type={"text"}
                  className="input-text"
                  value={prvkeyInput}
                  onChange={(e) => setPrvkeyInput(e.target.value)}
                />
              </div>
            </div>
            <Button
              fullWidth
              color="primary"
              disabled={!isValidPrivateKey(prvkeyInput)}
              className="mt-8"
              onClick={connect}
            >
              {isValidPrivateKey(prvkeyInput)
                ? "Continue"
                : "Enter a valid private key"}
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );

  async function connectToNostrExtension() {
    if (window.nostr) {
      try {
        const pubkey = await window.nostr.getPublicKey();
        return {
          type: "nostr-ext",
          pubkey,
        } as NostrAccountConnection;
      } catch (err) {
        throw new Error("Permission to get public key rejected");
      }
    } else {
      throw new Error(
        "Couldn't find a nostr supporting extension in your browser"
      );
    }
  }

  function connectInputtedKey() {
    if (!isValidPrivateKey(prvkeyInput))
      throw new Error("You need to provide a valid private key");

    const prvkeyHex = prvkeyInput.startsWith("nsec")
      ? (nip19.decode(prvkeyInput).data as string)
      : prvkeyInput;

    const pubkey = getPublicKey(prvkeyHex);
    return {
      type: "inputted-keys",
      pubkey,
      prvkey: prvkeyHex,
    } as NostrAccountConnection;
  }

  function connectGeneratedKeys() {
    const prvKey = myGeneratedKeysQuery.data?.me?.nostr_prv_key;
    if (!prvKey) throw new Error("Private key not provided");

    const pubkey = getPublicKey(prvKey);
    return {
      type: "generated-keys",
      pubkey,
    } as NostrAccountConnection;
  }
}

function isValidPrivateKey(prvKey: string | null | undefined) {
  if (!prvKey) return false;
  const isValidHexKey = secpUtils.isValidPrivateKey(prvKey);
  const isValidBech32Key =
    prvKey.startsWith("nsec") &&
    secpUtils.isValidPrivateKey(nip19.decode(prvKey).data as string);

  // if (isValidBech32Key) console.log(getPublicKey(prvKey));

  return isValidHexKey || isValidBech32Key;
}
