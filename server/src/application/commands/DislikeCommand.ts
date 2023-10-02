import Visitor from "../../domain/entities/visitor.entity";
import Claim from "../../domain/entities/claim.entity";

class DislikeCommand {
  private readonly id: string;
  private readonly owner: Visitor;
  private dislikes: number;

  constructor(
    id: string,
    owner: Visitor,

  ) {
    this.id = id;
    this.owner = owner;
    this.dislikes = 0;
  }

  public getId(): string {
    return this.id;
  }

  public getOwner(): Visitor {
    return this.owner;
  }

  
  public getDislikes(): number {
    return this.dislikes;
  }

  public dislike(): void {
    this.dislikes++;
  }
}

export default DislikeCommand;
