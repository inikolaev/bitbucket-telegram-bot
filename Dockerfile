FROM inikolaev/alpine-nodejs

WORKDIR /app

ADD main.js /app
ADD package.json /app

RUN npm install --no-optional

ENTRYPOINT ["node"]
CMD ["main.js"]
