import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Redirect,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
@Controller('cats')
export class CatsController {
  @Post()
  create(): string {
    return 'this action adds a new cat';
  }

  @Get()
  findAll(@Req() request: Request): string {
    console.log(request);
    return 'THis action returns all cats';
  }

  /**
   * 루트 와일드카드#
   * 패턴 기반 경로도 NestJS에서 지원합니다.
   * 예를 들어, 별표()는 경로 끝에 있는 경로 내 어떤 문자 조합이든 와일드카드로 사용할 수 있습니다.
   * 다음 예에서는, 이 메서드는 로 시작하는 모든 경로에 대해 실행됩니다. 그 후 문자 수가 몇 개든 상관없습니다.
   */
  @Get('abcd/*')
  wildCard(): string {
    return 'this route use a wildcard';
  }

  /**
   * 상태 코드#
   * 앞서 언급했듯이, 응답의 기본 상태 코드는 항상 200이며, POST 요청은 기본값이 201입니다.
   * 이 동작은 핸들러 레벨의 데코레이터를 사용하면 쉽게 변경할 수 있습니다.@HttpCode(...)
   * 상태 코드는 종종 고정되어 있지 않고 여러 요인에 따라 달라집니다.
   * 이 경우 라이브러리별 Res() 객체를 인젝트하거나(오류가 발생하면 예외를 던지기) 사용할 수 있습니다.@Res()
   */
  @Post('code')
  @HttpCode(204)
  httpCode(): string {
    return 'this action adds a new cat';
  }

  /**
   * 응답 헤더#
   * 커스텀 응답 헤더를 지정하려면 데코레이터나
   * 라이브러리별 응답 객체를 사용해 직접 호출할 수 있습니다.@Header()res.header()
   */
  @Post('header')
  @Header('Cache-Control', 'no-store')
  header(): string {
    return 'this action adds a new cat';
  }

  /**
   *  리디렉션#
   * 응답을 특정 URL로 리디렉션하려면
   * 장식기나 라이브러리 전용 응답 객체를 사용해 직접 호출할 수 있습니다.
   * @Redirect()res.redirect()
   * @Redirect() 두 개의 인수를 가지며, 와 는 모두 선택 사항이다.
   * 기본 값은 ()로 설정되어 있습니다.url statusCode statusCode 302Found

   */
  @Get('redirect')
  @Redirect('https://nestjs.com', 301)
  redirect(): string {
    return 'this action adds a new cat';
  }

  /**
   *  힌트
   * 때로는 HTTP 상태 코드나 리디렉션 URL을 동적으로 결정하고 싶을 수도 있습니다.
   * 인터페이스 다음에 객체를 반환하여 (에서) 이를 수행합니다. HttpRedirectResponse@nestjs/common@param version
   */
  @Get('docs')
  @Redirect('https://docs.nestjs.com', 302)
  getDocs(@Query('version') version: string) {
    if (version && version === '5') {
      return { url: 'https://docs.nestjs.com/v5/' };
    }
  }
}
