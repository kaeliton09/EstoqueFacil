package dev.Kaeliton.EstoqueFacil.Products;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController 
@RequestMapping("/products")
public class ProductController {

    private ProductService productService;
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/list")
    public List<ProductModel> listAll() {
        return productService.listAll();
    }

    @GetMapping("/list/last-ten")
    public List<ProductModel> listLastTen() {
        return productService.listLastTen();
    }

    @PostMapping("/create")
    public ProductModel create(@Valid @RequestBody ProductModel product) {
        return productService.save(product);
    }

    @PostMapping("/update/{id}")
    public ProductModel update(@Valid @RequestBody ProductModel product, @PathVariable Long id) {
        return productService.update(id, product);
    }

    @GetMapping("/{id}")
    public ProductModel findById(@PathVariable Long id) {
        return productService.findById(id);
    }

    @GetMapping("/category/{categoryId}")
    public List<ProductModel> findByCategoryId(@PathVariable Long categoryId) {
        return productService.findByCategoryId(categoryId);
    }

    @GetMapping("/name/{name}")
    public List<ProductModel> findByName(@PathVariable String name) {
        return productService.findByName(name);
    }

    @GetMapping("/barcode/{barcode}")
    public List<ProductModel> findByBarcode(@PathVariable int barcode) {
        return productService.findByBarcode(barcode);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        productService.delete(id);
    }

}
