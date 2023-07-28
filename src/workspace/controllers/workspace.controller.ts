import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
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

  @Put(':id')
  async updateWorkspace(
    @Param('id') id: number,
    @Body() { title }: { title: string },
  ) {
    return this.workspaceService.updateWorkspace(id, title);
  }

  @Delete(':id')
  async deleteWorkspace(@Param('id') id: number) {
    return this.workspaceService.deleteWorkspace(id);
  }
}
