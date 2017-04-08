# Combustion

## Introduction

Combustion is a sleek, modern web interface for [Transmission](https://transmissionbt.com)

## Easy installation

Latest Releases at: `https://github.com/Secretmapper/combustion/archive/release.zip`

If you need instructions to setup the theme, run the following commands. Note that it installs the theme on `~/.combustion`, edit the path if you want it placed elsewhere

```
Prepare the paths
mkdir ~/.combustion && cd ~/.combustion

Download and unzip the new theme into path ~/.combustion:
rm release.zip && wget https://github.com/Secretmapper/combustion/archive/release.zip && unzip release.zip;

Edit environment with "vi ~/.profile" and add/replace as below:
export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release"

Edit crontab with "crontab -e" and replace as below:
@reboot export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release" && /usr/local/bin/transmission-daemon

Stop then restart the daemon:
export TRANSMISSION_WEB_HOME="$HOME/.combustion/combustion-release" && transmission-stop && transmission-daemon;
```

Alternatively, 

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
