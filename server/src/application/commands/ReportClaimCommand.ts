import Visitor from "../../domain/entities/visitor.entity";
import Category from "../../domain/entities/category.entity";

class ReportClaimCommand {
  constructor(
    private owner: Visitor,
    private description: string,
    private category: Category,
    private createdAt: Date
  ) {}

  public getOwner(): Visitor {
    return this.owner;
  }

  public getDescription(): string {
    return this.description;
  }

  public getCategory(): Category {
    return this.category;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}

export default ReportClaimCommand;
