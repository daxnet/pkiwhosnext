#!/bin/sh
cd src/service/WeShare.Service
dotnet publish -o ../../../publish -c Release -r linux-x64
cd ../../..
mkdir publish/wwwroot
cd src/client
npm install
ng build -prod --output-path ../../publish/wwwroot
cd ../../
docker build -t daxnet/weshare:latest -t daxnet/weshare:$1 .
docker push daxnet/weshare:latest
docker push daxnet/weshare:$1
