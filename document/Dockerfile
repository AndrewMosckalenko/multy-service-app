FROM node:18
WORKDIR /document
COPY ./ /document
RUN cd /document && npm install && npm run build
CMD [ "npm", "run", "start:doc" ]
