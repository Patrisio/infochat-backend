import { Controller, Post, Body, ValidationPipe, UseGuards, Req, Get, Headers, Put, Param } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { InviteDto } from '../auth/dto/invite.dto';
import { TeammateDto } from '../teammates/dto/teammate.dto';
import { User } from './user.entity';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService
  ) {}

  @Post('/signup')
  signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{code: number, status: string}> {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  signIn(@Body(ValidationPipe) loginCredentialsDto: LoginCredentialsDto): Promise<{ accessToken: string, projectId: number }> {
    return this.authService.signIn(loginCredentialsDto);
  }

  @Post('/project/:projectId/sendEmail')
  sendEmail(
    @Body() teammateDto: TeammateDto
  ) {
    return this.authService.sendEmail(teammateDto);
  }

  @Post('/invite/:inviteId')
  confirmInvite(
    @Param('inviteId') inviteId,
    @Body() inviteDto: InviteDto
  ) {
    return this.authService.confirmInvite(inviteDto, inviteId);
  }

  @Get('/getCurrentUser')
  @UseGuards(AuthGuard())
  getCurrentUser(@Headers() headers) {
    const { authorization } = headers;
    const accessToken = authorization.split(' ')[1];

    return this.authService.getCurrentUser(accessToken);
  }
}
