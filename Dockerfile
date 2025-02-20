FROM golang:1.24-alpine

WORKDIR /go/src/app

# Create .aws directory and credentials file
RUN mkdir -p /root/.aws
RUN echo "[default]\naws_access_key_id = your_access_key\naws_secret_access_key = your_secret_key" > /root/.aws/credentials

COPY . .

# Instalando dependências e ferramentas necessárias
RUN apk add --no-cache gcc musl-dev

# Download das dependências
RUN go mod download

EXPOSE 8080

# Compilando a aplicação
RUN go build -o main cmd/main.go

CMD ["./main"]