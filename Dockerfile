FROM mcr.microsoft.com/playwright:v1.46.0-jammy

RUN mkdir playwright-tests

WORKDIR playwright-tests

COPY src .

RUN rm -rf

RUN npm ci

CMD ["npm", "run", "test"]
