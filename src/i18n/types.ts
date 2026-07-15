export type LegalSection = {
  title: string
  paragraphs?: string[]
  list?: string[]
  subsections?: { title: string; paragraphs: string[] }[]
}

export type ServiceItem = {
  title: string
  desc: string
}

export type Dictionary = {
  metadata: {
    site: { title: string; description: string; keywords: string }
    home: { title: string; description: string }
    properties: { title: string; description: string }
    contact: { title: string; description: string }
    services: { title: string; description: string }
    notFound: { title: string; description: string }
    avisoLegal: { title: string; description: string }
    privacidad: { title: string; description: string }
    cookies: { title: string; description: string }
  }
  common: {
    brandTagline: string
    agentTagline: string
    phone: string
    email: string
    whatsapp: string
    office: string
    schedule: string
    closed: string
    loading: string
    sending: string
    selectOption: string
    notProvided: string
    perMonth: string
    consultPrice: string
    photos: string
    photosCount: string
    m2: string
    bedrooms: string
    bedroomsShort: string
    bathrooms: string
    bathroomsShort: string
    floor: string
    withElevator: string
    viewAll: string
    viewAllShort: string
    viewProperty: string
    viewArrow: string
    backToProperties: string
    home: string
    price: string
    description: string
    features: string
    enlarge: string
    close: string
    zoomIn: string
    zoomOut: string
    prevImage: string
    nextImage: string
    viewEnlargedImage: string
    viewImage: string
    viewAllImages: string
    enlargedImage: string
    thumbnail: string
    menu: string
    callUs: string
    googleMaps: string
    otherChannels: string
    openingHours: string
    navigation: string
    contactSection: string
    legalDisclaimer: string
    allRightsReserved: string
    privacyPolicy: string
    legalNotice: string
    cookies: string
    privacyShort: string
    backToContact: string
    spain: string
    web: string
    energyUnit: string
    co2Unit: string
  }
  nav: {
    properties: string
    services: string
    contact: string
    freeValuation: string
  }
  days: {
    monday: string
    tuesday: string
    wednesday: string
    thursday: string
    friday: string
    saturday: string
    sunday: string
  }
  labels: {
    status: Record<string, string>
    type: Record<string, string>
    operation: Record<string, string>
    extras: Record<string, string>
  }
  home: {
    hero: {
      titleLine1: string
      titleLine2: string
      viewProperties: string
      freeValuation: string
    }
    services: {
      eyebrow: string
      title: string
      subtitle: string
      viewAll: string
    }
    featured: {
      title: string
      titleHighlight: string
      viewAll: string
      empty: string
    }
    cta: {
      title: string
      subtitle: string
      contactWith: string
    }
    scrollHint: string
  }
  services: {
    items: ServiceItem[]
    whyChooseUs: ServiceItem[]
    hero: {
      eyebrow: string
      subtitle: string
      googleReviews: string
    }
    sectionTitle: string
    whyTitle: string
    contactTitle: string
    writeUs: string
    scrollHint: string
  }
  reviews: {
    googleReviews: string
    onGoogle: string
    propertiesSold: string
    eyebrow: string
    title: string
    subtitle: string
    soldLabel: string
    carouselAria: string
    excellentRating: string
  }
  properties: {
    eyebrow: string
    title: string
    countOne: string
    countMany: string
    noResults: string
    noResultsHint: string
    viewAll: string
    filters: {
      title: string
      active: string
      clear: string
      propertyType: string
      operation: string
      status: string
      province: string
      bedrooms: string
      bathrooms: string
      minPrice: string
      maxPrice: string
      extras: string
      all: string
      allF: string
      any: string
      fourOrMore: string
      threeOrMore: string
    }
  }
  propertyDetail: {
    requestInfo: string
    viewPortal: string
    whatsappMessage: string
    fields: {
      propertyType: string
      availability: string
      hotWater: string
      heatingType: string
      condition: string
      age: string
      extras: string
      energy: string
      emissions: string
    }
  }
  contact: {
    eyebrow: string
    title: string
    subtitle: string
    formTitle: string
    name: string
    namePlaceholder: string
    email: string
    emailPlaceholder: string
    phone: string
    phonePlaceholder: string
    message: string
    messagePlaceholder: string
    submit: string
    privacyAccept: string
    privacyLink: string
    successTitle: string
    successMessage: string
    sendAnother: string
    infoTitle: string
    errorSend: string
    errorSubmit: string
  }
  valoracion: {
    triggerDefault: string
    closeModal: string
    thanksTitle: string
    thanksMessage: string
    close: string
    title: string
    subtitle: string
    stepOf: string
    percentComplete: string
    step1Title: string
    step2Title: string
    step3Title: string
    propertyType: string
    location: string
    sqMeters: string
    bedrooms: string
    bathrooms: string
    condition: string
    saleTimeline: string
    observations: string
    observationsPlaceholder: string
    name: string
    phone: string
    email: string
    back: string
    next: string
    submit: string
    errorRequired: string
    errorTimeline: string
    errorContact: string
    errorEmail: string
    errorSubmit: string
    propertyTypes: string[]
    saleTimelines: string[]
    conditions: string[]
  }
  notFound: {
    title: string
    description: string
    backHome: string
  }
  legal: {
    eyebrow: string
    avisoLegal: { title: string; sections: LegalSection[] }
    privacidad: { title: string; sections: LegalSection[] }
    cookies: {
      title: string
      lastUpdated: string
      sections: LegalSection[]
      cookieTable: {
        headers: { name: string; type: string; purpose: string; duration: string }
        row: { name: string; type: string; purpose: string; duration: string }
      }
    }
  }
  language: {
    select: string
    es: string
    eu: string
  }
}
