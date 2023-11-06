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
  private dislikes: number;
  private likes: number;
  private reported: boolean; // Nuevo atributo
  //private reportedBy: Visitor | null; // Quién realizó la denuncia
  //private reportedAt: Date | null; // Fecha de la denuncia

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
    this.likes = 0;
    this.reported = false; // Inicialmente no reportado
    //this.reportedBy = null;
    //this.reportedAt = null;
  }
  public like(): void {
    this.likes++;
  }
  public dislike(): void {
    this.dislikes++;
  }
  public getDislikes(): number {
    return this.dislikes;
  }
  public getLikes(): number {
    return this.likes;
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
}
export default Claim;