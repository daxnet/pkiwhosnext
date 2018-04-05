#
# Build Script
# Copyright (C) by daxnet, all rights reserved.
#

$workspace = ($PSScriptRoot).ToString()
if (Test-Path -Path $workspace/publish) {
	Remove-Item -Recurse -Force $workspace/publish
}
dotnet restore -s https://api.nuget.org/v3/index.json -s https://www.myget.org/F/daxnet-utils/api/v3/index.json -s https://www.myget.org/F/daxnet-apworks-pre/api/v3/index.json
dotnet publish -c Release -o publish

