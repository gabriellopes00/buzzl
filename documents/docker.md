# Layers

A Docker image consists of several layers. Each layer corresponds to certain instructions in your Dockerfile. The following instructions create a layer: `RUN`, `COPY`, `ADD`. The other instructions will create intermediate layers and do not influence the size of your image.

*https://dzone.com/articles/docker-layers-explained#:~:text=A%20Docker%20image%20consists%20of,the%20size%20of%20your%20image*
*https://docs.docker.com/develop/develop-images/dockerfile_best-practices*

# Dockerfile Directives

```docker
FROM <image>:<version> # FROM node:latest FROM ubuntu:20.04 FROM debian
# specify which base image which will be used in a custom image

WORKDIR /<some_directory_path>/ # WORKDIR /usr/src/app/
# directory declared here will be the / (root) inside the container

ADD <filename> /<directory>/ # ADD someFile.txt /containerDir/
# this directive add some file in the root file system into the container (can be .tar)

COPY <filename> /<directory>/ # COPY someFile.txt /
# this directive copy some file in the root file system into the container, similar to add directive

CMD <shell_command> # CMD npm run migrations CMD npm run prod
# execute some command into the container, will be executed after image build

ENTRYPOINT <shell_command> # ENTRYPOINT npm run server.js
# similar to the CMD, but is the main process in the container, if this process tops, container sotps

ENV <variable>=<value> # ENV API_PORT=9989 SECRET_KEY="secret123_"
# environment variables declaration

EXPOSE <port_number> # EXPOSE 80 EXPOSE 5432
# export some specific container port. Allow access to this port

RUN <shell_command> # RUN sudo apt install httpd RUN npx server.js
# commands that will be executed while building image

USER
# image user name (default=root)

```

# Docker compose file Directives

# Command line commands

## Containers

```docker
docker container logs <container_name> # view logs
docker container logs -f <container_name> # view logs in real time

docker container create <image_name> # create a container without running it

docker container pause <container_id> # pause a container execution
docker container unpause <container_id> # return working

docker container top <container_name> # view container process information
docker container inspect <container_name> # view container information

docker container exec <container_name> <command> # execute a specific command in a container

docker container stats <container_name> # view container process stats (cpu usage, memory usage, resources usage limit)
```

## Images

```docker
docker image history <image_name> # view image creation history

docker tag <image_id> <new_image_name> # change a image tag

docker commit <image_id> # generate a commit from a image (a "stable" version )
docker push <image_id> # send a image to dockerhub
```
