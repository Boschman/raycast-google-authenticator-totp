import { Action, ActionPanel, Clipboard, closeMainWindow, Icon, List, popToRoot, showToast, Toast } from "@raycast/api";
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

// Codes expire, so generate on demand rather than at render time
const pasteCode = async (item: Item) => {
  try {
    await Clipboard.paste(await getCode(item.secret));
    await closeMainWindow();
    await popToRoot();
  } catch (e: unknown) {
    const err = e as Error;
    await showToast({
      style: Toast.Style.Failure,
      title: "Error generating code",
      message: err.message,
    });
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
              <Action
                title={'Get code for "' + item.name + '"'}
                icon={Icon.Clipboard}
                onAction={() => pasteCode(item)}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
