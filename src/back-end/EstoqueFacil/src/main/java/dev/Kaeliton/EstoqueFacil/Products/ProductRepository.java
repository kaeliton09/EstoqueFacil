package dev.Kaeliton.EstoqueFacil.Products;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<ProductModel, Long> {

    List<ProductModel> findByCode(String code);

    boolean existsByCode(int code);
}