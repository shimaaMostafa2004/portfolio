export interface TranslationDict {
  navBrand: string;
  navProjects: string;
  navServices: string;
  navStack: string;
  navExperience: string;
  navContact: string;
  navHireBtn: string;
  
  heroTitle: string;
  heroSub: string;
  heroCheck1: string;
  heroCheck2: string;
  heroCheck3: string;
  heroCtaHire: string;
  heroCtaWork: string;
  heroCtaPortfolio: string;
  heroCtaUpwork: string;
  heroStat1Val: string;
  heroStat1Desc: string;
  heroStat2Val: string;
  heroStat2Desc: string;
  heroStat3Val: string;
  heroStat3Desc: string;
  heroValueTitle: string;
  heroValueDesc: string;
  heroProblemTitle: string;
  heroProblemDesc: string;

  aboutLabel: string;
  aboutTitle: string;
  aboutDesc1: string;
  aboutDesc2: string;
  aboutGuideTitle: string;
  aboutGuide1Title: string;
  aboutGuide1Desc: string;
  aboutGuide2Title: string;
  aboutGuide2Desc: string;
  aboutGuide3Title: string;
  aboutGuide3Desc: string;

  trustLabel: string;
  trustTitle: string;
  trustDesc: string;
  trustCard1Title: string;
  trustCard1Meta: string;
  trustCard1Desc: string;
  trustCard2Title: string;
  trustCard2Meta: string;
  trustCard2Desc: string;
  trustCard3Title: string;
  trustCard3Meta: string;
  trustCard3Desc: string;

  calcTitle: string;
  calcSub: string;
  calcUserSliderLabel: string;
  calcVolumeSliderLabel: string;
  calcLatencySliderLabel: string;
  calcRiskTitle: string;
  calcRiskLow: string;
  calcRiskMedium: string;
  calcRiskHigh: string;
  calcRecommendationTitle: string;

  projectsLabel: string;
  projectsSub: string;
  projectsFilterAll: string;
  projectsFilterBackend: string;
  projectsFilterDB: string;
  projectsFilterCloud: string;
  projectsProblem: string;
  projectsSolution: string;
  projectsResult: string;
  projectsMore: string;

  servicesLabel: string;
  servicesTitle: string;
  servicesDesc: string;
  servicesItem1Title: string;
  servicesItem1Desc: string;
  servicesItem2Title: string;
  servicesItem2Desc: string;
  servicesItem3Title: string;
  servicesItem3Desc: string;
  servicesItem4Title: string;
  servicesItem4Desc: string;
  servicesItem5Title: string;
  servicesItem5Desc: string;
  servicesItem6Title: string;
  servicesItem6Desc: string;

  expLabel: string;
  expSub: string;
  exp1Title: string;
  exp1Company: string;
  exp1Date: string;
  exp1Desc: string;
  exp2Title: string;
  exp2Company: string;
  exp2Date: string;
  exp2Desc: string;
  exp3Title: string;
  exp3Company: string;
  exp3Date: string;
  exp3Desc: string;

  contactTitle: string;
  contactSub: string;
  contactFormName: string;
  contactFormEmail: string;
  contactFormMsg: string;
  contactFormSubmit: string;
  contactFormSubmitting: string;
  contactFormSuccess: string;
  contactFormError: string;
  contactDirectBtn: string;
  contactCallBtn: string;
}

export interface Project {
  id: string;
  category: "Backend" | "DB" | "Cloud";
  titleAr: string;
  titleEn: string;
  problemAr: string;
  problemEn: string;
  solutionAr: string;
  solutionEn: string;
  resultAr: string;
  resultEn: string;
  metricsAr: string;
  metricsEn: string;
}
