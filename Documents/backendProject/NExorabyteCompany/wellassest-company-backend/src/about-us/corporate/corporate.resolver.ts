import { Args, Mutation, Query, Resolver,Int } from '@nestjs/graphql';
import { CorporateService } from './corporate.service';
import { AboutHeroInput, CompanyInput,  CSRImageInput,  ExcellenceItemInput, LegacySectionInput, MilestoneItemInput, MilestoneSectionInput, MissionSectionInput, VisionSectionInput} from './dto/corporate.input';
import { AboutHeroType, CompanyType, CSRImageType, ExcellenceItemType, LegacySectionType, MilestoneItemType, MilestoneSectionType, MissionSectionType, VisionSectionType } from './types/corporate.type';

@Resolver()
export class CorporateResolver {
  constructor(private readonly corporateService: CorporateService) {}
  @Query(() => String)
  getAboutPage() {
    return this.corporateService.getAboutPage();
  }

  @Query(() => AboutHeroType)
  getAboutHero() {
    return this.corporateService.getAboutPage().aboutHero;
  }

  @Query(() => LegacySectionType)
  getLegacySection() {
    return this.corporateService.getAboutPage().legacySection;
  }
  // corporate.resolver.ts
@Query(() => MilestoneSectionType)
getMilestoneSection() {
  return this.corporateService.getMilestoneSection();
}

 // Mutation to add a milestone item
 @Mutation(() => MilestoneItemType)
 async addMilestoneItem(@Args('input') input: MilestoneItemInput) {
   return this.corporateService.addMilestoneItem(input);
 }

 // Mutation to update a milestone item by ID
 @Mutation(() => MilestoneItemType)
 async updateMilestoneItem(
  @Args('id', { type: () => Int }) id: number,
   @Args('input') input: MilestoneItemInput
 ) {
   return this.corporateService.updateMilestoneItem(id, input);
 }

 // Mutation to delete a milestone item
 @Mutation(() => Boolean)
 async deleteMilestoneItem(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
     return this.corporateService.deleteMilestoneItem(id);
 }
 
  @Mutation(() => AboutHeroType)
  updateAboutHero(@Args('input') input: AboutHeroInput) {
    return this.corporateService.updateAboutHero(input);
  }

  @Mutation(() => LegacySectionType)
  updateLegacySection(@Args('input') input: LegacySectionInput) {
  return this.corporateService.updateLegacySection(input);
  }


@Query(() => MissionSectionType)
getMissionSection() {
  return this.corporateService.getMissionSection();
}

@Mutation(() => MissionSectionType)
updateMissionSection(@Args('input') input: MissionSectionInput) {
  return this.corporateService.updateMissionSection(input);
}

@Query(() => VisionSectionType)
getVisionSection() {
  return this.corporateService.getVisionSection();
}

@Mutation(() => VisionSectionType)
updateVisionSection(@Args('input') input: VisionSectionInput) {
  return this.corporateService.updateVisionSection(input);
}

@Query(() => [CSRImageType])
getCsrImages() {
  return this.corporateService.getCsrImages();
}

@Mutation(() => [CSRImageType])
updateCsrImages(@Args({ name: 'input', type: () => [CSRImageInput] }) input: CSRImageInput[]) {
  return this.corporateService.updateCsrImages(input);
}

// === RESOLVER ===

@Query(() => [ExcellenceItemType])
getExcellenceItems() {
  return this.corporateService.getExcellenceItems();
}


// Mutation to update an excellence item by ID
@Mutation(() => ExcellenceItemType)
updateExcellenceItems(
  @Args('id', { type: () => Int }) id: number,
  @Args('input', { type: () => ExcellenceItemInput }) input: ExcellenceItemInput
) {
  return this.corporateService.updateExcellenceItems(id, input);
}

// Mutation to add a new excellence item with auto-incremented ID
@Mutation(() => ExcellenceItemType)
addExcellenceItem(
  @Args('input', { type: () => ExcellenceItemInput }) input: ExcellenceItemInput
) {
  return this.corporateService.addExcellenceItem(input);
}

// Mutation to delete an excellence item by ID
@Mutation(() => Boolean)
deleteExcellenceItem(
  @Args('id', { type: () => Int }) id: number
) {
  return this.corporateService.deleteExcellenceItem(id);
}

//company section
//get all companies
@Query(() => [CompanyType])
getCompanies() {
  return this.corporateService.getCompanies();
}

 // Mutation to add a new company
 @Mutation(() => CompanyType)
 addCompany(
   @Args('input', { type: () => CompanyInput }) input: CompanyInput,
 ) {
   return this.corporateService.addCompany(input);
 }

 // Mutation to update an existing company by ID
 @Mutation(() => CompanyType, { nullable: true })
 updateCompany(
   @Args('id', { type: () => Int }) id: number,
   @Args('input', { type: () => CompanyInput }) input: CompanyInput,
 ) {
   return this.corporateService.updateCompany(id, input);
 }

 // Mutation to delete a company by ID
 @Mutation(() => Boolean)
 deleteCompany(
   @Args('id', { type: () => Int }) id: number,
 ) {
   return this.corporateService.deleteCompany(id);
 }
}
