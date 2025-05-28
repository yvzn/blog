---
permalink: /2021/11/30/alternative-watson-visual-recognition.html
title: "Alternative à Watson Visual Recognition"
date: 2021-12-01T00:00+01:00
layout: post.njk
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
---

 Azure computer vision offre une alternative fiable pour la reconnaissance d'objets dans une image, puisque Watson visual recognition est rendu obsolète par IBM.

<!--more-->

# Contexte

Jusqu'à encore récemment, mon application [la recyclette](https://github.com/yvzn/recikligi) utilisait l'API Watson pour la reconnaissance d'objets dans les photos prises par l'utilisateur et déterminer si ces objets étaient recyclables.

Malheureusement le service fourni par IBM a récemment [fermé ses portes](https://github.com/watson-developer-cloud/java-sdk/tree/master#visual-recognition-deprecation), sans fournir à ma connaissance de réelle alternative aux développeurs.

Pour continuer à faire tourner mon application, j'ai donc dû me tourner vers une autre plate-forme. Après quelques recherches, j'ai choisi [Azure computer vision](https://docs.microsoft.com/fr-fr/azure/cognitive-services/computer-vision/overview-image-analysis), qui offre désormais des fonctionnalités et des performances comparables.

# Dépendances

Les deux API fonctionnent relativement de la même manière, ce qui a facilité la migration d'un service à l'autre et a grandement orienté mon choix.

Un SDK Java est fourni par les deux éditeurs. La première étape consiste donc à ajouter la nouvelle dépendance dans le projet.

```xml
<dependency>
    <groupId>com.microsoft.azure.cognitiveservices</groupId>
    <artifactId>azure-cognitiveservices-computervision</artifactId>
</dependency>
```

Pour le choix de la `version` du package, il faut se référer aux [releases du SDK Azure](https://azure.github.io/azure-sdk/releases/latest/index.html#java).

# Configuration

Il faut ensuite aller sur le portail du cloud Azure pour créer une instance du service computer vision. Cette instance peut-être personnalisée pour réaliser de nombreuses tâches, mais dans mon cas j'ai juste utilisé le paramétrage par défaut.

Azure fournit une clé d'API permettant à l'application de se connecter au service. Contrairement à Watson, l'API a également un _endpoint_ personnalisé. Ces deux informations sont à stocker de manière sécurisée dans la configuration de l'application.

Enfin, comme pour Watson, la facturation est faite à l'utilisation, avec un forfait d'appels gratuits pour les 5000 premières transactions.

# Appels à l'API

Les interrogations se font de manière très similaire à Watson, avec quelques subtilités.

Concernant l'authentification au service, il faut fournir à la fois une clé d'API et un _endpoint_ comme indiqué précédemment. La configuration de l'application est donc légèrement adaptée.

L'API d'Azure est capable de retourner de nombreuses catégories d'informations sur chaque image (objets, marques, visages, couleurs...) Pour obtenir un résultat similaire à Watson, j'utilise la catégorie `VisualFeatureTypes.OBJECTS`.

Le contenu de l'image doit être fourni comme un tableau d'octets (grâce à `Files.readAllBytes`). Contrairement à Watson, il n'est pas possible de fournir le chemin vers un fichier sur le disque ou l'URL d'une image distante.

Enfin, les résultats de la détection ne sont pas triés par pertinence par défaut. Il faut donc réaliser ce tri dans le code de l'application. C'est un détail anodin mais qui peut avoir son importance&nbsp;: la première classification renvoyée par le service n'est pas forcément celle avec le meilleur score&nbsp;!

Le code source [mon service de reconnaissance d'images](https://github.com/yvzn/recikligi/blob/master/src/main/java/net/ludeo/recikligi/service/recognition/AzureVisualRecognitionService.java) se trouve sur GitHub.

# Performance

J'avais choisi Watson car le service d'IBM était meilleur que ses concurents, en termes de classes d'objets détectés et de pertinence de ces détections. Cela a toujours été le cas avec les services cognitifs Watson et il est bien dommage que cette offre s'arrête de manière si inopinée.

Heureusement, force est de constater que les autres fournisseurs ont largement rattrapé leur retard et sont maintenant à un niveau de service similaire.

Grâce à cette migration, j'ai pu maintenir le service fourni par mon application, avec un minimum de modifications.
