package dev.Kaeliton.EstoqueFacil.Category;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class CategoryService {


    private CategoryRepository categoryRepository;
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    //listar todas categorias
    public List<CategoryModel> listAll() {
        return categoryRepository.findAll();
    }

    //listar nomes de categorias
    public List<String> listNames() {
        return categoryRepository.findAll()
        .stream()
        .map(CategoryModel::getName)
        .toList();
    }

    // criar categoria
    public CategoryModel save(CategoryModel category) {
        return categoryRepository.save(category);
    }

    // atualizar categoria
    public CategoryModel update(Long id, CategoryModel category) {
        category.setId(id);
        return categoryRepository.save(category);
    }

    // deletar categoria
    public void delete(Long id) {
        categoryRepository.deleteById(id);
    }


    

}
