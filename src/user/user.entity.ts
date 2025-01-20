import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // 다른 곳에 의존성을 주입할 수 있음
export class User {
  @PrimaryGeneratedColumn() // 기본키이면서 자동 증가하는 컬럼
  id?: number; //id는 pk이며 자동 증가하는 값

  @Column({ unique: true }) //unique는 DB안에 유일함을 보장. ex) 동일한 이메일 주소를 가질 수 없음
  email: String;

  @Column()
  password: string;

  @Column()
  username: String;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) //기본값을 넣어줌
  createdDt: Date = new Date();
}
