import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SocialLinkInput {
  @Field({ nullable: true })
  facebook?: string;

  @Field({ nullable: true })
  instagram?: string;

  @Field({ nullable: true })
  youtube?: string;

  @Field({ nullable: true })
  linkedin?: string;
}

@InputType()
export class LinkInput {
  @Field({ nullable: true })
  label?: string;

  @Field({ nullable: true })
  url?: string;
}

@InputType()
export class UpdateFooterInput {
  @Field({ nullable: true })
  phoneNumber?: string;

  @Field(() => SocialLinkInput, { nullable: true })
  socialLinks?: SocialLinkInput;

  @Field({ nullable: true })
  address?: string;

  @Field(() => [LinkInput], { nullable: true })
  links?: LinkInput[];

  @Field({ nullable: true })
  footerText?: string;

  @Field({ nullable: true })
  footerSubText?: string;

  @Field({ nullable: true })
  footerImage?: string;

  @Field({ nullable: true })
  logo?: string;
}
