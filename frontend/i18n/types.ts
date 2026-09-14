export interface FlowMedia {
  /** Base name under /media/flows. */
  name: string
  alt: string
  caption: string
  demo: string
}

export interface ImageMedia {
  src: string
  width: number
  height: number
  alt: string
  caption: string
}

export interface Product {
  name: string
  kicker: string
  claim: string
  paragraphs: string[]
  facts: string
  status: { term: string, body: string }
  video?: FlowMedia
  image?: ImageMedia
  links: { study: string, site: string }
}

export interface Messages {
  meta: { title: string, description: string }
  nav: { label: string, contact: string, skip: string, language: string }
  hero: { line1: string, line2: string, lede: string, primary: string, secondary: string }
  how: { heading: string, lede: string, steps: { term: string, body: string }[] }
  services: { heading: string, lede: string, items: { term: string, title: string, body: string }[] }
  products: { heading: string, lede: string, items: Product[] }
  cases: {
    heading: string
    lede: string
    items: {
      name: string
      tag: string
      note: { term: string, body: string }
      paragraphs: string[]
      link: string
    }[]
  }
  who: {
    heading: string
    lede: string
    people: { name: string, paragraphs: string[] }[]
    closing: string
  }
  contact: {
    heading: string
    lede: string
    sub: string
    address: string
    cvr: string
    form: {
      name: string
      company: string
      email: string
      message: string
      submit: string
      sending: string
      success: string
      error: string
    }
  }
  footer: { country: string, top: string }
  case: { back: string, demo: string, kicker: string }
  error: { title: string, body: string, home: string }
}
