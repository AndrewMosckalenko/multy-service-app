FROM node:18
WORKDIR /gateway
COPY ./ /gateway/
RUN cd /gateway && npm install
CMD [ "npm", "run", "start:gt" ]