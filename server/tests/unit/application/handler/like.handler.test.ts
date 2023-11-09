import Visitor from "../../../../src/domain/entities/visitor.entity";
import Claim from "../../../../src/domain/entities/claim.entity";
import Category from "../../../../src/domain/entities/category.entity";

import { LikeHandler } from "../../../../src/application/handlers/like.handler";
import { LikeCommand } from "../../../../src/application/commands/like.command";

import VisitorRepository from "../../../../src/infrastructure/repositories/visitor.repository";
import ClaimRepository from "../../../../src/infrastructure/repositories/claim-repository";
import { ClaimMother } from "../../../shared/mothers/ClaimMother";

describe('unit - like handler tests', () => {

    let sut: LikeHandler;

    let mockVisitorRepository: typeof VisitorRepository;
    let mockClaimRepository: typeof ClaimRepository;

    beforeEach(() => {
        mockVisitorRepository = VisitorRepository;
        mockClaimRepository = ClaimRepository;

        sut = new LikeHandler(
            mockClaimRepository,
            mockVisitorRepository,
        );
    });

    test('should like a claim', async () => {
        // arrange
        const visitor = Visitor.create(
            '127.0.0.1',
            'pepito perez',
            '123456',
        );

        await mockVisitorRepository.save(visitor);

        const category = Category.create(
            'category',
            'rojo'
        );

        const claim = ClaimMother.withoutLikes(visitor, category)

        await mockClaimRepository.save(claim)

        const command = new LikeCommand(
            claim.getId(),
            visitor.getId(),
            '123456',
        );

        // act
        await sut.handler(command);


        //asserts
        expect(claim.hasVisitorLiked(visitor.getId())).toBeTruthy()
    });

    test('should fail when visitor already liked', async () => {
        // arrange
        const visitor = Visitor.create(
            '127.0.0.1',
            'pepito perez',
            '123456',
        );

        await mockVisitorRepository.save(visitor);

        const category = Category.create(
            'category',
            'rojo'
        );

        const claim = ClaimMother.withLikes(visitor, category, [visitor.getId()]);

        await mockClaimRepository.save(claim)

        const command = new LikeCommand(
            claim.getId(),
            visitor.getId(),
            '123456',
        );

        // act
        await expect(sut.handler(command)).rejects.toThrowError('Visitor has already liked this claim.');
    });

    test('should fail when visitor pin does not match', async () => {
        // arrange
        const visitor = Visitor.create(
            '127.0.0.1',
            'pepito perez',
            '123456',
        );

        await mockVisitorRepository.save(visitor);

        const category = Category.create(
            'category',
            'rojo'
        );

        const claim = Claim.create(
            visitor,
            'un test',
            'description',
            category,
            'location',
            new Date(),
            null
        );

        await mockClaimRepository.save(claim)

        const command = new LikeCommand(
            claim.getId(),
            visitor.getId(),
            '123458',
        );

        // act
        await expect(sut.handler(command)).rejects.toThrowError('Invalid PIN');
    });
})