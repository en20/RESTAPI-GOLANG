package service

import (
	"bytes"
	"fmt"
	"io"
	"mime/multipart"
	"os"
	"strings"
	"time"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
)

type S3Service struct {
	s3Client *s3.S3
	Bucket   string
}

func NewS3Service() (*S3Service, error) {
	sess, err := session.NewSession(&aws.Config{
		Region: aws.String("us-east-1"),
	})
	if err != nil {
		return nil, err
	}

	return &S3Service{
		s3Client: s3.New(sess),
		Bucket:   "leite-files",
	}, nil
}

func (s *S3Service) UploadFile(file *multipart.FileHeader, productID int) (string, error) {
	f, err := file.Open()
	if err != nil {
		return "", err
	}
	defer f.Close()

	buffer := make([]byte, file.Size)
	if _, err := f.Read(buffer); err != nil {
		return "", err
	}

	// Create unique key for the file
	key := fmt.Sprintf("provas/%d/%s", productID, file.Filename)

	// Upload to S3
	_, err = s.s3Client.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(s.Bucket),
		Key:    aws.String(key),
		Body:   bytes.NewReader(buffer),
	})
	if err != nil {
		return "", err
	}

	// Return the S3 URL
	return fmt.Sprintf("https://%s.s3.amazonaws.com/%s", s.Bucket, key), nil
}

func (s *S3Service) GetSignedURL(key string) (string, error) {
	req, _ := s.s3Client.GetObjectRequest(&s3.GetObjectInput{
		Bucket: aws.String(s.Bucket),
		Key:    aws.String(key),
	})

	// URL válida por 1 hora
	urlStr, err := req.Presign(1 * time.Hour)
	if err != nil {
		return "", err
	}

	return urlStr, nil
}

func (s *S3Service) GetFileContent(key string) ([]byte, error) {
	result, err := s.s3Client.GetObject(&s3.GetObjectInput{
		Bucket: aws.String(s.Bucket),
		Key:    aws.String(key),
	})
	if err != nil {
		return nil, err
	}
	defer result.Body.Close()

	return io.ReadAll(result.Body)
}

func (s *S3Service) FileExists(url string) (bool, error) {
	// Extrair a chave do S3 da URL
	key := strings.TrimPrefix(url, os.Getenv("AWS_S3_URL")+"/")

	_, err := s.s3Client.HeadObject(&s3.HeadObjectInput{
		Bucket: aws.String(os.Getenv("AWS_BUCKET_NAME")),
		Key:    aws.String(key),
	})

	if err != nil {
		if aerr, ok := err.(awserr.Error); ok {
			switch aerr.Code() {
			case "NotFound":
				return false, nil
			default:
				return false, err
			}
		}
		return false, err
	}

	return true, nil
}
