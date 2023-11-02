import {v4} from 'uuid';
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

  private constructor(
    id: string,
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string,
    createAt: Date,
  ) {
    this.id = id;
    this.owner = owner;
    this.title = title;
    this.description = description;
    this.category = category;
    this.location = location;
    this.createAt = createAt;
    this.cloneOf = null;
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

  getId(): string {
    return this.id;
  }

  static create(
    owner: Visitor,
    title: string,
    description: string,
    category: Category,
    location: string,
  ): Claim {
    return new Claim(v4(), owner, title, description, category, location, new Date());
  }

  hasVisitorLiked(id: string) {
    return this.likes.includes(id);
  }
}

export default Claim;