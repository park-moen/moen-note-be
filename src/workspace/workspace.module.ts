import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkspaceEntity } from './workspace.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WorkspaceEntity])],
})
export class WorkspaceModule {}
