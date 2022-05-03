import { Test, TestingModule } from '@nestjs/testing';
import { AltSchedulesController } from './alt-schedules.controller';

describe('AltSchedulesController', () => {
  let controller: AltSchedulesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AltSchedulesController],
    }).compile();

    controller = module.get<AltSchedulesController>(AltSchedulesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
