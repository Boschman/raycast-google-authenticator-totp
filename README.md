# Google Authenticator (TOTP) Extension for Raycast

This extension allows you to easily generate two-factor authentication codes (2fa) for Google Authenticator using the Time-Based One-Time Password protocol (TOTP) in [Raycast](https://www.raycast.com/).

### Usage
To use this extension, follow these steps:
1. Install the extension.
1. Create a configuration text file in your home directory: `~/.gauth`.
1. Add your profiles to the configuration file using this example as a guide:
    ```
   [GitHub]
   secret=QPFTXRRX5NKTJSUO
   
   [DigitalOcean]
   secret=5ATLLTK2UBJSZTMX
   ```
   
   Replace the value after `secret=` with the secret code provided to you.
1. Open the extension in Raycast to see the list of your profiles.
1. Select the profile you want to use.
1. The time-based 2fa code will be generated and pasted into your active window.

**Beware that `~/.gauth` contains your secrets, so make sure unauthorized people and systems can't access it.**

### License
This extension is licensed under the [MIT License](https://opensource.org/license/mit/).\
© 2023 Jeroen Boschman.

The [icon file](https://commons.wikimedia.org/wiki/File:Authenticator_App_by_2Stable.svg) is created by [Ariesikel](https://commons.wikimedia.org/wiki/User:Ariesikel) and licensed under the [Creative Commons Attribution-Share Alike 4.0 International license](https://creativecommons.org/licenses/by-sa/4.0/deed.en). The background was removed from the icon.

### Created by
Jeroen Boschman
- [@WebJeroen@phpc.social](https://phpc.social/@WebJeroen) on Mastodon
- [Boschman](https://github.com/Boschman/) on GitHub
