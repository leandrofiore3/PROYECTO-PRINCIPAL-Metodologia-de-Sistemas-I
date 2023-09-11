import {Visitor} from "../../domain/entities/visitor.entity.ts";

class VisitorRepository {
  private visitors: Visitor[];

  public constructor() {
    this.visitors = [];
  }

  async findOneById(id: string): Promise<Visitor | null> {
    const visitor = this.visitors.find(u => u.getId() === id);
    return (visitor) ? visitor : null;
  }

  async save(user: User): Promise<void> {
    const savedUser = this.users.find(u => u.getId() === user.getId())

    if (savedUser) {
      this.users.splice(this.users.indexOf(savedUser), 1)
    }

    this.users.push(user);
  }
 
}

export default new VisitorRepository();