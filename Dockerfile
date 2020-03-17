FROM node:latest
ENV PROJECT_ENV production
ENV NODE_ENV production

WORKDIR /code

ADD . /code
RUN npm install --production

EXPOSE 3000
ENTRYPOINT ["npm", "run"]
CMD ["start"]