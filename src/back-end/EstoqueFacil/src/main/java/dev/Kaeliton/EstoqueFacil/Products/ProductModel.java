package dev.Kaeliton.EstoqueFacil.Products;



import dev.Kaeliton.EstoqueFacil.Address.AddressModel;
import dev.Kaeliton.EstoqueFacil.Category.CategoryModel;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor 
@NoArgsConstructor 
@Entity 
@Table(name = "product")
public class ProductModel {

    @Id 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @PositiveOrZero(message = "Código do produto não pode ser negativo")
    private int code;
    
    @NotNull(message = "Nome do produto não pode ser nulo")
    private String name;
    
    @PositiveOrZero(message = "Quantidade não pode ser negativa")
    private int quantity;

    @PositiveOrZero(message = "Quantidade mínima não pode ser negativa")
    private int minimumQuantity;

    @PositiveOrZero(message = "Preço deve ser maior ou igual a zero")
    private double price;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    @NotNull (message = "Categoria não pode ser nula")
    private CategoryModel category;

    @Embedded 
    @NotNull (message = "Endereço não pode ser nulo")
    private AddressModel address;


}
