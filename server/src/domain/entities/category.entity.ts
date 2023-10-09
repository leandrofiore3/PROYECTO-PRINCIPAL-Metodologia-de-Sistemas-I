class Category {
    id: string;
    name: string;
    color: string;

    private constructor(id: string, name: string, color: string) {
        this.id = id;
        this.name = name;
        this.color = color;
    }

    getId(): string {
        return this.id;
    }

    static create(id: string, name: string, color: string): Category {
        return new Category(id, name, color);
    }
    static create(id: string, name: string, color: string): Category {
        return new Category(id, name, color);
    }
}
export default Category
