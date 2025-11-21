
import type { PortfolioData } from './types';

// TODO: Edite as informações abaixo para personalizar seu portfólio.
// Este é o único arquivo que você precisa alterar.

export const portfolioData: PortfolioData = {
  personalInfo: {
    name: 'Emanuel Pedrosa',
    role: 'Analista de B.I.',
    // TODO: Coloque sua foto na pasta `public/assets/images` e atualize o caminho abaixo.
    profilePic: 'https://cdn.dribbble.com/userupload/17571883/file/original-b7203c6eef585d55772f19f09159150c.jpg?format=webp&resize=400x300&vertical=center',
    // TODO: Coloque sua imagem de banner na pasta `public/assets/images` e atualize o caminho abaixo.
    bannerPic: 'https://t4.ftcdn.net/jpg/04/17/78/49/360_F_417784975_igbNzEo84A9VrPIafpJ6hoUDoCVJ656e.jpg',
    shortSummary: 'Transformando dados complexos em inteligência de negócio.',
    welcomeMessage: 'Acredito que cada número conta uma história. Meu foco é traduzir essa narrativa em estratégias claras e resultados reais.',
    aboutMe: [
      'Olá! Sou um Analista de Dados apaixonado por transformar dados brutos em insights acionáveis. Com experiência em SQL, Python e ferramentas de visualização como Tableau e Power BI, eu ajudo empresas a tomar decisões mais inteligentes e orientadas por dados.',
      'Meu objetivo é descobrir as histórias que os dados contam e apresentá-las de forma clara e impactante. Estou sempre buscando novos desafios e oportunidades para aprender e crescer na área de dados.'
    ],
  },
  contactInfo: {
    email: 'seuemail@example.com',
    socialLinks: [
      { name: 'LinkedIn', url: 'https://linkedin.com/in/seu-usuario', username: 'linkedin.com/in/seu-usuario' },
      { name: 'Github', url: 'https://github.com/seu-usuario', username: 'github.com/seu-usuario' },
    ]
  },
  projects: [
      {
      featured: true,
      title: 'Visão teste de BI',
      longDescription: 'Este projeto envolveu a coleta de dados de várias plataformas de mídia social usando APIs e técnicas de web scraping. Os dados foram processados com Python para realizar análise de sentimento e, em seguida, visualizados em um painel interativo em Power BI. O painel permite que as equipes de marketing monitorem a percepção da marca em tempo real, identifiquem tendências e respondam rapidamente ao feedback do cliente.',
      // TODO: Coloque as imagens na pasta `public/assets/images` e atualize os nomes dos arquivos.
      image: 'https://xperiun.com/wp-content/uploads/2023/04/DASHBOARD_DE_VENDAS4-1024x575.png',
      images: [
          'https://xperiun.com/wp-content/uploads/2023/04/DASHBOARD_DE_VENDAS4-1024x575.png',
          'assets/images/Dashboard-BI.png',
          'assets/images/Dashboard-BI.png'
      ],
      tags: ['Power BI', 'SQL', 'Python', 'Web Scraping', 'API Rest'],
      projectUrl: '#',
    },
    {
      featured: true,
      title: 'Visão Geral de Vendas - Dashboard de BI',
      longDescription: 'Este projeto envolveu a coleta de dados de várias plataformas de mídia social usando APIs e técnicas de web scraping. Os dados foram processados com Python para realizar análise de sentimento e, em seguida, visualizados em um painel interativo em Power BI. O painel permite que as equipes de marketing monitorem a percepção da marca em tempo real, identifiquem tendências e respondam rapidamente ao feedback do cliente.',
      // TODO: Coloque as imagens na pasta `public/assets/images` e atualize os nomes dos arquivos.
      image: 'https://xperiun.com/wp-content/uploads/2023/04/DASHBOARD_DE_VENDAS4-1024x575.png',
      images: [
          'https://xperiun.com/wp-content/uploads/2023/04/DASHBOARD_DE_VENDAS4-1024x575.png',
          'assets/images/Dashboard-BI.png',
          'assets/images/Dashboard-BI.png'
      ],
      tags: ['Power BI', 'SQL', 'Python', 'Web Scraping', 'API Rest'],
      projectUrl: '#',
    },
    {
      featured: true,
      title: 'Previsão de Vendas com Machine Learning',
      longDescription: 'O desafio era reduzir o excesso de estoque e as faltas de produtos. Utilizando dados históricos de vendas, desenvolvi um modelo de previsão de séries temporais (SARIMA) em Python. O modelo foi treinado e validado, resultando em uma melhoria de 15% na precisão das previsões em comparação com os métodos anteriores. Isso levou a um planejamento de estoque mais eficiente e redução de custos.',
      // TODO: Coloque as imagens na pasta `public/assets/images` e atualize os nomes dos arquivos.
      image: 'assets/images/sales-forecast/main.png',
      images: [
          'assets/images/sales-forecast/image1.png',
          'assets/images/sales-forecast/image2.png',
          'assets/images/sales-forecast/image3.png'
      ],
      tags: ['Python', 'Scikit-learn', 'Pandas', 'Jupyter', 'Matplotlib'],
      projectUrl: '#',
    },
    {
      featured: true,
      title: 'Otimização da Cadeia de Suprimentos',
      longDescription: 'Neste projeto, analisei um grande conjunto de dados de logística para identificar ineficiências na cadeia de suprimentos. Usando SQL para consulta de dados e Tableau para visualização, identifiquei os principais gargalos e propus rotas de entrega otimizadas. A implementação das recomendações resultou em uma economia de 10% nos custos de logística e uma redução no tempo de entrega.',
      // TODO: Coloque as imagens na pasta `public/assets/images` e atualize os nomes dos arquivos.
      image: 'assets/images/supply-chain/main.png',
      images: [
          'assets/images/supply-chain/image1.png',
          'assets/images/supply-chain/image2.png',
          'assets/images/supply-chain/image3.png'
      ],
      tags: ['SQL', 'Tableau', 'Excel', 'Otimização de Processos'],
      projectUrl: '#',
    },
    {
      title: 'Dashboard de Análise de Churn',
      longDescription: 'Para ajudar a empresa a entender por que os clientes estavam cancelando seus serviços, criei um dashboard de análise de churn. O painel consolida dados de várias fontes e usa visualizações para destacar os principais fatores de risco, o perfil dos clientes que cancelam e o impacto financeiro do churn. Isso permitiu que a equipe de retenção desenvolvesse estratégias mais focadas e eficazes.',
      // TODO: Coloque as imagens na pasta `public/assets/images` e atualize os nomes dos arquivos.
      image: 'assets/images/churn-dashboard/main.png',
      images: [
          'assets/images/churn-dashboard/image1.png',
          'assets/images/churn-dashboard/image2.png',
          'assets/images/churn-dashboard/image3.png'
      ],
      tags: ['Tableau', 'SQL', 'Customer Success'],
      projectUrl: '#',
    },
  ],
  education: [
    {
      degree: 'pos grads',
      institution: 'Universidade Exemplo',
      period: '2020 - 2022'
    },
    {
      degree: 'Mestrado em Ciência de Dados',
      institution: 'Universidade Exemplo',
      period: '2020 - 2022'
    },
    {
      degree: 'Bacharelado em Estatística',
      institution: 'Universidade Exemplo',
      period: '2016 - 2020'
    }
  ],
  certifications: [
      {
      title: 'Google teste Analytics Professional Certificate',
      issuer: 'Coursera'
    },  
    {
      title: 'Google teste Analytics Professional Certificate',
      issuer: 'Coursera'
    },
    {
      title: 'Google Data Analytics Professional Certificate',
      issuer: 'Coursera'
    },
    {
      title: 'Microsoft Certified: Power BI Data Analyst Associate',
      issuer: 'Microsoft'
    }
  ],
  courses: [
    {
      title: 'SQL for Data Science',
      issuer: 'Coursera',
      year: '2021'
    },
    {
      title: 'SQL for Data Science',
      issuer: 'Coursera',
      year: '2021'
    },
    {
      title: 'SQL for Data Science',
      issuer: 'Coursera',
      year: '2021'
    },
    {
      title: 'SQL for Data Science',
      issuer: 'Coursera',
      year: '2021'
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI',
      year: '2023'
    },
    {
      title: 'Deep Learnin',
      issuer: 'DeepLearning.AI',
      year: '2023'
    },
    {
      title: 'Deep Learning Specialization',
      issuer: 'DeepLearning.AI',
      year: '2023'
    }
  ],
  skills: [
    {
      category: 'Linguagens e Bancos de Dados',
      technologies: ['Python', 'R', 'SQL', 'NoSQL', 'PySpark']
    },
    {
      category: 'Ferramentas de BI e Visualização',
      technologies: ['Power BI', 'Tableau', 'Looker Studio', 'Seaborn', 'Plotly']
    },
    {
      category: 'Machine Learning & Estatística',
      technologies: ['Scikit-learn', 'Pandas', 'NumPy', 'TensorFlow', 'Keras', 'Análise de Regressão']
    },
    {
      category: 'Cloud & Big Data',
      technologies: ['AWS S3', 'Google Cloud Platform', 'Databricks', 'Hadoop']
    }
  ]
};
