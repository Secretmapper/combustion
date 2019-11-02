# Combustion

## Introduction

Combustion is a sleek, modern web interface for [Transmission](https://transmissionbt.com)

## Installation

Latest Releases are available at: `https://github.com/Secretmapper/combustion/archive/release.zip`

### Install by changing Default Web Theme

Simply move the files from the release archives (unzipped) to Transmission's web theme folder:

Linux: `~/.local/share/transmission/web/` (Kodi: `/usr/share/transmission/web/`)

OSX: `/Applications/Transmission.app/Contents/Resources/web/`

### Install through Docker

```bash
sudo docker build -t combustion .
sudo docker run -d --restart=always -p 80:80 --link some-transmission container combustion
```

### Install by pointing transmission to a custom directory

Transmission can allow you to point to a different web theme using the environment variable `TRANSMISSION_WEB_HOME`.

Move the files from the released archives (unzipped) to a folder (i.e. `~/.combustion/combustion-release`). Then point the environment variable to that location (`export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release"`)

Example script when using the transmission daemon:

```
Prepare the paths
mkdir ~/.combustion && cd ~/.combustion

Download and unzip the new theme into path ~/.combustion:
rm -f release.zip && wget https://github.com/Secretmapper/combustion/archive/release.zip && unzip release.zip;

Edit environment with "vi ~/.profile" and add/replace as below:
export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release"

Edit crontab with "crontab -e" and replace as below:
@reboot export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release" && /usr/local/bin/transmission-daemon

Stop then restart the daemon:
export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release" && transmission-stop && transmission-daemon;
```

## Technology

- [Webpack](https://webpack.github.io/)
- [React](https://facebook.github.io/react/)
- [Mobx](https://mobxjs.github.io/mobx/)
- [CSS modules](https://github.com/css-modules/css-modules)

## Roadmap

- Remote setup (Addable server)
- Installable Desktop app (Combustion-Remote)
- Update Notice/OTA Updates
- Service Worker Support
- Standalone server?
- Native Mobile apps?

## Special Thanks

This project is built from the excellent transmission web interface reimplementation [react-transmission](https://github.com/fcsonline/react-transmission)

## License

MIT
