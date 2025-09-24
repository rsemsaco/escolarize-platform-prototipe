---
type: PageLayout
title: Banco Geral
sections:
  - type: PricingSection
    title:
      type: TitleBlock
      text: Banco de Dados
      color: text-dark
      styles:
        self:
          textAlign: center
    subtitle: Amostras Gerais
    plans:
      - type: PricingPlan
        title: Visualização
        price: Explore
        details: Exibição e Funcionalidades
        description: >
          Para usufruir das funcionalidades de pesquisa siga as recomendações a
          seguir.
        features:
          - >-
            Para visualizar mais informações acerca do artigo basta clicar uma
            vez sobre o título.
          - >-
            Para realizar o download dos resultados obtidos, clique no botão
            "CSV" ao lado da barra de pesquisa.
          - >-
            Para interagir com a AI reader clique no símbolo "R+" na janela
            suspensa.
        image:
          type: ImageBlock
          url: /images/abstract-feature1.svg
          altText: Pricing plan 1
        actions: []
        colors: bg-neutral-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-10
              - pl-6
              - pr-6
            borderRadius: large
      - type: PricingPlan
        title: Dados & Insights
        price: Contemple
        details: Números e Indicadores
        description: |
          Constam abaixo alguns números e indicadores referentes ao Banco Geral.
        features:
          - 'Ao todo, este banco possui 42.232 artigos e publicações científicas.'
          - >-
            O ano com maior número de publicações foi o ano de 2015, com 453
            publicações científicas.
          - >-
            A região sudeste contou com o maior número de publicações,
            concentrando 449.
        image:
          type: ImageBlock
          url: /images/abstract-feature2.svg
          altText: Pricing plan 2
        actions: []
        colors: bg-neutral-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-10
              - pl-6
              - pr-6
            borderRadius: large
      - type: PricingPlan
        title: Contribuições
        price: Amplie
        details: Contatos
        description: >
          Esta plataforma foi pensada para promover a troca e o fomento de
          conhecimento.
        features:
          - >-
            Caso tenha interesse, entre em contato com nossos pesquisadores por
            meio do botão abaixo.
          - >-
            Leu um artigo e gostaria de compartilhar suas impressões? Entre para
            nosso fórum de pesquisadores!
        image:
          type: ImageBlock
          url: /images/abstract-feature3.svg
          altText: Pricing plan 3
        actions:
          - type: Button
            label: Contato
            url: /
            icon: arrowRight
            iconPosition: right
            style: secondary
        colors: bg-neutral-fg-dark
        styles:
          self:
            padding:
              - pt-6
              - pb-10
              - pl-6
              - pr-6
            borderRadius: large
    colors: bg-light-fg-dark
    styles:
      self:
        justifyContent: center
      subtitle:
        textAlign: center
slug: /banco_geral
seo:
  type: Seo
  metaTitle: Pricing - Demo site
  metaDescription: This is the pricing page built with Netlify Create.
  socialImage: /images/main-hero.jpg
  metaTags: []
---
