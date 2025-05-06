---
title: "Des appels HTTP résilients en .NET Core"
date: 2018-11-14 00:00:00 +001
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
---

 Adopter une architecture orientée micro-services, a fortiori dans une approche conteneurs ou serverless, c'est accepter que les échanges entre composants ne se passent pas toujours bien – et donc mettre en place les mécanismes adéquats pour éviter une perte d'informations ou fonctionner en mode dégradé.

La librairie open-source [Polly](https://github.com/App-vNext/Polly) permet d'adresser un de ces problèmes de communication&nbsp;: la gestion des erreurs lors d'appels HTTP à des services distants. Que faire en cas d'erreur, faut-il rejouer l'appel&nbsp;? Combien de fois&nbsp;? Que retourner à la méthode appelante&nbsp;?

Complètement intégrée au système d'injection de dépendances .NET Core, Polly peut être mise en place de manière globale et complètement transparente. Elle permet de rendre son code plus résilient aux fautes.

<!--more-->

# Injection de HttpClient

Petit rappel, les appels HTTP sont effectués via le _standard_ `HttpClient`. Ce composant hyper-flexible est le véritable couteau suisse pour interroger des services distants en .NET Core. La contre-partie, c'est son paramétrage et son utilisation parfois complexe, qui peut conduire involontairement à une saturation de la couche réseau / des sockets du serveur distant.

Pour pallier à ce problème, la préconisation de ne plus instancier directement l'objet mais de passer par une factory (`HttpClientFactory`) qui gère pour nous toutes ces problématiques liées à l'allocation et à la libération des ressources.

Dans les faits, pour les cas d'usage standard, grâces aux méthodes d'extension et à l'injection de dépendances, l'utilisation de cette factory est complètement transparente pour les services. Il suffit de déclarer une dépendance à `HttpClient` dans son constructeur.

```csharp
public OrderingService(HttpClient httpClient) {
    ...
```

Et de configurer cette dépendance dans le `Startup.cs`

Ce rappel (finalement pas si petit que ça) sert à introduire

# Polly

En intégrant le monde open-source, le framework .NET Core s'est également ouvert à tout un écosystème de solutions tierces qui est venu démultiplier les fonctionnalités offertes. Certaines de ces solutions sont même tellement indispensables qu'elles sont devenues des citoyens de première classe du framework. La librairie Polly fait partie de ces solutions, elle est recommandée par Microsoft pour les cas d'utilisations déjà cités.

Transparent pour le service

# Quelques policies

Timeout
Retry
Fallback
Circuit-breaker

# Combinaison
