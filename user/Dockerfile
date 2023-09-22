FROM node:18
WORKDIR /user
COPY ./ /user/
RUN cd /user && npm install && npm run build
CMD [ "npm", "run", "start:user" ]
