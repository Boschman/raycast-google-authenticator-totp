import fs from "fs";
import { homedir } from "os";
import { TOTP } from "totp-generator";

type Item = { name: string; secret: string };

const configFile = homedir() + "/.gauth";

const getItems = (): Item[] => {
  const items = [];
  const data = fs.readFileSync(configFile, "utf8");

  const regexp = /\[(.*)]\nsecret=(.*)/g;

  for (const match of data.matchAll(regexp)) {
    const [, name, secret] = match;
    items.push({
      name,
      secret,
    });
  }
  return items;
};

const getCode = async (secret: string): Promise<string> => {
  const { otp } = await TOTP.generate(secret);
  return otp;
};

export { getItems, getCode };

export type { Item };
