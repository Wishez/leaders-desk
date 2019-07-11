# escape=`

FROM node:carbon

MAINTAINER Filipp Zhuravlev <shiningfinger@list.ru>

CMD ["npm", "run", "build"]

COPY ./dist /user/src/apps/leaders/site