import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres', // RDBMS 종류
  host: 'localhost', // 데이터베이스 호스트
  port: 5432, // 데이터베이스 포트
  username: 'postgres', // 데이터베이스 유저 이름
  password: '8946', // 데이터베이스 유저 비밀번호
  database: 'board-app', // 데이터베이스 이름
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // 엔티티 파일 위치
  synchronize: true, // 앱 실행 시 동기화 여부
};
