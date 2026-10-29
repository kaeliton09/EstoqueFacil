package dev.Kaeliton.EstoqueFacil.Address;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Embeddable 
@Data 
@AllArgsConstructor 
@NoArgsConstructor 
public class AddressModel {

    private String street;
    private String columnName;
    private String bay;
    private String level;
}
