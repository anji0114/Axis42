import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  users(): User[] {
    return this.usersService.findAll();
  }

  @Query(() => User)
  user(@Args('id', { type: () => Int }) id: number): User {
    return this.usersService.findOne(id);
  }

  @Mutation(() => User)
  updateUsername(
    @Args('id', { type: () => Int }) id: number,
    @Args('username') username: string,
  ): User {
    return this.usersService.updateUsername(id, username);
  }
}
