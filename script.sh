#!/bin/bash
DOCKER_IMAGE_NAME="q-election-executive"
DOCKER_TAG=$(git symbolic-ref --short -q HEAD)
DOCKER_TAG="feat-image-upload"
echo "DOCKER TAG is '$DOCKER_TAG'"
read -p "docker username:" DOCKER_USERNAME
read -s -p "docker password: " DOCKER_PASSWORD
echo
echo "building"
npm run build;
npm run test;
echo
echo "building docker container $DOCKER_IMAGE_NAME:$DOCKER_TAG"
docker build -t $DOCKER_IMAGE_NAME:$DOCKER_TAG .;
echo "uploading docker container to dockerhub with user $DOCKER_USERNAME"
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD";
docker tag $DOCKER_IMAGE_NAME:$DOCKER_TAG nzzonline/$DOCKER_IMAGE_NAME:$DOCKER_TAG;
docker push nzzonline/$DOCKER_IMAGE_NAME:$DOCKER_TAG;
echo "done"
