package repository

import (
	"database/sql"
	"fmt"
	"go-api/model"
	"go-api/service"
	"strings"
)

type ProductRepository struct {
	connection *sql.DB
}

func NewProductRepository(connection *sql.DB) ProductRepository {
	return ProductRepository{connection: connection}
}

func (p *ProductRepository) GetProducts() ([]model.Product, error) {
	query := "SELECT id, product_name, price FROM product ORDER BY id ASC"
	rows, err := p.connection.Query(query)
	if err != nil {
		fmt.Println(err)
		return []model.Product{}, err
	}

	var productList []model.Product
	var productObj model.Product

	for rows.Next() {
		err = rows.Scan(&productObj.ID, &productObj.ProductName, &productObj.Price)
		if err != nil {
			fmt.Println(err)
			return []model.Product{}, err
		}
		productList = append(productList, productObj)
	}

	rows.Close()

	return productList, nil
}

func (p *ProductRepository) CreateProduct(product model.Product) (int, error) {
	var id int
	query, err := p.connection.Prepare("INSERT INTO product" +
		"(product_name, price)" +
		"VALUES ($1, $2) RETURNING id")
	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	err = query.QueryRow(product.ProductName, product.Price).Scan(&id)
	if err != nil {
		fmt.Println(err)
		return 0, err
	}

	query.Close()
	return id, nil
}

func (p *ProductRepository) UpdateProduct(product model.Product) error {
	query, err := p.connection.Prepare(`
		UPDATE product 
		SET product_name = $1, price = $2 
		WHERE id = $3
	`)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer query.Close()

	result, err := query.Exec(product.ProductName, product.Price, product.ID)
	if err != nil {
		fmt.Println(err)
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		fmt.Println(err)
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("produto com ID %d não encontrado", product.ID)
	}

	return nil
}

func (p *ProductRepository) GetProductByID(id int) (model.Product, error) {
	var product model.Product

	// Get product details
	query := "SELECT id, product_name, price FROM product WHERE id = $1"
	err := p.connection.QueryRow(query, id).Scan(&product.ID, &product.ProductName, &product.Price)

	if err == sql.ErrNoRows {
		return model.Product{}, fmt.Errorf("produto com ID %d não encontrado", id)
	}

	if err != nil {
		return model.Product{}, err
	}

	// Get product files
	files, err := p.GetProductFiles(id)
	if err != nil {
		return model.Product{}, err
	}
	product.Files = files

	return product, nil
}

func (p *ProductRepository) DeleteProduct(id int) error {
	query, err := p.connection.Prepare(`
		DELETE FROM product 
		WHERE id = $1
	`)
	if err != nil {
		fmt.Println(err)
		return err
	}
	defer query.Close()

	result, err := query.Exec(id)
	if err != nil {
		fmt.Println(err)
		return err
	}

	rowsAffected, err := result.RowsAffected()
	if err != nil {
		fmt.Println(err)
		return err
	}

	if rowsAffected == 0 {
		return fmt.Errorf("produto com ID %d não encontrado", id)
	}

	return nil
}

func (p *ProductRepository) AddProductFile(productID int, fileURL string) error {
	query := `
		INSERT INTO product_files (product_id, file_url)
		VALUES ($1, $2)
	`
	_, err := p.connection.Exec(query, productID, fileURL)
	return err
}

func (p *ProductRepository) GetProductFiles(productID int) ([]string, error) {
	query := `
		SELECT file_url FROM product_files
		WHERE product_id = $1
	`
	rows, err := p.connection.Query(query, productID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var files []string
	s3Service, err := service.NewS3Service()
	if err != nil {
		return nil, err
	}

	for rows.Next() {
		var fileURL string
		if err := rows.Scan(&fileURL); err != nil {
			return nil, err
		}

		// Extrair a chave da URL do S3
		key := strings.TrimPrefix(fileURL, fmt.Sprintf("https://%s.s3.amazonaws.com/", s3Service.Bucket))

		// Gerar URL assinada
		signedURL, err := s3Service.GetSignedURL(key)
		if err != nil {
			return nil, err
		}

		files = append(files, signedURL)
	}
	return files, nil
}
