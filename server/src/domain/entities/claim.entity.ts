import Visitor from "./visitor.entity";
import Category from "./category.entity";
import { generateUuid } from "../../utils/generateUuid";

class Claim {
  id: string;
  owner: Visitor;
  title: string;
  description: string;
  category: Category;
  location: string;
  createAt: Date;
  cloneOf: Claim | null;
  reported: boolean;
  private dislikes: string[];
  private likes: string[];

  private constructor(
    id: string,
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string,
    createAt: Date,
    cloneOf: Claim | null,
  ) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.category = category;
    this.location = location;
    this.createAt = createAt;
    this.cloneOf = cloneOf;
    this.reported = false;
    this.cloneOf = cloneOf;
    this.dislikes = [];
    this.likes = [];
  }

  public like(id: string): void {
    if (this.hasVisitorLiked(id)) {
      throw new Error('Visitor has already liked this claim.')
    }
    this.likes.push(id);
  }

  public dislike(id: string): void {
    if (this.hasVisitorDisliked(id)) {
      throw new Error('Visitor already dislike this claim.')
    }

    this.dislikes.push(id)
  }

  public getDislikes(): number {
    return this.dislikes.length;
  }

  public getLikes(): number {
    return this.likes.length;
  }

  public getClaimId(): string {
    return this.id;
  }
  public isReported(): boolean {
    return this.reported;
  }

  public markAsReported(): void {
    this.reported = true;
  }
  getId(): string {
    return this.id;
  }

  static create(
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string,
    createdAt: Date,
    cloneOf: Claim | null,
  ): Claim {
    return new Claim(generateUuid(), owner, title, description, category, location, createdAt, cloneOf);
  }

  public hasVisitorLiked(id: string) {
    return this.likes.includes(id);
  }
  public hasVisitorDisliked(id: string): boolean {
    return this.dislikes.includes(id)
  }
}

export default Claim;