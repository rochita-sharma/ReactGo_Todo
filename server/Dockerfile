FROM golang:1.23-alpine

WORKDIR /server

COPY go.* .

RUN go mod download

COPY . .

RUN CGO_Enabled=0 GOOS=linux go build -o build/server

EXPOSE 9000

