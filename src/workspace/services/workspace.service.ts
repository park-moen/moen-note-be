import { BadRequestException, Injectable } from '@nestjs/common';
import { WorkspaceDTO } from '../dtos/workspace.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { WorkspaceEntity } from '../workspace.entity';
import { TreeRepository } from 'typeorm';

@Injectable()
export class WorkspaceService {
  constructor(
    @InjectRepository(WorkspaceEntity)
    private readonly workspaceTreeRepository: TreeRepository<WorkspaceEntity>,
  ) {}

  async readRootWorkspace() {
    return await this.workspaceTreeRepository.findTrees();
  }

  async addWorkspace(
    title: WorkspaceDTO['title'],
    parentId: WorkspaceDTO['parentId'],
  ) {
    if (parentId !== 'root' && typeof parentId !== 'number') {
      throw new BadRequestException('잘못된 타입의 값입니다.');
    }

    let parentWorkspace: WorkspaceEntity | null;

    if (typeof parentId === 'number') {
      parentWorkspace = await this.workspaceTreeRepository.findOneBy({
        id: parentId,
      });
    } else {
      parentWorkspace = null;
    }

    const workspace = this.workspaceTreeRepository.create({
      title,
      parent: parentWorkspace,
    });

    await this.workspaceTreeRepository.save(workspace);

    return workspace;
  }
}
