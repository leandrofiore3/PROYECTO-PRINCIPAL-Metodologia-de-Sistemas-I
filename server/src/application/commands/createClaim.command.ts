import Category from "../../domain/entities/category.entity";
import Claim from "../../domain/entities/claim.entity";
import Visitor from "../../domain/entities/visitor.entity";

class CreateClaimCommand {
    private readonly id: string;
    private readonly owner: Visitor;
    private readonly title: string;
    private readonly description: string;
    private readonly category: Category;
    private readonly location: string;
    private readonly createdAt: Date;
    private readonly cloneOf: Claim | null;

    constructor(
        id: string,
        owner: Visitor,
        title: string,
        description: string,
        category: Category,
        location: string,
        createdAt: Date,
        cloneOf: Claim | null = null
    ) {
        this.id = id;
        this.owner = owner;
        this.title = title;
        this.description = description;
        this.category = category;
        this.location = location;
        this.createdAt = createdAt;
        this.cloneOf = cloneOf;
    }

    public getId(): string {
        return this.id;
    }

    public getOwner(): Visitor {
        return this.owner;
    }

    public getTitle(): string {
        return this.title;
    }

    public getDescription(): string {
        return this.description;
    }

    public getCategory(): Category {
        return this.category;
    }

    public getLocation(): string {
        return this.location;
    }

    public getCreatedAt(): Date {
        return this.createdAt;
    }

    public getCloneOf(): Claim | null {
        return this.cloneOf;
    }

    public getOwnerId(): string {
        return this.owner.getId();
    }

    public getVisitorPin(): string {
        return this.owner.getPin();
    }
}

export default CreateClaimCommand;
