import { Resolver, Query, Args, Int, Mutation } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Query(() => User, { nullable: true })
  async user(@Args('id') id: string): Promise<User | null> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => User)
  updateUsername(
    @Args('id', { type: () => Int }) id: number,
    @Args('username') username: string,
  ): User {
    return this.usersService.updateUsername(id, username);
  }
}
