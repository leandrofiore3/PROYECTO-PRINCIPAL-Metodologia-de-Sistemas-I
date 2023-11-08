import { v4 } from 'uuid';
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
  private dislikes: string[];
  private likes: string[];
  private reported: boolean;

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
    this.dislikes = [];
    this.likes = [];
    this.reported = false; 
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
  //public markAsReported(reportedBy: Visitor, reportedAt: Date): void {
  public markAsReported(): void {
    this.reported = true;
    // this.reportedBy = reportedBy;
    //this.reportedAt = reportedAt;
  }
  getId(): string {
    return this.id;
  }

  static create(owner: Visitor, title: string, description: string, category: Category, location: string, createAt: Date, cloneOf: Claim | null): Claim {
    return new Claim(v4(), owner, title, description, category, location, createAt, cloneOf);
  }

  public hasVisitorLiked(id: string) {
    return this.likes.includes(id);
  }
  public hasVisitorDisliked(id: string): boolean {
    return this.dislikes.includes(id)
  }
}

export default Claim;