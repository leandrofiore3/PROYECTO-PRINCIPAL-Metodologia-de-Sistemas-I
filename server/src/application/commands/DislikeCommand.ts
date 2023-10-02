import Visitor from "../../domain/entities/visitor.entity";
import Category from "../../domain/entities/category.entity";
import Claim from "../../domain/entities/claim.entity"; // Importa la entidad Claim si aún no lo has hecho.

class DislikeCommand {
  private readonly id: string;
  private readonly owner: Visitor;
  private readonly title: string;
  private readonly description: string;
  private readonly category: Category;
  private readonly location: string;
  private readonly createAt: Date;
  private readonly cloneOf: Claim | null;
  private dislikes: number;

  constructor(
    id: string,
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string,
    createAt: Date,
    cloneOf: Claim | null
  ) {
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

  public getCreateAt(): Date {
    return this.createAt;
  }

  public getCloneOf(): Claim | null {
    return this.cloneOf;
  }

  public getDislikes(): number {
    return this.dislikes;
  }

  public dislike(): void {
    this.dislikes++;
  }
}

export default DislikeCommand;
