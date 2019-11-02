# Filename: Dockerfile
# Copyright (c) 2017 Secretmapper <https://github.com/Secretmapper>
# 
# Last-Updated: 04/10/2017 Monday 09:46:13
# Description: Sleek, modern web interface for Transmission, Dockerized version.

FROM alpine:latest
MAINTAINER Clement Trösa <iomonad@riseup.net>

ENV PORT 9091

RUN apk add --update \
    lighttpd wget unzip \
      && rm -rf /var/cache/apk/*

ADD .docker/lighttpd.conf /etc/lighttpd/lighttpd.conf
RUN adduser www-data -G www-data -H -s /bin/false -D


RUN cd /tmp ; wget --no-check-certificate https://github.com/Secretmapper/combustion/archive/release.zip ; unzip release.zip ; rm *.zip ; mv combustion-release/* /var/www

EXPOSE 80
ENTRYPOINT ["lighttpd", "-D", "-f", "/etc/lighttpd/lighttpd.conf"]
