import VisitorRepository from '../../infrastructure/repositories/visitor.repository';
import CreateVisitorCommand from '../commands/createVisitorCommand';
import Visitor from '../../domain/entities/visitor.entity';
import visitorRepository from '../../infrastructure/repositories/visitor.repository';



class CreateVisitorHandler{
    private visitorRepository: VisitorRepository;
    
    public constructor(
        visitorRepository: VisitorRepository
        ) {

        this.visitorRepository= visitorRepository;
    }

    public async execute (command: createVisitorCommand) :Promise<void> {
        const owner = await this.visitorRepository.create(
            command.getId(),
            command.getIp(),
            command.getNickname()
        );
        await this.visitorRepository.save(Visitor);
        }
    }

    export default new CreateVisitorHandler(
        visitorRepository
    );
