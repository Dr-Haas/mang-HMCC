export type ServiceIconId =
  | "calculator"
  | "trending-up"
  | "users"
  | "file-text"
  | "scale"
  | "briefcase";

export interface ServiceSection {
  title: string;
  subtitle?: string;
  items?: string[];
  subSections?: { title: string; items: string[] }[];
}

export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  iconId: ServiceIconId;
  color: string;
  bgColor: string;
  iconColor: string;
  heroDescription: string;
  mission: string;
  sections: ServiceSection[];
  whyChoose: string[];
  promise: string[];
}

export const SERVICES: ServiceData[] = [
  {
    slug: "comptabilite-gestion-fiscale",
    title: "Comptabilité & Gestion Fiscale",
    tagline: "Automatisez votre comptabilité",
    iconId: "calculator",
    color: "from-red-500 to-orange-500",
    bgColor: "bg-red-50",
    iconColor: "text-red-600",
    heroDescription:
      "Une comptabilité moderne, fiable et pilotée en temps réel. Au sein du cabinet HMCC, nous avons fait le choix d'une comptabilité digitalisée, automatisée et sécurisée.",
    mission:
      "Transformer la comptabilité d'une obligation administrative en véritable outil de pilotage.",
    sections: [
      {
        title: "Tenue comptable complète et automatisée",
        items: [
          "Connexion bancaire sécurisée",
          "Reconnaissance automatique des factures fournisseurs",
          "Intégration dématérialisée des factures clients",
          "Classement numérique conforme aux obligations légales",
        ],
        subSections: [
          {
            title: "Révision et contrôle humain systématique",
            items: [
              "Révisé par un collaborateur qualifié",
              "Supervisé par un expert-comptable diplômé",
              "Sécurisé par des procédures internes rigoureuses",
            ],
          },
        ],
      },
      {
        title: "Bilans et comptes de résultat en temps réel",
        subtitle: "Vision instantanée de votre performance",
        items: [
          "Résultat actualisé",
          "Situation de trésorerie",
          "Évolution des charges",
          "Suivi de la marge",
        ],
        subSections: [
          {
            title: "Tableaux de bord personnalisés",
            items: [
              "Indicateurs clés adaptés à votre activité",
              "Suivi mensuel ou trimestriel",
              "Alertes en cas de dérive",
            ],
          },
        ],
      },
      {
        title: "Établissement des comptes annuels",
        subtitle: "Conformément aux dispositions du Code de commerce",
        items: ["Bilan", "Compte de résultat", "Annexe légale"],
      },
      {
        title: "Gestion fiscale sécurisée",
        subSections: [
          {
            title: "Déclarations fiscales",
            items: [
              "Déclarations de TVA",
              "Liasses fiscales",
              "Impôt sur les sociétés",
              "Déclarations de revenus du dirigeant",
            ],
          },
          {
            title: "Transmission dématérialisée",
            items: [
              "Télétransmission EDI",
              "Sécurisation des envois",
              "Archivage numérique",
            ],
          },
          {
            title: "Anticipation et optimisation",
            items: [
              "Simulation d'impôt",
              "Arbitrage rémunération/dividendes",
              "Optimisation des charges sociales",
              "Accompagnement en cas de contrôle fiscal",
            ],
          },
        ],
      },
      {
        title: "Sécurité et conformité",
        items: [
          "Conformité RGPD",
          "Sauvegarde sécurisée des données",
          "Accès client en ligne 24h/24",
          "Historique et traçabilité complète",
        ],
      },
    ],
    whyChoose: [
      "Cabinet structuré et organisé",
      "Double compétence : expertise comptable et commissariat aux comptes",
      "Approche proactive et pédagogique",
      "Outils digitaux performants",
      "Accompagnement personnalisé du dirigeant",
    ],
    promise: [
      "Vous libérer de la contrainte comptable pour vous concentrer sur votre développement.",
      "Notre volonté, vous assister ! Parce que votre réussite est notre objectif.",
    ],
  },
  {
    slug: "conseil-fiscal-optimisation",
    title: "Conseil Fiscal & Optimisation",
    tagline: "Maximisez votre rentabilité",
    iconId: "trending-up",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600",
    heroDescription:
      "Une stratégie fiscale au service de votre performance. Chez HMCC, la fiscalité ne se limite pas à déclarer l'impôt. Elle constitue un levier stratégique d'optimisation patrimoniale et financière.",
    mission:
      "Sécurisation juridique, anticipation et optimisation en toute légalité.",
    sections: [
      {
        title: "Analyse approfondie de votre situation",
        subSections: [
          {
            title: "Diagnostic global",
            items: [
              "Structure juridique de votre activité",
              "Mode de rémunération",
              "Régime fiscal applicable (IS, IR, BNC, BIC, etc.)",
              "Situation patrimoniale personnelle",
              "Flux financiers intra-groupe le cas échéant",
            ],
          },
          {
            title: "Identification des leviers d'optimisation",
            items: [
              "Arbitrage rémunération / dividendes",
              "Opportunité d'une holding",
              "Optimisation des charges sociales",
              "Dispositifs fiscaux applicables",
              "Gestion des déficits reportables",
            ],
          },
        ],
      },
      {
        title: "Simulation d'optimisation fiscale",
        subtitle: "Modélisation chiffrée",
        items: [
          "Impact sur l'impôt sur les sociétés",
          "Impact sur l'impôt sur le revenu",
          "Impact sur les cotisations sociales",
          "Effet sur la trésorerie",
        ],
        subSections: [
          {
            title: "Comparaison de scénarios",
            items: [
              "Maintien du schéma actuel",
              "Réorganisation juridique",
              "Modification de la rémunération",
              "Stratégie de distribution de dividendes",
            ],
          },
        ],
      },
      {
        title: "Stratégies d'investissement sur-mesure",
        subSections: [
          {
            title: "Investissements professionnels",
            items: [
              "Acquisition de locaux professionnels",
              "Mise en place de sociétés holdings",
              "Structuration de groupes",
              "Financement optimisé",
            ],
          },
          {
            title: "Investissements patrimoniaux",
            items: [
              "Immobilier",
              "Transmission",
              "Pactes Dutreil",
              "Structuration patrimoniale",
            ],
          },
        ],
      },
      {
        title: "Sécurisation et prévention du risque fiscal",
        items: [
          "Éviter toute situation d'abus de droit",
          "Documenter chaque stratégie",
          "Anticiper les risques de requalification",
          "Assistance en cas de contrôle",
        ],
      },
    ],
    whyChoose: [
      "Vision globale entreprise + dirigeant",
      "Expertise en structuration de groupes",
      "Approche pédagogique et transparente",
      "Simulations chiffrées avant toute décision",
      "Accompagnement durable dans le temps",
    ],
    promise: [
      "Optimiser sans exposer.",
      "Structurer sans complexifier.",
      "Anticiper pour sécuriser.",
    ],
  },
  {
    slug: "paie-gestion-sociale",
    title: "Paie & Gestion Sociale",
    tagline: "Simplifiez vos RH",
    iconId: "users",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    heroDescription:
      "Une gestion sociale sécurisée, fluide et digitalisée. La paie est l'un des domaines les plus techniques et les plus exposés au risque juridique. Chez HMCC, nous assurons une gestion sociale complète et conforme.",
    mission:
      "Vous libérer des contraintes administratives tout en sécurisant votre responsabilité d'employeur.",
    sections: [
      {
        title: "Externalisation complète de la paie",
        subSections: [
          {
            title: "Établissement des bulletins de salaire",
            items: [
              "Bulletins de paie conformes à la législation",
              "Calcul des cotisations sociales",
              "Gestion des absences (maladie, congés, maternité, etc.)",
              "Prise en compte des conventions collectives applicables",
            ],
          },
          {
            title: "Déclarations sociales automatisées (DSN)",
            items: [
              "DSN mensuelle",
              "Signalements d'événements (arrêt maladie, fin de contrat…)",
              "Déclarations annuelles complémentaires si nécessaires",
              "Respect des dates limites",
            ],
          },
          {
            title: "Bulletins de paie digitaux",
            items: [
              "Coffre-fort numérique salarié",
              "Accès sécurisé 24h/24",
              "Archivage légal des documents sociaux",
              "Réduction du papier",
            ],
          },
        ],
      },
      {
        title: "Contrats de travail personnalisés",
        subtitle: "Rédaction et sécurisation",
        items: [
          "CDI, CDD",
          "Contrats d'apprentissage",
          "Contrats de professionnalisation",
          "Avenants (temps partiel, télétravail, modification de rémunération…)",
        ],
      },
      {
        title: "Conseil en gestion sociale",
        items: [
          "Choix du statut du dirigeant",
          "Arbitrage rémunération / dividendes",
          "Mise en place d'épargne salariale",
          "Procédures disciplinaires",
          "Ruptures conventionnelles",
          "Accompagnement en cas de contrôle URSSAF",
        ],
      },
      {
        title: "Anticipation des risques sociaux",
        items: [
          "Anticiper les réformes",
          "Adapter vos pratiques",
          "Limiter les risques prud'homaux",
        ],
      },
    ],
    whyChoose: [
      "Sécurisation juridique maximale",
      "Conformité permanente",
      "Interlocuteur dédié",
      "Outils digitaux performants",
      "Vision globale entreprise + dirigeant",
    ],
    promise: [
      "Sécuriser votre rôle d'employeur.",
      "Fluidifier votre gestion RH.",
      "Vous permettre de vous concentrer sur le développement de votre activité.",
    ],
  },
  {
    slug: "audit-commissariat",
    title: "Audit & Commissariat",
    tagline: "Sécurisez vos comptes",
    iconId: "file-text",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600",
    heroDescription:
      "Une certification indépendante au service de la confiance. L'audit légal et contractuel renforce la crédibilité financière de votre entreprise auprès des associés, banques, investisseurs et partenaires.",
    mission:
      "Sécuriser l'information financière et renforcer la confiance.",
    sections: [
      {
        title: "Commissariat aux comptes légal",
        subtitle: "Missions légales de certification",
        items: [
          "Audit des comptes annuels",
          "Certification avec ou sans réserve",
          "Vérifications spécifiques prévues par la loi",
          "Rapport spécial sur les conventions réglementées",
        ],
        subSections: [
          {
            title: "Approche méthodologique rigoureuse",
            items: [
              "Analyse des risques",
              "Contrôle interne",
              "Tests de substance",
              "Validation des estimations comptables",
              "Évaluation de la continuité d'exploitation",
            ],
          },
        ],
      },
      {
        title: "Audit contractuel",
        items: [
          "Audit interne",
          "Audit organisationnel",
          "Audit de contrôle interne",
          "Examen limité",
        ],
      },
      {
        title: "Audit d'acquisition digital",
        subtitle: "Accompagnement des opérations de croissance externe",
        items: [
          "Acquisition d'entreprise",
          "Entrée d'investisseurs",
          "Levées de fonds",
          "Restructurations",
        ],
        subSections: [
          {
            title: "Notre approche digitalisée",
            items: [
              "Analyse rapide des données comptables",
              "Data room sécurisée",
              "Extraction et analyse automatisée des écritures",
            ],
          },
        ],
      },
      {
        title: "Due diligence approfondie",
        subSections: [
          {
            title: "Analyse financière complète",
            items: [
              "Analyse de la rentabilité réelle",
              "Reconstitution de l'EBE",
              "Analyse de la trésorerie",
              "Identification des risques fiscaux et sociaux",
              "Vérification des engagements hors bilan",
            ],
          },
          {
            title: "Identification des risques",
            items: [
              "Risques fiscaux latents",
              "Risques sociaux",
              "Dépendance clients/fournisseurs",
              "Litiges potentiels",
              "Problèmes de contrôle interne",
            ],
          },
        ],
      },
    ],
    whyChoose: [
      "Double compétence expertise comptable / commissariat aux comptes",
      "Indépendance et objectivité",
      "Approche pédagogique",
      "Méthodologie rigoureuse",
      "Outils digitaux performants",
    ],
    promise: [
      "Renforcer la fiabilité de vos comptes.",
      "Sécuriser vos opérations stratégiques.",
      "Garantir la confiance de vos partenaires.",
    ],
  },
  {
    slug: "conseil-juridique",
    title: "Conseil Juridique",
    tagline: "Sécurisez votre structure",
    iconId: "scale",
    color: "from-amber-500 to-yellow-500",
    bgColor: "bg-amber-50",
    iconColor: "text-amber-600",
    heroDescription:
      "Un accompagnement juridique structurant et sécurisé. La vie d'une entreprise est rythmée par des décisions juridiques majeures : création, modification des statuts, évolution du capital, cession de titres, restructuration…",
    mission:
      "Sécuriser vos décisions juridiques et protéger vos intérêts.",
    sections: [
      {
        title: "Création de société clé en main",
        subSections: [
          {
            title: "Analyse préalable",
            items: [
              "Votre projet",
              "Votre situation personnelle",
              "Votre régime matrimonial",
              "Votre stratégie de développement",
              "Votre fiscalité future",
            ],
          },
          {
            title: "Choix de la structure adaptée",
            items: [
              "SARL / EURL",
              "SAS / SASU",
              "SEL pour professions libérales",
              "Holding",
            ],
          },
          {
            title: "Prise en charge complète",
            items: [
              "Rédaction des statuts personnalisés",
              "Dépôt du capital",
              "Formalités auprès du guichet unique",
              "Immatriculation au RCS",
              "Mise en place des options fiscales",
            ],
          },
        ],
      },
      {
        title: "Secrétariat juridique digitalisé",
        subSections: [
          {
            title: "Gestion annuelle des obligations",
            items: [
              "Approbation des comptes annuels",
              "Rédaction des procès-verbaux d'assemblée",
              "Affectation du résultat",
              "Mise à jour des registres légaux",
            ],
          },
          {
            title: "Archivage numérique sécurisé",
            items: [
              "Registre dématérialisé",
              "Accès en ligne",
              "Historique des décisions",
              "Sécurisation documentaire",
            ],
          },
        ],
      },
      {
        title: "Modifications statutaires rapides",
        items: [
          "Changement de dirigeant",
          "Transfert de siège social",
          "Augmentation ou réduction de capital",
          "Transformation de société",
          "Cession de parts ou actions",
          "Entrée ou sortie d'associés",
        ],
      },
      {
        title: "Restructuration et opérations complexes",
        items: [
          "Apport de titres à une holding",
          "Fusion ou scission",
          "Pacte d'associés",
          "Organisation de groupes de sociétés",
          "Convention de trésorerie intra-groupe",
        ],
      },
      {
        title: "Anticipation des risques juridiques",
        items: [
          "Protéger le dirigeant",
          "Encadrer les relations entre associés",
          "Sécuriser les décisions stratégiques",
          "Prévenir les contentieux",
        ],
      },
    ],
    whyChoose: [
      "Vision globale juridique + fiscale",
      "Maîtrise des structures de groupe",
      "Réactivité et rapidité d'exécution",
      "Documents personnalisés",
      "Outils digitaux performants",
    ],
    promise: [
      "Structurer pour sécuriser.",
      "Anticiper pour protéger.",
      "Accompagner pour développer.",
    ],
  },
  {
    slug: "creation-entreprise",
    title: "Création d'Entreprise",
    tagline: "Lancez-vous sereinement",
    iconId: "briefcase",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50",
    iconColor: "text-pink-600",
    heroDescription:
      "Un accompagnement complet pour donner vie à votre projet entrepreneurial. De l'idée à la concrétisation, nous vous accompagnons à chaque étape pour sécuriser votre lancement.",
    mission:
      "Vous accompagner dans la création d'une structure adaptée à votre projet et à votre situation.",
    sections: [
      {
        title: "Étude de faisabilité",
        subSections: [
          {
            title: "Analyse de votre projet",
            items: [
              "Étude de marché",
              "Positionnement et stratégie",
              "Prévisionnel financier",
              "Plan de financement",
            ],
          },
          {
            title: "Choix de la structure optimale",
            items: [
              "SARL / EURL",
              "SAS / SASU",
              "Auto-entrepreneur",
              "Profession libérale",
            ],
          },
        ],
      },
      {
        title: "Formalités de création",
        items: [
          "Rédaction des statuts personnalisés",
          "Dépôt du capital",
          "Immatriculation au RCS",
          "Formalités auprès du guichet unique",
          "Ouverture du compte bancaire professionnel",
        ],
      },
      {
        title: "Démarches administratives",
        items: [
          "Inscription aux organismes sociaux",
          "Options fiscales (TVA, IR/IS)",
          "Domiciliation professionnelle",
          "Assurances professionnelles",
        ],
      },
      {
        title: "Accompagnement post-création",
        items: [
          "Mise en place de la comptabilité",
          "Premières déclarations",
          "Suivi personnalisé",
          "Conseil stratégique",
        ],
      },
    ],
    whyChoose: [
      "Expertise complète création + gestion",
      "Accompagnement personnalisé",
      "Rapidité d'exécution",
      "Tarification transparente",
      "Suivi post-création",
    ],
    promise: [
      "Vous lancer avec une structure sécurisée.",
      "Concentrer votre énergie sur votre activité.",
      "Bénéficier d'un partenaire de confiance dès le départ.",
    ],
  },
];

export function getServiceBySlug(slug: string): ServiceData | undefined {
  return SERVICES.find((s) => s.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return SERVICES.map((s) => s.slug);
}
