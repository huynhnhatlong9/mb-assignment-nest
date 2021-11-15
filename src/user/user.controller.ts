import { ScheduleDto } from './dto/schedule.dto';
import { AdminRegisterDto } from './dto/admin-register.dto';
import {
    Body,
    ConflictException,
    Controller,
    Get,
    HttpStatus,
    NotFoundException,
    Post,
    Put,
    Req,
    Request,
    Res,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Response } from 'express';
import { map, mergeMap, Observable } from 'rxjs';
import { Public } from 'src/core/decorators/guards/public.guards.decorator';
import { RolesGuard } from '../auth/guard/roles.guard';
import { AuthenticatedRequest } from '../auth/interface/authenticated-request.interface';
import { User } from '../database/model/user.model';
import { PersonalInformationDto } from './dto/personal-information.dto';
import { RegisterDto } from './dto/register.dto';
import { UpdateProfileDto } from './dto/update.dto';
import {
    IRegisterSubject,
    UserProfile,
} from './interface/user-profile.interface';
import { UserService } from './user.service';
import { RolesType } from 'src/shared/roles-type.enum';
import { SubjectRegisterDto } from './dto/subject-register.dto';
import { INTERNAL_SERVER_ERROR } from 'src/common/constants/status-message.const';
import { ExamScheduleDto } from './dto/exam-schedule.dto';

@ApiBearerAuth()
@Controller({ path: 'user' })
export class UserController {
    constructor(private readonly userService: UserService) {}
    @Public()
    @Post('/register')
    register(@Body() data: RegisterDto, @Res() res: Response) {
        const { username, email } = data;
        return this.userService.existByUsername(username).pipe(
            mergeMap((isUsernameExist) => {
                if (isUsernameExist) {
                    throw new ConflictException(
                        `Username: ${username} is exist!`,
                    );
                } else {
                    data.roles = [RolesType.CUSTOMER];
                    return this.userService.existByMail(email).pipe(
                        mergeMap((isEmailExist) => {
                            if (isEmailExist) {
                                throw new ConflictException(
                                    `Email: ${email} is exist!`,
                                );
                            } else {
                                return this.userService.register(data).pipe(
                                    map((user: User) =>
                                        res.status(HttpStatus.OK).send({
                                            username: user.username,
                                            email: user.email,
                                        }),
                                    ),
                                );
                            }
                        }),
                    );
                }
            }),
        );
    }

    @Get('/profile')
    @UseGuards(RolesGuard)
    // @HasRole([RolesType.ADMIN])
    profile(
        @Req() req: AuthenticatedRequest,
        @Res() res: Response,
    ): Observable<Response> {
        console.log(req.user);
        return this.userService.findUserByName(req.user.username).pipe(
            map((user) => {
                if (user) {
                    const userProfile: UserProfile = {
                        username: user.username,
                        email: user.email,
                        firstname: user.firstname,
                        lastname: user.lastname,
                    };
                    return res.status(HttpStatus.OK).send(userProfile);
                } else {
                    throw new NotFoundException('User not found!');
                }
            }),
        );
    }

    @Put('/update')
    update(
        @Req() req: AuthenticatedRequest,
        @Res() res: Response,
        @Body() body: UpdateProfileDto,
    ): Observable<Response> {
        return this.userService.updateProfile(req.user.username, body).pipe(
            map((user) => {
                if (user) {
                    return res.status(HttpStatus.OK).send(user);
                } else {
                    throw new NotFoundException('User not Found');
                }
            }),
        );
    }

    @Get('/personal-information')
    getPersonalInformation(@Req() req: AuthenticatedRequest) {
        return this.userService.getPersonalInformation(req.user.username);
    }
    @Put('/personal-information')
    updatePersonalInformation(
        @Body() personalInfo: PersonalInformationDto,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.userService.updatePersonalInformation(
            req.user.username,
            personalInfo,
        );
    }

    @Get('/academic-information')
    getAcademicInformation(@Req() req: AuthenticatedRequest) {
        return this.userService.getAcademicInformation(req.user.username);
    }

    @Public()
    @Post('/admin-register')
    registerAdmin(@Body() body: AdminRegisterDto) {
        return this.userService.registerAdmin(body);
    }

    @Put('/register-class/:userId')
    async registerClass(
        @Request() req,
        @Res() res: Response,
        @Body() subjectRegisterDto: SubjectRegisterDto,
    ) {
        const userId = req.params.userId;
        try {
            const result = await this.userService.registerSubject(
                userId,
                subjectRegisterDto,
            );

            return res
                .status(result.success ? HttpStatus.OK : HttpStatus.BAD_REQUEST)
                .json({
                    success: result.success,
                    message: result.message,
                    updatedListClass: result.updatedListClass,
                });
        } catch (error) {
            console.log(error);

            return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                success: false,
                message: INTERNAL_SERVER_ERROR,
            });
        }
    }

    @Get('/all-semester')
    getAllSemester() {
        return this.userService.findAllSemester();
    }

    @Post('/exam-schedule')
    getExamSchedule(
        @Body() semester: ExamScheduleDto,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.userService.getExamSchedule(
            req.user.username,
            semester.semester,
        );
    }

    @Public()
    @Get('/all-subject')
    getAllSubject() {
        return this.userService.getAllSubject();
    }

    @Public()
    @Get('/all-class')
    getAllClass() {
        return this.userService.getAllClass();
    }

    @Get('/open-register-classes')
    getOpenRegisterClass() {
        return this.userService.getOpenRegisterClass();
    }
    // @Public()
    @Post('/schedule')
    getSchedule(
        @Body() dateRequest: ScheduleDto,
        @Req() req: AuthenticatedRequest,
    ) {
        return this.userService.getSchedule(
            dateRequest.selectedDate,
            req.user.username,
        );
    }
}
