## Nest JS

- 효율적이고 확장 가능한 Node.js 서버 측 애플리케이션을 구축하기 위한 프레임워크

- 내부적으로 Nest는 Express 와 같은 강력한 HTTP 서버 프레임 워크를 사용하며 선택적으로 Fastify를 사용할 수 있습니다

요청 -> 모듈에서 알맞는 컨트롤러로 라우팅 -> 컨트롤러에서 알맞는 서비스로 라우팅 -> 서비스에서 알맞는 모델로 라우팅 -> 모델에서 DB로 라우팅 -> DB에서 결과값을 모델로 반환 -> 모델에서 서비스로 반환 -> 서비스에서 컨트롤러로 반환 -> 컨트롤러에서 모듈로 반환 -> 모듈에서 응답

## Module

- 모듈은 @Module() 데코레이터로 주석이 달린 클래스입니다

- 데코레이터는 Nest가 애플리에키션 구조를 구성하는데 사용하는 메타데이터를 제공합니다

- nest g module [모듈명] 명령어로 모듈을 생성할 수 있습니다

## Controller

- 컨트롤러는 들어오는 요청을 처리하고 클라이언트에 응답을 반환합니다

- @Controller() 데코레이터로 클래스를 데코레이션하여 정의됩니다

- 데코레이터는 인자를 Controller에 의해서 처리되는 "경로"로 받습니다

- nest g controller [컨트롤러명] 명령어로 컨트롤러를 생성할 수 있습니다

### Handler

- 핸들러는 @Get, @Post, @Delete 등과 같은 데코레이터로 장식 된 컨트롤러 클래스 내의 단순한 메서드입니다

- 인자로 경로를 받습니다

## Service

- @Injectable() 데코레이터로 클래스를 데코레이션하여 정의됩니다

- @Injectable() 데코레이터는 다른 컴포넌트에서 이 서비스를 import 할 수 있도록 해줍니다

- 서비스를 컨트롤러에서 이용할 수 있게 해주기 위해 Controller에서 constructor를 통해 서비스를 주입받습니다

- 서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스에 아이템을 생성하는 등의 로직을 처리합니다

```ts
boardsService: BoardsService;

constructor(boardsService: BoardsService) {
  this.boardsService = boardsService;
}
// 이 코드를

constructor(private boardsService: BoardsService) {}

// 이렇게 줄일 수 있습니다
```

- 접근 제한자를 생성자 파라미터에 선언하면 암묵적으로 해당 클래스에 같은 이름의 속성이 선언되고 생성자 파라미터로 전달된 값이 할당됩니다

## Provider

- 대부분의 기본 Nest 클래스는 서비스, 리포지토리, 팩토리, 헬퍼등 프로바이더로 취급될 수 있습니다

- 프로바이더의 주요 아이디어는 종속성으로 **주입**할 수 있다는 것입니다

- 객체는 서로 다양한 관계를 만들 수 있으며 객체의 인스턴스를 연결하는 기능은 대부분 Nest 런타임 시스템에 위임될 수 있습니다

## 생성

- @Body() body 를 이용해서 body를 받아올 수 있습니다

## DTO (Data Transfer Object)

- 데이터 전송 객체는 계층 간 데이터 교환을 위한 객체입니다

- DB에서 데이터를 얻어 서비스나, 컨트롤러 등으로 보낼 때 사용하는 객체를 말한다

- DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체

- 인터페이스나 클래스를 이용해서 정의 할 수 있음 (클래스를 이용하는 것을 권장)

### 쓰는 이유

- 데이터 유효성을 체크하는데 효율적

- 더 안정적인 코드를 만들어 줌

## Pipe

- @Injectable() 데코레이터로 클래스를 데코레이션하여 정의됩니다

- data transformation, data validation 등을 위해 사용됩니다

- 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동합니다

- 메소드가 호출되기 직전에 파이프에 삽입하고 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동합니다

### data transformation

- 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동합니다

- 입력 데이터를 원하는 형식으로 변환 (예: 문자열을 숫자로 변환)

### data validation

- 파이프는 메소드로 향하는 인수를 수신하고 이에 대해 작동합니다

- 입력 데이터를 유효성 검사 (예: 데이터 유형 확인)

https://github.com/typestack/class-validator#manual-validation

### 사용하는 법

- Handler-level Pipes, Parameter-level Pipes, Global Pipes

**Handler-level Pipes**

- 컨트롤러 메소드에 @UsePipes() 데코레이터를 사용하여 파이프를 적용할 수 있습니다

- 핸들러 레벨에서 사용해 모든 파라미터에 적용

**Parameter-level Pipes**

- 특정한 파라미터에게만 적용이 되는 파이프

**Global Pipes**

- 애플리케이션 전체에 적용되는 파이프

- 클라이언트에서 들어오는 모든 요청에 적용이 됨

### Built-in Pipes

- Nest는 유용한 내장 파이프를 제공합니다

- ValidationPipe, ParseIntPipe, ParseBoolPipe, ParseArrayPipe, ParseUUIDPipe, DefaultValuePipe

### Custom Pipes

- PipeTransform 이란 인터페이스를 새롭게 만들 커스텀 파이프에 구현해야 합니다

- 파이프는 transform() 메소드를 구현해야 합니다

- transform() 메소드는 두 개의 인수를 받습니다

- 첫번째 파라미터는 처리가 된 인자의 값(value) 이며

- 두번째 파라미터는 메소드의 메타데이터(metadata) 입니다

## TypeORM (Object Relational Mapping)

- node.js에서 실행되고 TypeScript로 작성된 객체 관계형 매퍼 라이브러리 입니다

- 객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업

- 객체와 데이터베이스의 변형에 유연하게 사용할 수 있음

### 특징과 이점

- 모델을 기반으로 데이터베이스 스키마를 자동으로 생성

- 데이터베이스에서 개체를 쉽게 삽입, 업데이트 및 삭제할 수 있음

- 테이블 간의 매팅(일대일, 일대다, 다대다)을 지원

- 간단한 CLI 명령을 사용하여 데이터베이스를 마이그레이션 할 수 있음

## 엔티티(Entity)

- orm 을 사용하면 클래스를 테이블로 매핑할 수 있습니다

- 클래스를 엔티티라고 부릅니다

- @Entity() 데코레이터를 사용해 엔티티를 정의합니다

### @PrimaryGeneratedColumn()

- 기본 키를 생성하는 데 사용되는 열을 정의합니다

### @Column()

- 열을 정의합니다

## Repository

- 엔티티 개체와 함께 작동하며 엔티티 찾기, 삽입, 업데이트, 삭제 등의 작업을 수행합니다

- @EntityRepository() 데코레이터를 사용해 리포지토리를 정의합니다
