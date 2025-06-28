import { ObjectType, Field } from '@nestjs/graphql';

// Ensure SocialLinkDto is defined before being referenced in FooterDto
@ObjectType()
export class SocialLinkDto {
  @Field()
  facebook: string;

  @Field()
  instagram: string;

  @Field()
  youtube: string;

  @Field()
  linkedin: string;
}

@ObjectType()
export class FooterDto {
  @Field()
  phoneNumber: string;

  // socialLinks must now reference the already defined SocialLinkDto
  @Field(() => SocialLinkDto)
  socialLinks: SocialLinkDto;

  @Field()
  address: string;

  @Field(() => [LinkDto])
  links: LinkDto[];

  @Field({ nullable: true })
  footerText?: string;

  @Field({ nullable: true })
  footerSubText?: string;

  @Field({ nullable: true })
  footerImage?: string;

  @Field({ nullable: true })
  logo?: string;
}

@ObjectType()
class LinkDto {
  @Field({ nullable: true })
  label?: string;

  @Field({ nullable: true })
  url?: string;
}
