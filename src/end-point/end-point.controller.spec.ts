import { Test, TestingModule } from '@nestjs/testing';
import { EndPointController } from './end-point.controller';

describe('EndPointController', () => {
  let controller: EndPointController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EndPointController],
    }).compile();

    controller = module.get<EndPointController>(EndPointController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
