---
permalink: /2020/02/27/machine-learning-on-code-part-1.html
title: "Machine Learning sur du code source (partie 1)"
date: 2020-02-28T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
series: machine-learning-on-code
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym> Lancer des algorithmes de machine learning sur son code source permet d'extraire des informations sur la structure des projets et d'améliorer l'outillage de développement. Ce sont les méthodes inspirées du traitement automatique du langage naturel qui semblent donner les premiers résultats. Des briques open-source comme [Gitbase](https://github.com/src-d/gitbase) ou [Babelfish](https://doc.bblf.sh/) permettent de faciliter les étapes de collection et d'analyse de la donnée. Dans ce premier article, je décris l'approche utilisée et les étapes à réaliser.

<!--more-->

Cet article est le compte-rendu d'un codelab très instructif, organisé par Alex Bezzubov et Hugo Mougard de [_source{d}_](https://sourced.tech/) lors du DevFest Nantes 2019. En guise d'introduction, vous pouvez consulter le [code source du codelab](https://github.com/mloncode/devfest2019-workshop) ainsi que les [slides de la présentation](https://docs.google.com/presentation/d/1vF0JMagmXXzn-h-OaJu6CsDt78oSQSg58YFJsBUaHxk/edit). D'autres collaborateurs de _source{d}_ ont également proposé une [conférence en anglais](https://www.youtube.com/watch?v=6NhQIaJfWXk) dont voici [les slides associés](https://egorbu.github.io/usedata_2019/). J'ai enfin réalisé une présentation pour débriefer le codelab avec mes collègues. Et si la qualité de capture vidéo n'est pas au rendez-vous, mais vous pouvez néanmoins la [visualiser sur Youtube](https://www.youtube.com/watch?v=0R7GIT4GPNk).

# Objectifs

Le _MLonCode_ (Machine Learning on source code) est un domaine assez récent mais pour lequel l'intérêt est croissant. Depuis 2-3 ans, les publications des grands acteurs de l'infomatique se multiplient (Microsoft, Google, Facebook) et on trouve de plus en plus conférences sur le sujet.

Le principe de lancer des algorithmes de machine learning sur du code source a plusieurs applications intéressantes. Par exemple, comprendre l'organisation de ses programmes, extraire des métriques évoluées et identifier des patterns ou des anti-patterns (code commun, répétitions, ...) .

Autre application, améliorer l'outillage, les environnements de développement, les compilateurs ou les logiciels de déploiement. Cette approche est par exemple actuellement mise en oeuvre par Microsoft avec _IntelliCode_, dont la promesse est de fournir une meilleure auto-complétion, contextualisée en fonction du projet et des habitudes des développeurs ou de faire des propositions de refactoring plus pertinentes.

# Approches

Plusieurs approches sont possibles pour attaquer le problème. Celle proposée par le codelab part du postulat que la formulation du code source _imite_ le langage naturel (ou <acronym title="Langage Naturel">LN</acronym>).

C'est un _a priori_ assez fort mais qui a du sens vu la manière dont le code est écrit. En effet, les identifiants de variables et de méthodes sont généralement choisis de manière à décrire le comportement attendu de façon compréhensible par un être humain. De même, les mots clés logiques (`if...then`, `for`, etc.) permettent de structurer le code afin qu'il soit lisible comme une suite de phrases à peu près _naturelles_.

Donc en considérant le code source comme une séquence de mots avec une signification logique, cette approche a l'avantage de pouvoir réappliquer les patterns statistiques et modèles de machine learning déja connus en traitement du langage (<acronym title="Traitement Automatique du Langage Naturel">TALN</acronym> ou en anglais <acronym title="Natural Language Processing">NLP</acronym>).

Elle a aussi ses limites, dans la mesure où elle ne tient compte que des mots en eux-mêmes, sans tirer profit de toute la structure sous-jacente, (méthodes, branchements, regroupements logiques, ...), qui est malgré tout une part importante de l'information portée par le code.

# Etapes

Les animateurs de l'atelier proposent un sommaire calqué sur les étapes habituellement mises en oeuvre dans les projets de _data science_:

1. Définir le problème
2. Collecter la donnée
3. Analyser la donnée
4. Evaluer les résultats
5. Communiquer

Cette organisation permet d'aborder, dans l'ordre, chacune des tâches liés à la conception et à la validation d'un modèle de machine learning.

Comme exemple de problèmes à résoudre, les travaux pratiques se font autour de deux sujets, plutôt accessibles en théorie:
- Détecter dans une codebase les projets similaires (afin, par exemple, de les regrouper par thème: sécurité, gestion de données, interfaces, ...)
- Suggérer algorithmiquement le nom d'une méthode à partir de son corps (son contenu)

Dans un second article, je décrirai les étapes de collecte et de première analyse de la donnée.

{% include "partials/series.njk" %}
