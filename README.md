# Todo-api
Sample NodeJs backend application

## Instructions to run the application

1. Checkout the source from `master branch`
2. Run npm install
3. Build docker image
    `docker build -t todo-api:v1`
5. Run the application by 
    `docker run -it -p 8999:8999 todo-api:v1`
