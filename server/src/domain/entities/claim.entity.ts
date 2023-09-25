import Visitor from "./visitor.entity.js";
import Category from "./category.entity.js";

class Claim {
    id: string;
    owner: Visitor;
    title: string;
    description: string;
    category: Category;
    location: string;
    createAt: Date;
    cloneOf: Claim | null;

    private constructor(id: string, owner: Visitor, title: string, description: string, category: Category, location: string, createAt: Date, cloneOf: Claim | null) {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = location;
        this.createAt = createAt;
        this.cloneOf = cloneOf;
    }

    getId(): string {
        return this.id;
    }
}
export default Claim