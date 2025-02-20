package usecase

import (
	"go-api/model"
	"go-api/repository"
)

type ProductUsecase struct {
	repository repository.ProductRepository
}

func NewProductUsecase(repo repository.ProductRepository) ProductUsecase {
	return ProductUsecase{repository: repo}
}

func (p *ProductUsecase) GetProducts() ([]model.Product, error) {
	return p.repository.GetProducts()
}

func (p *ProductUsecase) GetProductByID(id int) (model.Product, error) {
	return p.repository.GetProductByID(id)
}

func (p *ProductUsecase) CreateProduct(product model.Product) (model.Product, error) {
	productId, err := p.repository.CreateProduct(product)
	if err != nil {
		return model.Product{}, err
	}
	product.ID = productId
	return product, nil
}

func (p *ProductUsecase) UpdateProduct(product model.Product) error {
	return p.repository.UpdateProduct(product)
}

func (p *ProductUsecase) DeleteProduct(id int) error {
	return p.repository.DeleteProduct(id)
}

func (p *ProductUsecase) AddProductFile(productID int, fileURL string) error {
	return p.repository.AddProductFile(productID, fileURL)
}

func (p *ProductUsecase) GetProductFiles(productID int) ([]string, error) {
	return p.repository.GetProductFiles(productID)
}
