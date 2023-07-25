import { IsNotEmpty, IsString } from 'class-validator';
import { CommonEntity } from 'src/common/entities/common.entity';
import { Column, Entity, Tree, TreeChildren, TreeParent } from 'typeorm';

@Entity({ name: 'WORKSPACE' })
@Tree('materialized-path')
export class WorkspaceEntity extends CommonEntity {
  @IsString()
  @IsNotEmpty({ message: '제목을 작성해주세요.' })
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @TreeChildren()
  workspaces: WorkspaceEntity[];

  @TreeParent()
  workspace: WorkspaceEntity;
}
