import React from 'react';
import { DumplingBackground } from '@/widgets/dumpling-background';
import { Hero } from '@/widgets/hero';
import { SiteHeader } from '@/widgets/site-header';
import { SiteFooter } from '@/widgets/site-footer';
import { ProductCatalog } from '@/widgets/product-catalog';
import { FlavorCollections } from '@/widgets/flavor-collections';
import { ProductionStory } from '@/widgets/production-story';
import { TableInvitation } from '@/widgets/table-invitation';
import { HomeExperience } from './home-experience';
export function HomePage() {
  return <HomeExperience><DumplingBackground /><a className="skip-link" href="#main">Перейти к содержимому</a><SiteHeader /><main id="main"><Hero /><FlavorCollections /><ProductCatalog /><ProductionStory /><TableInvitation /></main><SiteFooter /></HomeExperience>;
}
