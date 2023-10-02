import Category from "../../domain/entities/category.entity";
import CategoryRepository from "../../infrastructure/repositories/category.repository";

class GetCategoriesCommand {
    private categoryRepository: CategoryRepository;

    constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public async getAllCategories(): Promise<Category[]> {
        return this.categoryRepository.findAll();
    }

    public async getCategoryById(categoryId: string): Promise<Category | null> {
        return this.categoryRepository.findOneById(categoryId);
    }

    public async saveCategory(category: Category): Promise<void> {
        return this.categoryRepository.save(category);
    }
}

export default GetCategoriesCommand;