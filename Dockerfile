FROM 22-alpine3.18

RUN mv . /opt/app

WORKDIR /opt/app

RUN npm install

RUN npm run build

entrypoint ['npm','start']