package dev.Kaeliton.EstoqueFacil.Category;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/category")
public class CategoryController {

    private CategoryService categoryService;
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @GetMapping("/list")
    public Iterable<CategoryModel> listAll() {
        return categoryService.listAll();
    }

    @GetMapping("/list/names")
    public Iterable<String> listNames() {
        return categoryService.listNames();
    }

    @PostMapping("/create")
    public CategoryModel create(@Valid  @RequestBody CategoryModel category) {
        return categoryService.save(category);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        categoryService.delete(id);
    }
    
}
