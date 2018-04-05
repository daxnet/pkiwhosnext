FROM microsoft/aspnetcore:2.0.6
RUN mkdir /app
WORKDIR /app
COPY publish/ ./
EXPOSE 9023
CMD ["dotnet", "WeShare.Service.dll"]
