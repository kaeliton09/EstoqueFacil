package dev.Kaeliton.EstoqueFacil.Products;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class ProductService {

    private ProductRepository productRepository;
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    //listar todos produtos
    public List<ProductModel> listAll() {
        return productRepository.findAll();
    }

    //listar ultimos 10 produtos
    public List<ProductModel> listLastTen() {
        return productRepository.findAll()
        .stream()
        .sorted((p1, p2) -> p2.getId().compareTo(p1.getId()))
        .limit(10)
        .toList();
    }

    // buscar produto por id
    public ProductModel findById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // buscar produtos por categoria
    public List<ProductModel> findByCategoryId(Long categoryId) {
        return productRepository.findAll()
        .stream()
        .filter(product -> product.getCategory().getId().equals(categoryId))
        .toList();
    }

    // buscar produtos por nome
    public List<ProductModel> findByName(String name) {
        return productRepository.findAll()
        .stream()
        .filter(product -> product.getName().toLowerCase().contains(name.toLowerCase()))
        .toList();
    }

    // buscar produtos por codigo de barras (o codigo agora e texto: preserva zeros a esquerda)
    public List<ProductModel> findByBarcode(int barcode) {
        return productRepository.findByCode(barcode);
    }

    // criar produto
    public ProductModel save(ProductModel product) {
        if (productRepository.existsByCode(product.getCode())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Já existe um produto com esse código");
        }
        return productRepository.save(product);
    }

    // atualizar produto
    public ProductModel update(Long id, ProductModel product) {
        product.setId(id);
        return productRepository.save(product);
    }

    // deletar produto
    public void delete(Long id) {
        productRepository.deleteById(id);
    }

}