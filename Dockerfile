FROM mongo:latest

WORKDIR /beefup/api

COPY . /beefup/api

EXPOSE 3000

CMD ["npm run devserver"]