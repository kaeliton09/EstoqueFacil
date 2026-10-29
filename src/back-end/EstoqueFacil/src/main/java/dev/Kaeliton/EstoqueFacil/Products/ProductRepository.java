package dev.Kaeliton.EstoqueFacil.Products;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository  extends JpaRepository<ProductModel, Long> {  
}