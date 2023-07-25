import { PickType } from '@nestjs/swagger';
import { WorkspaceEntity } from '../workspace.entity';
import { IsNotEmpty } from 'class-validator';

export class WorkspaceDTO extends PickType(WorkspaceEntity, [
  'title',
] as const) {
  @IsNotEmpty({ message: '부모값이 존재하지 않습니다.' })
  parentId: number | 'root';
}
