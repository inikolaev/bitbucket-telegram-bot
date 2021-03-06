FROM inikolaev/alpine-nodejs

WORKDIR /app

ADD lib/ /app/lib/
ADD package.json /app

RUN npm install --no-optional

# Override entrypoint defined in parent container
ENTRYPOINT []
CMD ["npm", "start"]
