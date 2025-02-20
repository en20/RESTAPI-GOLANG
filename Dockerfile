FROM golang:1.24-alpine

WORKDIR /go/src/app

COPY . .

# Instalando dependências e ferramentas necessárias
RUN apk add --no-cache gcc musl-dev

# Download das dependências
RUN go mod download

EXPOSE 8080

# Compilando a aplicação
RUN go build -o main cmd/main.go

CMD ["./main"]