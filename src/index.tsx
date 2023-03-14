import { Action, ActionPanel, closeMainWindow, List, popToRoot, showToast, Toast } from "@raycast/api";
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

export default function Command() {
  const items: Item[] = getAllItems();

  return (
    <List searchBarPlaceholder="Paste One-Time Password">
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
