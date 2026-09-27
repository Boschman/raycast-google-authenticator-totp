# Google Authenticator (TOTP) Extension for Raycast

This extension allows you to easily generate two-factor authentication codes (2fa) for Google Authenticator using the Time-Based One-Time Password protocol (TOTP) in [Raycast](https://www.raycast.com/).

### Usage
To use this extension, follow these steps:
1. Install the extension, [sops](https://github.com/getsops/sops), [age](https://github.com/FiloSottile/age) and [Sublime Text](https://www.sublimetext.com/): `brew install sops age && brew install --cask sublime-text`.
1. Generate an age key and store it in the macOS Keychain, then print its public key:
    ```
   printf 'add-generic-password -s google-authenticator-totp -a age-key -w %s\n' "$(age-keygen 2>/dev/null | grep '^AGE-SECRET-KEY-')" | security -i
   security find-generic-password -s google-authenticator-totp -a age-key -w | age-keygen -y
   ```
1. Create an encrypted configuration file in your home directory, using the public key from the previous step:
    ```
   echo '[Example]' | sops encrypt --age <public key> --input-type binary --output-type binary /dev/stdin > ~/.gauth
   ```
1. Open the extension in Raycast and select "Edit" at the bottom of the list. Add your profiles using this example as a guide:
    ```
   [GitHub]
   secret=QPFTXRRX5NKTJSUO
   
   [DigitalOcean]
   secret=5ATLLTK2UBJSZTMX
   ```
   
   Replace the value after `secret=` with the secret code provided to you.
   
   Save and close the tab to encrypt the file again.
1. Open the extension in Raycast to see the list of your profiles.
1. Select the profile you want to use.
1. The time-based 2fa code will be generated and pasted into your active window.

`~/.gauth` is encrypted with [sops](https://github.com/getsops/sops), and the key is stored in the Keychain. To edit it from a terminal, set `SOPS_AGE_KEY_CMD="security find-generic-password -s google-authenticator-totp -a age-key -w"` and run `sops ~/.gauth`.

**Back up the age key somewhere safe, such as a password manager. Without it, your secrets can't be decrypted.**

### License
This extension is licensed under the [MIT License](https://opensource.org/license/mit/).\
© 2023 Jeroen Boschman.

The [icon file](https://commons.wikimedia.org/wiki/File:Authenticator_App_by_2Stable.svg) is created by [Ariesikel](https://commons.wikimedia.org/wiki/User:Ariesikel) and licensed under the [Creative Commons Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en). The background was removed from the icon.

### Created by
Jeroen Boschman
- [@WebJeroen@phpc.social](https://phpc.social/@WebJeroen) on Mastodon
- [Boschman](https://github.com/Boschman/) on GitHub
