export interface ServiceFeature {
  id: string;
  label: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  features: ServiceFeature[];
  icon: string;
}
