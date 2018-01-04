#!/bin/sh
npm install
ng build -prod
docker build -t daxnet/weshare-web:$1 -t daxnet/weshare-web:latest .
docker push daxnet/weshare-web:$1
docker push daxnet/weshare-web:latest

