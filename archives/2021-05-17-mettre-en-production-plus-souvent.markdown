---
permalink: /2021/04/27/mettre-en-production-plus-souvent.html
title: "Je mets en production plus souvent"
date: 2021-04-28T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
series: mettre-en-production
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym> Pour déployer en production de façon plus sereine, la meilleure technique reste de répéter régulièrement l'exercice, encore et encore, jusqu'à ce qu'il devienne naturel, pour chaque membre de l'équipe.

<!--more-->

La mise en production apparaît parfois comme une tâche fastidieuse et risquée. Pourtant, le simple fait de le faire de manière répétée suffit généralement à démystifier le processus. La première fois, cela demande un peu de courage et ce n'est peut-être pas agréable. Mais on prend vite les bons réflexes et on apprend à adapter son comportement en cas d'imprévu.

# Mettre en production plus souvent

Comme le dit le vieux singe, <q>plus une tâche est complexe, plus il faut la faire souvent</q><sup>[réf. nécessaire]</sup>. Dans la vraie vie, le fait de pratiquer régulièrement génère de l'habitude, des automatismes. Chaque répétition est plus facile que la précédente, plus rapide, plus mécanique.

Il se passe la même chose devant le clavier.

Pour apprendre, le plus simple est souvent d'accompagner quelqu'un de rôdé, de profiter de son expérience et de découvrir ses petites astuces. Une autre option est de réaliser la mise en production en mode *pair programming* (voire en *mob programming*), à plusieurs cerveaux on percute plus vite.

Mettre en production peut devenir un non événement, une tâche que tout membre de l'équipe est capable de s'approprier.

# Diminuer mécaniquement le risque

Plus on met en production souvent, plus on diminue le nombre de fonctionnalités dans chaque version. C'est mathématique&nbsp;: si on met en production toutes les semaines, on inclut forcément moins de mises à jour que si on met en production une fois par an.

D'une part, ça a l'avantage avantage de diminuer le risque d'erreurs dans le déploiement, ainsi que le risque d'introduire un bug. Evidemment, car il y a moins de code mis à jour, il y a moins de modifications à apporter sur l'existant.

D'autre part, cela permet de réduire le nombre d'actions nécessaires, le nombre de composants à impacter, le nombre de serveurs à mettre à jour. Et donc de simplifier la procédure et de réduire sa durée.

Mettre en production un microservice avec 25 lignes de code est une action suffisamment facile et rapide pour pouvoir être faite tous les jours.

# Améliorer le process

Enfin, répéter régulièrement les mêmes actions permet d'identifier plus facilement les points de friction et les opportunités d'amélioration. Dans l'idéal, cela permet de voir quelles actions peuvent être automatisées&nbsp;: les plus répétitives, celles où le risque d'erreur est grand (taper une IP ou un mot de passe...) ou celles avec le moins de valeur ajoutée (copier-coller un binaire)

# Par où commencer ?

Quelques actions rapides à mettre en &oelig;uvre&nbsp;:
- vérifier que chacun dispose des accès et des outils nécessaires
- modifier des parties simples (écrans d'aide, libellés, fautes d'orthographe...) et les installer rapidement
- mettre à jour une fois par sprint

# Conclusion

Plus facile à dire qu'à faire, n'est-ce pas&nbsp;? En fait non, c'est plutôt le contraire. C'est généralement plus dur de convaincre de la tournure anodine que peut prendre une mise en production bien rôdée. Dans un prochain article, je décrirai donc quelques astuces, celles qui me permettent d'aborder sereinement cette tâche.

{% include "partials/series.njk" %}
