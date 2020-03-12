FROM node:latest

WORKDIR /codeStore/oa_app_service
COPY . /codeStore/oa_app_service

RUN npm install
EXPOSE 3000
ENTRYPOINT ["npm", "run"]
CMD ["start"]