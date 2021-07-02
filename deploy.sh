#!/bin/bash

login_docker(){
    az acr login --resource-group=HK-eforms-aks-infra --name=eacloudacr
}
build_app(){
   git pull
   mvn clean package -DskipTests
}

build_docker(){
   docker build . -t eacloudacr.azurecr.io/eacloud/azfaas-client
   docker tag eacloudacr.azurecr.io/eacloud/azfaas-client eacloudacr.azurecr.io/eacloud/azfaas-client:0.0.2
   docker push eacloudacr.azurecr.io/eacloud/azfaas-client
}

login_docker
build_app
build_docker

#mvn azure-webapp:deploy
