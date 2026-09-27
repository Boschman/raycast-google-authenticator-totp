import { Action, ActionPanel, Clipboard, closeMainWindow, Icon, List, popToRoot, showToast, Toast } from "@raycast/api";
import { usePromise } from "@raycast/utils";
import { getItems, editItems, getCode, Item } from "./totp";

const closeWindow = async () => {
  await closeMainWindow();
  await popToRoot();
};

// Codes expire, so generate on demand rather than at render time
const pasteCode = async (item: Item) => {
  try {
    await Clipboard.paste(await getCode(item.secret));
    await closeWindow();
  } catch (e: unknown) {
    const err = e as Error;
    await showToast({
      style: Toast.Style.Failure,
      title: "Error generating code",
      message: err.message,
    });
  }
};

const openEditor = async () => {
  editItems();
  await closeWindow();
};

export default function Command() {
  const { data: items, isLoading } = usePromise(getItems, [], {
    failureToastOptions: { title: "Error getting items" },
  });

  return (
    <List isLoading={isLoading} searchBarPlaceholder="Paste One-Time Password">
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
      <List.Section>
        <List.Item
          icon={Icon.Pencil}
          title="Edit"
          subtitle="Open ~/.gauth in Sublime Text"
          actions={
            <ActionPanel>
              <Action title="Edit in Sublime Text" icon={Icon.Pencil} onAction={openEditor} />
            </ActionPanel>
          }
        />
      </List.Section>
    </List>
  );
}
