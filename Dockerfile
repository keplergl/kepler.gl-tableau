FROM node:13.8.0
MAINTAINER mpost@7parkdata.com

WORKDIR /opt/7park
COPY . /opt/7park/
RUN yarn --ignore-engines

CMD [ "yarn", "start"]