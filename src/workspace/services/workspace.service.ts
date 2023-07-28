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

  async updateWorkspace(id: number, title: string) {
    if (id <= 0 || Number.isNaN(id)) {
      throw new BadRequestException('잘못된 id 값을 입력했습니다.');
    }

    if (typeof title !== 'string') {
      throw new BadRequestException('잘못된 title 값을 입력했습니다.');
    }

    await this.workspaceTreeRepository.update(id, { title });
  }

  async deleteWorkspace(id: number) {
    const deleteState = await this.workspaceTreeRepository.delete(id);

    if (deleteState.affected === 0) {
      throw new BadRequestException('잘못된 id로 delete를 시도했습니다.');
    }
  }
}
