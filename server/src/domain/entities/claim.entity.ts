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
    private dislikes: number;

    private constructor(id: string, owner: Visitor, title: string, description: string, category: Category, location: string, createAt: Date, cloneOf: Claim | null) {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = location;
        this.createAt = createAt;
        this.cloneOf = cloneOf;
        this.dislikes = 0;
    }
    
    public dislike(): void {
        this.dislikes++; 
      }
      public getDislikes(): number {
        return this.dislikes; 
      }
      public getClaimId(): string {
        return this.id; 
      }
    getId(): string {
        return this.id;
    }
}
export default Claim