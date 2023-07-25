import { Body, Controller, Get, Post } from '@nestjs/common';
import { WorkspaceService } from '../services/workspace.service';
import { WorkspaceDTO } from '../dtos/workspace.dto';

@Controller('workspace')
export class WorkspaceController {
  constructor(private readonly workspaceService: WorkspaceService) {}

  @Get()
  async readRootWorkspace() {
    return this.workspaceService.readRootWorkspace();
  }

  @Post()
  async addWorkspace(@Body() workspaceDTO: WorkspaceDTO) {
    return this.workspaceService.addWorkspace(
      workspaceDTO.title,
      workspaceDTO.parentId,
    );
  }
}
