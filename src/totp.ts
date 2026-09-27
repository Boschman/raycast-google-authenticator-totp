import { execFile, spawn } from "child_process";
import { homedir } from "os";
import { promisify } from "util";
import { TOTP } from "totp-generator";

type Item = { name: string; secret: string };

const configFile = homedir() + "/.gauth";
const sublime = "/Applications/Sublime Text.app/Contents/SharedSupport/bin/subl";

// Raycast's PATH lacks Homebrew, and the age key lives in the Keychain
const sopsEnv = {
  ...process.env,
  PATH: `/opt/homebrew/bin:/usr/local/bin:${process.env.PATH}`,
  SOPS_AGE_KEY_CMD: "security find-generic-password -s google-authenticator-totp -a age-key -w",
};

const getItems = async (): Promise<Item[]> => {
  const { stdout: data } = await promisify(execFile)("sops", ["decrypt", configFile], { env: sopsEnv });

  const regexp = /\[(.*)]\nsecret=(.*)/g;

  return Array.from(data.matchAll(regexp), ([, name, secret]) => ({ name, secret }));
};

// Detached so sops can re-encrypt after Sublime closes, even if Raycast unloads the command
const editItems = () => {
  spawn("sops", ["edit", configFile], {
    env: { ...sopsEnv, SOPS_EDITOR: `"${sublime}" --wait` },
    detached: true,
    stdio: "ignore",
  }).unref();
};

const getCode = async (secret: string): Promise<string> => {
  const { otp } = await TOTP.generate(secret);
  return otp;
};

export { getItems, editItems, getCode };

export type { Item };
