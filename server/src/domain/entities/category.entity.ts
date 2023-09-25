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
}
export default Category
