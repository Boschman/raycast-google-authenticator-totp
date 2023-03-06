import fs from "fs";
import { homedir } from "os";
import totp from "totp-generator";

type Item = { name: string; secret: string };

const configFile = homedir + "/.gauth";

const getItems = (): Item[] => {
  const items = [];
  const data = fs.readFileSync(configFile, "utf8");

  const regexp = /\[(.*)]\nsecret=(.*)/g;

  for (const match of data.matchAll(regexp)) {
    const [full, name, secret] = match;
    items.push({
      name,
      secret,
    });
  }
  return items;
};

const getCode = (itemId: number) => {
  const items = getItems();
  return totp(items[itemId].secret);
};

export { getItems, getCode };

export type { Item };
