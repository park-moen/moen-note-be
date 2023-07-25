import { Body, Controller, Post } from '@nestjs/common';
import { WorkspaceService } from '../services/workspace.service';
import { WorkspaceDTO } from '../dtos/workspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Post()
  async addWorkspace(@Body() workspaceDTO: WorkspaceDTO) {
    return this.workspaceService.addWorkspace(
      workspaceDTO.title,
      workspaceDTO.parentId,
    );
  }
}
