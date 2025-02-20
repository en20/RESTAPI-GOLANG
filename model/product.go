package model

type Product struct {
	ID          int     `json:"id_product"`
	ProductName string  `json:"product_name"`
	Price       float64 `json:"price"`
}
