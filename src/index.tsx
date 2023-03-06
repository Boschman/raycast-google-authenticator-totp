import { Action, ActionPanel, closeMainWindow, Cache, List, popToRoot, showToast, Toast } from "@raycast/api";
import { getItems, getCode, Item } from "./totp";

const getAllItems = () => {
  try {
    return getItems();
  } catch (e: unknown) {
    const err = e as Error;
    showToast({
      style: Toast.Style.Failure,
      title: "Error getting items",
      message: err.message,
    });
    return [];
  }
};

const cache = new Cache();
cache.set("items", JSON.stringify(getAllItems()));

export default function Command() {
  const cached = cache.get("items");
  const items: Item[] = cached ? JSON.parse(cached) : [];

  return (
    <List searchBarPlaceholder="Open iTerm Profile">
      {items?.map((item, index) => (
        <List.Item
          icon="2fa-icon.png"
          title={item.name}
          key={index}
          actions={
            <ActionPanel>
              <Action.Paste
                title={'Get code for "' + item.name + '"'}
                content={getCode(index)}
                onPaste={() => {
                  closeMainWindow();
                  popToRoot();
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
