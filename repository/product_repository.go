package repository

import (
	"database/sql"
	"fmt"
	"go-api/model"
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

	query := "SELECT id, product_name, price FROM product WHERE id = $1"
	err := p.connection.QueryRow(query, id).Scan(&product.ID, &product.ProductName, &product.Price)

	if err == sql.ErrNoRows {
		return model.Product{}, fmt.Errorf("produto com ID %d não encontrado", id)
	}

	if err != nil {
		fmt.Println(err)
		return model.Product{}, err
	}

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
