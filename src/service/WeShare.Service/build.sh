#!/bin/sh
dotnet publish -c Release -o publish -r linux-x64
docker build -t daxnet/weshare-svc:$1 -t daxnet/weshare-svc:latest .
docker push daxnet/weshare-svc:$1
docker push daxnet/weshare-svc:latest

