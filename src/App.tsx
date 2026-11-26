import { useEffect, useState } from "react";

type Field = "Tous" | "Territoires" | "Services" | "Objets" | "Transmission";

type Project = {
  id: string;
  number: string;
  title: string;
  shortTitle: string;
  field: Exclude<Field, "Tous">;
  meta: string;
  year: string;
  image: string;
  imagePosition?: string;
  context: string;
  approach: string[];
  results: { value: string; label: string }[];
  contribution: string;
  tags: string[];
  evidence: string[];
  caution?: string;
};

const fieldColors: Record<Exclude<Field, "Tous">, string> = {
  Services: "#ff5a36",
  Objets: "#7fa66b",
  Territoires: "#72a9c2",
  Transmission: "#a987b8",
};

const images = {
  lagoon:
    "src/imports/rua.jpg",
  soap: "src/imports/couv-savon.png",
  city: "src/imports/central-projet.png",
  park: "src/imports/solaize.png",
  monod: "src/imports/monod.jpg",
  workshop:
    "src/imports/eddia-prototypage.jpg",
  sgar: "src/imports/atelier-refugier.jpg",
  notes: "src/imports/app-migrant.JPG",
  situ: "https://images.unsplash.com/photo-1674764809937-4eb93b7d587d?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&q=85&w=1600",
  dreal: "src/imports/dreal.jpg",
  dinsi: "src/imports/interface-grandlyon.jpg",
  communay: "src/imports/communay.png",
  latoile: "src/imports/latoile.jpg",
};

const gallerySets = {
  lagoon: [
      "src/imports/rua/cartographie.png",
     "src/imports/rua/IMG_1257.jpg",
     "src/imports/rua/IMG_1265.jpg",
     "src/imports/rua/signal_red.jpg",
     "src/imports/rua/IMG_1286 copie.jpg",
     "src/imports/rua/IMG_1274.jpg",
  ],
  object: [
    "src/imports/savon/cartographie.png",
    "src/imports/savon/poster.png",
    "src/imports/savon/proto-2.png",
    "src/imports/savon/visuel-proto.png",
    "src/imports/savon/proto-1.png",
    "src/imports/savon/proto-3.png",
     "src/imports/savon/representation2.png",

  ],
  mobility: [
    "src/imports/centrale/ideation.png",
    "src/imports/centrale/atelier-cabucelle.png",
    "src/imports/centrale/joliette.png",
    "src/imports/centrale/charge.png",
    "src/imports/centrale/pass-famille.png",
    "src/imports/centrale/pass-entreprise.png",
    "src/imports/centrale/vue-centrale.png",
    "src/imports/centrale/mediation.png",
    "src/imports/centrale/mobilité-douce.png",
    "src/imports/centrale/autopartage.png",
    "src/imports/centrale/restitution.jpg",


  ],
  blancherie: [
    "src/imports/blancherie/coupe-a.png",
    "src/imports/blancherie/plan-masse.png",
    "src/imports/blancherie/pont-simple.png",
    "src/imports/blancherie/coupe-b.png",
    "src/imports/blancherie/pontonavecbanc.png",
    "src/imports/blancherie/pergola.png",
    "src/imports/blancherie/local-poubelle.png",
  ],
  monod: [
    "src/imports/monod/enssemble-monod.PNG",
    "src/imports/monod/enjeux-monod.png",
    "src/imports/monod/objectif.PNG",
    "src/imports/monod/scenario3.jpg",
    "src/imports/monod/PROFILS18.jpg",
    "src/imports/monod/PROFILS6.jpg",
    "src/imports/monod/PROFILS10.jpg",
    "src/imports/monod/PROFILS14.jpg",
    "src/imports/monod/PROFILS17.jpg",
  ],

  eddia: [
    "src/imports/edd-ia/EDD-IA-PROTOTYPAGE-1.jpg",
    "src/imports/edd-ia/immession-edd.jpg",
    "src/imports/edd-ia/pacours.jpg",
    "src/imports/edd-ia/EDD-IA-PROTOTYPAGE-4.jpg",

    "src/imports/edd-ia/resitution-edd-ia.jpg",
    "src/imports/edd-ia/restitution-edd-2.jpg",
  ],
  landscape: [
    "https://images.unsplash.com/photo-1697504297340-873ef481b8e8?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1683048954789-13e06e9ad7d2?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1788100213561-f5299d78e02c?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1790584555009-3918b01dcda5?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1788100242143-0cc65ffb4505?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1788248009241-018884116e61?auto=format&fit=crop&q=82&w=1400",
  ],

  learning: [
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1758270704925-fa59d93119c1?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1638957835514-224c57ffe617?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1758270704021-361c165d68fd?auto=format&fit=crop&q=82&w=1400",
    "https://images.unsplash.com/photo-1758270704587-43339a801396?auto=format&fit=crop&q=82&w=1400",
  ],
  energy: [
     
        "src/imports/dinsi/Frame.png",
       

  ],
 
  integration: [
    "src/imports/integration-sprint/immersion-1.png",
    "src/imports/integration-sprint/outil-1.JPG",
    "src/imports/integration-sprint/homme-outil.JPG",
    "src/imports/integration-sprint/outil-2.JPG",
    "src/imports/integration-sprint/outil-3.JPG",
    "src/imports/integration-sprint/outil-4.JPG",
    "src/imports/integration-sprint/Cartographie-acteur.jpg",
    "src/imports/integration-sprint/tiers-lieu.png",
    "src/imports/integration-sprint/parole-liberee.png",
    "src/imports/integration-sprint/storybord-2.jpg",
    "src/imports/integration-sprint/storybord-3.jpg",
    "src/imports/integration-sprint/fle.png",

  ],
  coordination: [
    "src/imports/coordination/mockup.png",
    "src/imports/coordination/interface/dossier.jpg",
    "src/imports/coordination/interface/dossier-probleme-discussion.jpg",
    "src/imports/coordination/wireframe.png",
    "src/imports/coordination/interface/contact.jpg",
    "src/imports/coordination/interface/nouveau-dossier.jpg",
    "src/imports/coordination/communaute.png",


  ],
  agrement : [
     "src/imports/dreal/storyboard-harmonisation-des-pratiques.png",
     "src/imports/dreal/atelier1.jpg",
      "src/imports/dreal/atelier2.jpg",
     "src/imports/dreal/prototype.png",
  

  ],
  communay : [
    "src/imports/communay/c-perspective.png",
    "src/imports/communay/3D.png",
    "src/imports/communay/coupe.png",
  
    "src/imports/communay/croquis-detail.png",
    "src/imports/communay/plan-2d.png",
    "src/imports/communay/plan-2d-detail.png",


  ]

};

function getProjectGallery(project: Project) {
  if (project.id === "rua") return gallerySets.lagoon;
  if (project.id === "savon") return gallerySets.object;
  if (project.id === "mobilite") return gallerySets.mobility;
  if (project.id === "energie") return gallerySets.energy;
  if (project.id === "toile") return gallerySets.learning;
  if (project.id === "blancherie") return gallerySets.blancherie;
  if (project.id === "monod") return gallerySets.monod;
  if (project.id === "edd-ia") return gallerySets.eddia;
  if (project.id === "integration") return gallerySets.integration;
  if (project.id === "coordination") return gallerySets.coordination;
  if (project.id === "agrement") return gallerySets.agrement;
  if (project.id === "communay") return gallerySets.communay;
  return gallerySets.workshop;

}
const projects: Project[] = [
  {
    id: "rua",
    number: "01",
    field: "Services",
    image: images.lagoon,
    year: "2026",
    title: "Mettre à l’épreuve un balisage lumineux pour protéger la lagune",
    shortTitle: "Expérimentation territoriale, Bassin de Thau ",
    meta: "SMBT · Syndicat Mixte du Bassin de Thau ",
    context:
      "Le Syndicat Mixte du Bassin de Thau souhaitait confronter aux conditions réelles de navigation un dispositif numérique et lumineux aidant les plaisanciers à éviter les espaces naturels protégés de la lagune.",
    approach: [
      "Concevoir le protocole et structurer la phase expérimentale",
      "Confronter trois configurations du prototype à la navigation réelle",
      "Coordonner 25 tests, observer les usages et analyser les données",
      "Formuler cinq scénarios pour éclairer la décision du SMBT",
    ],
    results: [
      { value: "3", label: "configurations éprouvées" },
      { value: "25", label: "tests en navigation" },
      { value: "5", label: "scénarios d’aide à la décision" },
    ],
    contribution:
      "Consultant en expérimentation territoriale : conception et pilotage de la phase de test, coordination et réalisation des essais, analyse complète des données de terrain et formulation des cinq scénarios de développement.",
    tags: ["Protocole", "Terrain", "TRL", "Aide à la décision"],
    evidence: [
      "Trois prototypes",
      "Tests en navigation",
      "Protocole et grille d’observation",
      "Synthèse des résultats",
      "Cinq scénarios",
    ],
    caution:
      "La compréhension des signaux a été validée et des limites techniques identifiées. L’expérimentation ne valide ni l’efficacité globale, ni la fiabilité technique, ni la généralisation du dispositif. La décision du SMBT reste en attente.",
  },
  {
    id: "savon",
    number: "02",
    field: "Objets",
    image: images.soap,
    year: "2022",
    title: "Réinventer les usages du savon solide par le design produit",
    shortTitle: "Conception d'un packaging réutilisable",
    meta: "Aphylle Savon",
    context:
      "Pour Aphylle Savon, l’enjeu était de concevoir un packaging et de nouveaux usages facilitant l’intégration du savon solide dans les habitudes quotidiennes : conservation, transport, hygiène perçue et fin de vie.",
    approach: [
      "Observer et documenter les pratiques, notamment lors d’une d'observation et d'entretiens utilisateurs",
      "Concevoir trois propositions fondées sur des principes différents",
      "Les faire tester pendant un mois avec entretiens et carnets de bord",
      "Sélectionner une piste puis la faire évoluer en trois itérations",
    ],
    results: [
      { value: "3", label: "propositions de solutions testées" },
      { value: "2 mois", label: "de test en conditions réelles" },
      { value: "3", label: "itérations de la piste retenue" },
    ],
    contribution:
      "Étude des usages et immersion, formulation des hypothèses, conception des trois propositions, prototypage physique, préparation et conduite des tests, analyse, itérations et pilotage du projet.",
    tags: ["UX", "Matière", "Packaging", "Produit"],
    evidence: [
      "Photos d’immersion",
      "Synthèse des usages",
      "Dessins et modèles 3D",
      "Essais matière",
      "Prototypes et tests",
    ],
    caution:
      "Un prototype fonctionnel et des plans ont été transmis. Ils ne doivent pas être présentés comme un produit commercialisé ou industrialisé.",
  },
  {
    id: "mobilite",
    number: "03",
    field: "Services",
    image: images.city,
    imagePosition: "center 65%",
    year: "2023",
    title: "Imaginer une offre de mobilité ancrée dans les pratiques d’un quartier",
    shortTitle: "Imaginer la centrale de mobilité · Quartier des Fabriques",
    meta: "Euroméditerranée · Efficacity · VraimentVraiment",
    context:
      "À Marseille, la mission visait à donner une forme concrète à une centrale de mobilité adaptée aux habitants, salariés, commerçants et acteurs logistiques du quartier des Fabriques.",
    approach: [
      "Mener la recherche documentaire, les entretiens et les immersions",
      "Établir un diagnostic partagé des pratiques et contraintes",
      "Animer concertation, co-conception et accélérateur de projets",
      "Scénariser des services et articuler court et long terme",
    ],
    results: [
      { value: "3", label: "scénarios complémentaires" },
      { value: "2", label: "horizons d’action à court terme" },
      { value: "1", label: "plan d’action partagé" },
    ],
    contribution:
      "Pilotage de l’immersion, préparation et animation des ateliers, conception des services et scénarios, puis restitution auprès d’Euroméditerranée et des chercheurs, en collaboration avec VraimentVraiment.",
    tags: ["Mobilité", "Immersion", "Facilitation", "Service"],
    evidence: [
      "Cartographie des acteurs",
      "Guides d’entretien",
      "Diagnostic mobilité",
      "Supports d’atelier",
      "Scénarios et plan d’action",
    ],
    caution:
      "Les critères de comparaison ont préparé l’expérimentation ultérieure. La conception des scénarios ne doit pas être confondue avec leur déploiement effectif.",
  },
  {
    id: "blancherie",
    number: "04",
    field: "Territoires",
    image: images.park,
    year: "2022",
    title: "Donner forme à un paysage habité, du plan au détail technique",
    shortTitle: "Conception paysagère et micro-architecture · Chemin de la Blancherie",
    meta: "Kaufman & Broad · reGénération · Nachampassak",
    context:
      "À Solaize, le projet compose un paysage habité entre frange boisée, placette, jardin cultivé, ravine de gestion des eaux pluviales et cheminements reliés au centre-ville.",
    approach: [
      "Développer cinq séquences paysagères cohérentes",
      "Articuler usages, strates végétales, eau et circulations",
      "Détailler mobilier urbain et micro-architectures",
      "Traduire la composition en pièces techniques de phase PRO",
    ],
    results: [
      { value: "05", label: "séquences paysagères" },
      { value: "PRO", label: "phase développée" },
      { value: "Réalisé", label: "quartier construit" },
    ],
    contribution:
      "Paysagiste concepteur au sein de reGénération : ajustements paysagers, carnet de détails du mobilier et des micro-architectures, nivellement, estimatifs et pièces techniques.",
    tags: ["Paysage", "Phase PRO", "Eau", "Détail"],
    evidence: [
      "Plan masse paysager",
      "Plans de nivellement",
      "Coupes",
      "Carnet de détails",
      "CCTP et estimatifs",
    ],
  },
  {
    id: "monod",
    number: "05",
    field: "Territoires",
    image: images.monod,
    year: "2022",
    title: "Recomposer les espaces collectifs pour relier le quartier à la ville",
    shortTitle: " Urbanisme conseil · Etude paysagère · Résidence Monod",
    meta: "reGénération · Atelier Urba-Site · GrandLyon Metropole",
    context:
      "Sur le site de l’ancienne cité Olivier de Serres, le projet interroge les limites, les accès et les espaces communs de la résidence Monod pour mieux la relier au quartier de Cusset.",
    approach: [
      "Analyser l’enclavement, les accès et les continuités piétonnes",
      "Explorer une place ronde ouverte et identifiable",
      "Étudier une liaison diagonale vers Cusset",
      "Comparer ces pistes à une allée centrale reconfigurée",
    ],
    results: [
      { value: "3", label: "scénarios de composition" },
      { value: "1", label: "diagnostic spatial" },
      { value: "1", label: "plan-guide" },
    ],
    contribution:
      "Paysagiste-urbaniste conseil au sein de reGénération : analyse spatiale, élaboration des scénarios et traduction en schémas, plans 2D, croquis et supports du plan-guide.",
    tags: ["Urbanisme", "Paysage", "Diagnostic", "Plan-guide"],
    evidence: [
      "Diagnostic spatial",
      "Schémas des accès et limites",
      "Plans des scénarios",
      "Plan-guide",
      "Croquis de composition",
    ],
    caution:
      "Le scénario retenu, les arbitrages et les suites opérationnelles restent à documenter.",
  },
  {
    id: "edd-ia",
    number: "06",
    field: "Services",
    image: images.workshop,
    year: "Workshop ",
    title: "Outiller les discussions au travail pour transformer les pratiques",
    shortTitle: "Bien-être au travail · EDD-IA",
    meta: "Métropole de Lyon · Erasme",
    context:
      "Ce workshop explorait la manière dont les données ouvertes et un service numérique pourraient faciliter la remontée des problèmes, la structuration des discussions au travail et le suivi des actions.",
    approach: [
      "Interroger des professionnels RH et une association du droit au travail",
      "Observer les situations et construire des parcours utilisateurs",
      "Concevoir deux points de vue : collaborateur et facilitation",
      "Prototyper puis présenter le concept à des acteurs publics et privés",
    ],
    results: [
      { value: "3 sem.", label: "de workshop intensif" },
      { value: "2", label: "interfaces complémentaires" },
      { value: "1", label: "prototype présenté et testé" },
    ],
    contribution:
      "Designer au sein de l’équipe : recherche et observation, parcours utilisateurs, conception des interfaces, prototypage et restitution.",
    tags: ["Travail", "Service", "Interface", "Prototype"],
    evidence: [
      "Photos d’atelier",
      "Parcours utilisateurs",
      "Outil ethnographique",
      "Wireframes",
      "Prototype et restitution",
    ],
    caution:
      "Le concept n’a pas été retenu pour une phase de développement. Les fonctions d’IA décrivent une intention de service, pas un système techniquement abouti.",
  },
  {
    id: "integration",
    number: "07",
    field: "Services",
    image: images.sgar,
    year: "2020",
    title: "Identifier les ruptures de parcours de l'intégration et améliorer l’accompagnement",
    shortTitle: "Améliorer l'intégration des personnes réfugié.es en milieu rural",
    meta: "SGAR Auvergne-Rhône-Alpes · La public Factory",
    context:
      "Au SGAR Auvergne-Rhône-Alpes, la démarche cherchait à comprendre les ruptures dans les parcours d’intégration des personnes réfugiées et les difficultés de coordination entre acteurs en milieu rural.",
    approach: [
      "Mener deux jours d’immersion dans le Cantal avec cinq étudiants",
      "Cartographier ruptures, acteurs et piliers de l’intégration",
      "Animer des ateliers dans l’Ain, le Cantal et l’Ardèche",
      "Formuler propositions, storyboards et scénarios articulés",
    ],
    results: [
      { value: "03", label: "territoires associés" },
      { value: "02j", label: "d’immersion initiale" },
      { value: "Régional", label: "recommandations intégrées à des plans" },
    ],
    contribution:
      "Designer et facilitateur salarié du SGAR et du laboratoire Archipel : immersion, conception d’outils, animation collective et transformation des observations en recommandations.",
    tags: ["Innovation publique", "Facilitation", "Cartographie", "Récit"],
    evidence: [
      "Photos d’immersion",
      "Cartographies des parcours",
      "Supports d’atelier",
      "Storyboards",
      "Synthèse des recommandations",
    ],
    caution:
      "Certaines pistes, notamment autour de l’apprentissage du français, nécessitaient un approfondissement spécialisé avant prototypage.",
  },
  {
    id: "coordination",
    number: "08",
    field: "Services",
    image: images.notes,
    year: "Exploration",
    title: "Concevoir un outil numérique pour faciliter la coopération",
    shortTitle: "Outil de coordination des acteurs de l’intégration",
    meta: "Projet personnel",
    context:
      "Cette exploration prolonge les constats du projet d’intégration en milieu rural en imaginant un outil de mise en relation, de partage de compétences et de circulation d’informations entre aidants.",
    approach: [
      "Formaliser les rôles et un modèle de communauté d’aidants",
      "Écrire un storyboard du service",
      "Structurer dossiers, discussions, contact et messagerie",
      "Concevoir les interfaces et wireframes sur Figma",
    ],
    results: [
      { value: "1", label: "storyboard de service" },
      { value: "Figma", label: "maquette fonctionnelle" },
      { value: "0", label: "test utilisateur documenté" },
    ],
    contribution:
      "Initiative personnelle : traduction de constats de terrain en proposition de service, architecture fonctionnelle, wireframes et représentation des principales fonctionnalités.",
    tags: ["Coopération", "UX", "Wireframes", "Exploration"],
    evidence: [
      "Storyboard",
      "Cartographie des rôles",
      "Modèle de communauté",
      "Architecture fonctionnelle",
      "Captures du prototype",
    ],
    caution:
      "Projet exploratoire non abouti : la proposition est restée au stade de la maquette, sans développement ni expérimentation.",
  },
  {
    id: "energie",
    number: "09",
    field: "Services",
    image: images.dinsi,
    year: "2018",
    title: "Rendre les consommations d’énergie compréhensibles",
    shortTitle: "Service numérique a destination des citoyens",
    meta: "Métropole de Lyon · DINSI",
    context:
      "Le service numérique devait aider les citoyens à comprendre leurs consommations d’eau, de gaz et d’électricité et accompagner l’évolution de leurs comportements.",
    approach: [
      "Nourrir la conception par des entretiens et immersions",
      "Mobiliser le modèle transthéorique du changement",
      "Explorer compréhension, visualisation et accompagnement",
      "Concevoir les parcours, wireframes et visualisations de données",
    ],
    results: [
      { value: "3", label: "fluides rendus lisibles" },
      { value: "6", label: "interfaces conçues" },
      { value: "1", label: "parcours d’accompagnement" },
    ],
    contribution:
      "Contribution UX/UI et conception de service : recherche, architecture du parcours, wireframes, interfaces et visualisations de données.",
    tags: ["Énergie", "UX/UI", "Dataviz", "Comportements"],
    evidence: [
      "Parcours utilisateurs",
      "Extraits de recherche",
      "Architecture du service",
      "Six interfaces",
      "Visualisations de données",
    ],
    caution:
      "Le périmètre personnel, les tests utilisateurs et le statut final du service restent à confirmer.",
  },
  {
    id: "agrement",
    number: "10",
    field: "Services",
    image: images.dreal,
    year: "2021",
    title: "Simplifier le parcours d’agrément du logement social",
    shortTitle: "Faciliter la coordination des acteurs publics et privés",
    meta: "DREAL Auvergne-Rhône-Alpes",
    context:
      "Le projet partait des différences entre processus départementaux d’agrément et cherchait à faciliter le partage d’informations entre bailleurs et services administratifs.",
    approach: [
      "Cartographier les processus et besoins de partage",
      "Envisager une plateforme collaborative et ses fonctions",
      "Confronter la proposition aux outils SPLS, Galion et OSMOS",
      "Réorienter le travail vers un storyboard de l’expérience",
    ],
    results: [
      { value: "1", label: "piste confrontée à l’existant" },
      { value: "OSMOS", label: "outil couvrant une partie des besoins" },
      { value: "1", label: "storyboard du parcours" },
    ],
    contribution:
      "Recherche, analyse de l’existant, participation à la réorientation de la proposition et représentation du parcours de service.",
    tags: ["Service public", "Parcours", "Outils", "Storyboard"],
    evidence: [
      "Cartographie des processus",
      "Inventaire des outils",
      "Schéma du parcours",
      "Storyboard",
      "Supports d’atelier",
    ],
    caution:
      "Le rôle personnel précis, les recommandations finales et les suites données restent à documenter.",
  },
  {
    id: "communay",
    number: "11",
    field: "Territoires",
    image: images.communay,
    year: "2022",
    title: "Faire de la cour d’école un lieu de fraîcheur, de découverte et d'apprentissage",
    shortTitle: "Conception paysagère · École Minicipale de Communay",
    meta: "reGénération · Roda Architectes",
    context:
      "Le concours proposait d’améliorer la qualité paysagère de l’école, de créer des îlots de fraîcheur, de végétaliser et désimperméabiliser les cours, et d’ouvrir certains espaces au public.",
    approach: [
      "Structurer les usages autour d’apprendre, jouer, se dépenser et découvrir",
      "Développer les intentions de fraîcheur et de végétalisation",
      "Produire croquis, plans à l’échelle et coupes",
      "Contribuer aux perspectives, vues 3D et au dossier complet",
    ],
    results: [
      { value: "4", label: "intentions d’usage" },
      { value: "Concours", label: "réponse complète produite" },
      { value: "Non", label: "candidature non retenue" },
    ],
    contribution:
      "Paysagiste concepteur au sein de l’équipe : réalisation de croquis et de plans à l’échelle, et contribution à la réponse complète avec les architectes.",
    tags: ["École", "Paysage", "Fraîcheur", "Concours"],
    evidence: ["Plan masse", "Esquisses", "Coupes", "Perspectives et vues 3D", "Schémas d’usages"],
    caution:
      "Le concours n’ayant pas été remporté, la proposition est restée au stade de la conception.",
  },
  {
    id: "toile",
    number: "12",
    field: "Transmission",
    image: images.latoile,
    year: "Depuis 2024",
    title: "Rendre le design et le numérique accessibles à des publics variés",
    shortTitle: "Formation à la conception & au développement web",
    meta: "emlyon business school · La Toile",
    context:
      "La Toile accompagne des adultes aux parcours et niveaux variés, dont certaines personnes éloignées de l’emploi ou de la formation, vers le développement web, le web design, l’UX/UI et le design de service.",
    approach: [
      "Concevoir des exercices pratiques et des projets progressifs",
      "Adapter supports, consignes et rythmes à chaque groupe",
      "Animer mises en situation, retours, évaluations et rituels",
      "Accompagner individuellement les apprenants",
    ],
    results: [
      { value: "04", label: "promotions accompagnées" },
      { value: "≈30", label: "apprenants par promotion" },
      { value: "HTML—UX", label: "compétences enseignées" },
    ],
    contribution:
      "Formateur à mi-temps depuis 2024 : conception et animation de séquences, accompagnement, adaptation des supports et participation au suivi pédagogique.",
    tags: ["Pédagogie", "Web", "UX/UI", "Accompagnement"],
    evidence: [
      "Supports de cours",
      "Exercices et consignes",
      "Projets anonymisés",
      "Grilles d’évaluation",
      "Parcours pédagogiques",
    ],
    caution:
      "Les volumes connus ne sont pas présentés comme un indicateur individuel. Aucune information personnelle concernant les apprenants n’est exposée.",
  },
];
const fields = ["Tous", "Territoires", "Services", "Objets", "Transmission"] as Field[];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d={diagonal ? "M5 19 19 5M8 5h11v11" : "M4 12h16M14 6l6 6-6 6"} />
    </svg>
  );
}

function Logo() {
  return (
    <a className="logo" href="#accueil" aria-label="Retour à l’accueil">
      <span>j</span>
      <i />
      <span>c</span>
    </a>
  );
}

function App() {
  const [filter, setFilter] = useState<Field>("Tous");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = activeProject || menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject, menuOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveProject(null);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const visibleProjects =
    filter === "Tous" ? projects : projects.filter((project) => project.field === filter);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <Logo />
        <nav
          className={menuOpen ? "main-nav is-open" : "main-nav"}
          aria-label="Navigation principale"
        >
          <a href="#projets" onClick={closeMenu}>
            Projets
          </a>
          <a href="#accompagnement" onClick={closeMenu}>
            Accompagnement
          </a>
          <a href="#situ" onClick={closeMenu}>
            Situs Studio
          </a>
          <a href="#a-propos" onClick={closeMenu}>
            À propos
          </a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>
            Contact <Arrow diagonal />
          </a>
        </nav>
        <button
          className="menu-button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span />
          <span />
        </button>
      </header>

      <section id="accueil" className="hero page-wrap">
        <div className="hero-kicker">
          <span>Designer transversal</span>
          <span>Lyon · France</span>
          <span>Disponible pour collaborer</span>
        </div>
        <div className="hero-title-wrap">
          <h1>
            Donnez forme
            <br />
            à vos idées
          </h1>
        </div>
        <div className="hero-bottom">
          <p>
            Je conçois des réponses situées, du <strong>territoire</strong> au{" "}
            <strong>service</strong> et de <strong> l'objet</strong> à <strong> l'espace</strong> en reliant enquête,
            conception, prototypage et expérimentation.

          </p>
          <a className="text-link" href="#projets">
            Découvrir les projets <Arrow />
          </a>
        </div>
      </section>

      <section className="manifesto">
        <div className="page-wrap manifesto-grid">
          <p className="section-label">01 — Positionnement</p>
          <blockquote>
            Je m’intéresse à la manière dont les choses prennent forme <em>dans le réel.</em>
          </blockquote>
          <div className="manifesto-copy">
            <p>
              J’interviens sur des projets d’intérêt général et des situations de conception
              variées. Je cherche à comprendre les contextes et les usages, à faire émerger des
              réponses adaptées et à leur donner forme par la conception, le prototypage et
              l’expérimentation.
            </p>
            <div className="field-list">
              <span>Territoires & milieux</span>
              <span>Services & organisations</span>
              <span>Objets & expériences</span>
              <span>Transmission</span>
            </div>
          </div>
        </div>
      </section>

      <section id="projets" className="projects-section page-wrap">
        <div className="section-heading">
          <div>
            <p className="section-label">02 — Projets sélectionnés</p>
            <h2>
              Une même posture,
              <br />
              plusieurs échelles
            </h2>
          </div>
          <p className="section-intro">
            La sélection alterne espaces, services, objets et pédagogie. Elle se lit par enjeu,
            plutôt que par discipline.
          </p>
        </div>

        <div className="filters" aria-label="Filtrer les projets">
          {fields.map((field) => (
            <button
              key={field}
              className={filter === field ? "active" : ""}
              style={
                {
                  "--filter-color": field === "Tous" ? "#171815" : fieldColors[field],
                } as React.CSSProperties
              }
              onClick={() => setFilter(field)}
              aria-pressed={filter === field}
            >
              {field}
              <sup>
                {field === "Tous"
                  ? projects.length
                  : projects.filter((p) => p.field === field).length}
              </sup>
            </button>
          ))}
        </div>

        <div className="project-grid">
          {visibleProjects.map((project) => (
            <article
              className="project-card card-1"
              key={project.id}
              style={{ "--accent": fieldColors[project.field] } as React.CSSProperties}
            >
              <button
                className="project-open"
                type="button"
                onClick={() => setActiveProject(project)}
                aria-label={`Découvrir le projet ${project.shortTitle}`}
              >
                <div className="project-image-wrap">
                  <img
                    src={project.image}
                    alt=""
                    loading="lazy"
                    style={{ objectPosition: project.imagePosition }}
                  />
                  <span className="project-number">{project.number}</span>
                  <span className="project-arrow" aria-hidden="true">
                    <Arrow diagonal />
                  </span>
                  <span className="image-note">{project.field}</span>
                </div>
                <div className="project-card-copy">
                  <div className="project-meta">
                    <span>{project.meta}</span>
                    {/* <span>{project.year}</span> */}
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.shortTitle}</p>
                </div>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section id="accompagnement" className="support-section">
        <div className="page-wrap">
          <div className="support-heading">
            <p className="section-label">03 — Accompagnement indépendant</p>
            <h2>
              Accompagner
              <br />
              vos projets
            </h2>
            <p className="support-lead">
              Du premier questionnement à la mise en œuvre, je vous accompagne pour donner forme à
              vos idées et construire des réponses adaptées à vos enjeux.
            </p>
          </div>

          <div className="support-intro">
            <p className="support-index">Depuis 2020</p>
            <p>
              Designer indépendant et consultant en innovation, j’interviens auprès de
              collectivités, d’organisations et de porteurs de projets d’intérêt général. Je
              mobilise les méthodes du design pour comprendre les situations, associer les personnes
              concernées et transformer les besoins identifiés en pistes d’action concrètes.
            </p>
          </div>

          <div className="support-contributions">
            <p className="section-label">Ce que je peux apporter</p>
            <div className="contribution-list">
              {[
                [
                  "01",
                  "Comprendre et diagnostiquer",
                  "Enquêtes de terrain, entretiens, observation des usages, analyse des besoins et des situations.",
                ],
                [
                  "02",
                  "Concevoir et imaginer",
                  "Ateliers de co-conception, exploration de scénarios, conception de services, d’objets et de dispositifs.",
                ],
                [
                  "03",
                  "Prototyper et expérimenter",
                  "Maquettes, prototypes, tests utilisateurs et mises à l’épreuve des solutions envisagées.",
                ],
                [
                  "04",
                  "Transmettre et accompagner",
                  "Formation, facilitation, accompagnement d’équipes et appropriation des méthodes de conception.",
                ],
              ].map(([number, title, text]) => (
                <article className="contribution-row" key={number}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="support-terms">
            <p className="section-label">Modalités d’intervention</p>
            <p>
              Selon les besoins, je peux intervenir sur une étape précise ou accompagner un projet
              dans sa globalité, seul ou en collaboration avec d’autres professionnels.
            </p>
          </div>

          <div className="support-paths">
            <article>
              <span>01 / Une pratique transversale</span>
              <h3>Accompagnement indépendant</h3>
              <p>Des interventions adaptées aux besoins et au contexte de chaque projet.</p>
              <a href="mailto:jorischambat@ik.me">
                Échanger sur un projet <Arrow />
              </a>
            </article>
            <article className="situ-path">
              <span>02 / Une démarche spécifique</span>
              <h3>Situs Studio</h3>
              <p>
                Une méthode structurée d’expérimentation territoriale pour éclairer une décision.
              </p>
              <a href="https://situstudio.fr/" target="_blank">
                Découvrir la démarche <Arrow />
              </a>
            </article>
          </div>

          <div className="support-cta">
            <div>
              <p>Vous avez un projet ou un besoin d’accompagnement ?</p>
              <p>Échangeons sur votre situation et la manière dont je pourrais contribuer.</p>
            </div>
            <a href="mailto:jorischambat@ik.me">
              <span>Parler de votre projet</span>
              <Arrow diagonal />
            </a>
          </div>
        </div>
      </section>

      <section id="approche" className="approach-section">
        <div className="page-wrap">
          <div className="section-heading light">
            <div>
              <p className="section-label">04 — Approche</p>
              <h2>
                Du terrain
                <br />
                à la forme
              </h2>
            </div>
            <p className="section-intro">
              Chaque projet suit son propre chemin. Quatre gestes structurent néanmoins la pratique.
            </p>
          </div>
          <div className="approach-list">
            {[
              [
                "01",
                "Comprendre",
                "Enquêter, observer et cartographier les situations, les usages et les contraintes.",
              ],
              [
                "02",
                "Concevoir",
                "Formuler, co-concevoir et explorer des scénarios spatiaux, serviciels ou numériques.",
              ],
              [
                "03",
                "Matérialiser",
                "Esquisser, prototyper et rendre les hypothèses discutables, testables et appropriables.",
              ],
              [
                "04",
                "Expérimenter",
                "Confronter les prototypes au terrain et produire des supports pour décider.",
              ],
            ].map(([number, title, text]) => (
              <div className="approach-row" key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="situ" className="transmission page-wrap">
        <div className="transmission-visual">
          <img
            src={images.situ}
            alt="Table de travail avec carnets et outils de conception"
            loading="lazy"
          />
          <div className="visual-tag">Situs Studio</div>
          <div className="visual-caption">
            Faire à petite échelle pour décider à grande échelle.
          </div>
        </div>
        <div className="transmission-copy">
          <p className="section-label">05 — Démarche spécifique</p>
          <h2>
            Éprouver avant
            <br />
            de déployer.
          </h2>
          <p className="lead">
            Avec Situs Studio, j’accompagne les collectivités dans la structuration de leurs
            expérimentations territoriales.
          </p>
          <p>
            Avant d’engager un investissement ou un déploiement, nous testons les solutions en
            conditions réelles afin de produire des preuves locales sur leur fiabilité, leur usage
            et leur faisabilité opérationnelle.
          </p>
          <ul>
            <li>
              <span>01</span> Cadrer les hypothèses, indicateurs et décisions possibles
            </li>
            <li>
              <span>02</span> Tester à une échelle maîtrisée avec les acteurs du territoire
            </li>
            <li>
              <span>03</span> Décider : déployer, adapter, prolonger ou arrêter
            </li>
          </ul>
          <a className="situ-link" href="https://situstudio.fr" target="_blank" rel="noreferrer">
            Découvrir Situs Studio <Arrow diagonal />
          </a>
        </div>
      </section>

      <section id="a-propos" className="about-section page-wrap">
        <p className="section-label">06 — À propos</p>
        <div className="about-grid">
          <h2>
            Designers,
            <br />
            au pluriel
          </h2>
          <div className="about-copy">
            <p className="lead">
              Mon parcours s’est construit entre innovation publique, conception paysagère, services
              numériques et pédagogie.
            </p>
            <p>
              Cette diversité nourrit ma capacité
              à lire une situation, dialoguer avec celles et ceux qui la vivent, puis traduire des
              intentions en formes concrètes.
            </p>
          </div>
          <div className="timeline">
            <div>
             
              <strong>Formation & facilitation</strong>
              <small>Conception d'animation et de pédagogie </small>
              <small>Intelligence collective & co-conception</small>
            </div>
            <div>
             
              <strong>Product Design</strong>
              <small>Innovation & services</small>
              <small>Produit & interfaces</small>
            </div>
            <div>
            
              <strong>Recherche utilisateur</strong>
              <small>Éthnographie & UX research</small>
              <small>Test & Expérimentation territoriale</small>
            </div>
            <div>
          
              <strong>Design d'esapce</strong>
              <small>Conception paysagère & Urbanisme conseil</small>
               <small>Micro-architecture</small>
            </div>
          </div>
        </div>
      </section>

      <footer id="contact" className="footer">
        <div className="page-wrap">
          <p className="section-label">07 — Contact</p>
          <a className="footer-cta" href="mailto:jorischambat@ik.me">
            <span>Un projet, une question ?</span>
            <strong>Échangeons.</strong>
            <i>
              <Arrow diagonal />
            </i>
          </a>
          <div className="footer-bottom">
            <Logo />
            <p>Designer transversal & consultant en innovation</p>
            <a href="#accueil">Retour en haut ↑</a>
          </div>
        </div>
      </footer>

      {activeProject && (
        <div
          className="project-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="project-title"
        >
          <button
            className="modal-backdrop"
            aria-label="Fermer"
            onClick={() => setActiveProject(null)}
          />
          <div className="modal-panel">
            <div className="modal-top">
              <span>{activeProject.number} / Étude de cas</span>
              <button onClick={() => setActiveProject(null)} aria-label="Fermer l’étude de cas">
                <span />
                <span />
              </button>
            </div>
            <div
              className="modal-hero"
              style={{ "--accent": fieldColors[activeProject.field] } as React.CSSProperties}
            >
              <div>
                <p>
                  {activeProject.field} · {activeProject.meta}
                </p>
                <h2 id="project-title">{activeProject.title}</h2>
              </div>
              <img
                src={activeProject.image}
                alt=""
                style={{ objectPosition: activeProject.imagePosition ?? "center" }}
              />
            </div>
            <div className="modal-content">
              <section>
                <p className="modal-label">Contexte & enjeu</p>
                <p className="modal-lead">{activeProject.context}</p>
              </section>
              <section className="modal-process">
                <p className="modal-label">Démarche</p>
                <ol>
                  {activeProject.approach.map((step, index) => (
                    <li key={step}>
                      <span>0{index + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </section>
              <section>
                <p className="modal-label">Ce qui a été produit ou observé</p>
                <div className="result-grid">
                  {activeProject.results.map((result) => (
                    <div key={result.label}>
                      <strong>{result.value}</strong>
                      <span>{result.label}</span>
                    </div>
                  ))}
                </div>
                {activeProject.caution && (
                  <p className="caution">
                    <b>Précision</b>
                    {activeProject.caution}
                  </p>
                )}
              </section>
              <section className="contribution">
                <p className="modal-label">Contribution personnelle</p>
                <p>{activeProject.contribution}</p>
                <div className="tag-row">
                  {activeProject.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </section>
              <section>
                <p className="modal-label">Galerie de preuves</p>
                <div className="evidence-list">
                  {activeProject.evidence.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </section>
              <section className="project-gallery-section">
                <div className="gallery-heading">
                  <p className="modal-label">Le projet en images</p>
                  <span>06 vues</span>
                </div>
                <div className="project-gallery">
                  {getProjectGallery(activeProject).map((image, index) => (
                    <figure key={image}>
                      <img
                        src={image}
                        alt={`Référence visuelle pour ${activeProject.shortTitle}`}
                        loading="lazy"
                      />
                      <figcaption>
                        <span>0{index + 1}</span>
                        Référence visuelle ·{" "}
                        {activeProject.evidence[index % activeProject.evidence.length]}
                      </figcaption>
                    </figure>
                  ))}
                </div>
              </section>
            </div>
            <div className="modal-footer">
              <span>Fin de l’étude</span>
              <button onClick={() => setActiveProject(null)}>
                Retour aux projets <Arrow />
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default App;
