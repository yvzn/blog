---
permalink: /2021/10/19/mettre-en-production-plus-souvent-part-2.html
title: "Je rollback sereinement la production"
date: 2021-10-20T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
tags: mettre-en-production
---

 Après un précédent article argumentant pour des mises en production plus fréquentes, afin qu'elles deviennent une tâche rôdée de la vie de tous les jours, voici une deuxième opportunité pour des installations plus sereines&nbsp;: faciliter le plus possible le retour à la version précédente.

<!--more-->

Malgré toutes les précautions, on constate parfois après la mise à jour un disfonctionnemment en production qu'il n'est pas facile de corriger rapidement. Il n'est pas trivial de se prémunir contre ce genre de risque, mais un peu d'anticipation permet de s'éviter une grande partie de la charge mentale associée&nbsp;: concevoir pour remettre le plus aisément possible l'application dans son état précédent.

# Le retour arrière doit être simple

La solution idéale est de pouvoir revenir en arrière sans avoir à modifier de code ou à relivrer un binaire&nbsp;: juste en changeant une configuration. Par exemple, une nouvelle fonctionnalité peut être activée via une _feature toggle_, un booléen ajouté dans la configuration qui branche ou débranche une partie du programme. Cela permet de désactiver rapidement le composant problématique, de s'éviter de nouveaux bugs et de se donner le temps de corriger à tête reposée.

Autre exemple, on peut conserver les deux versions d'un même service déployées simultanément, l'ancienne et la nouvelle. Cela nécessite de s'assurer que le code permette ces deux exécutions en parallèle. Mais en contrepartie, le retour en arrière se résume à changer la configuration dans les programmes qui appellent ce service.

Encore mieux, si un composant de répartition (load balancer, service discovery, service mesh...) a été installé en frontal du service, il suffit de paramétrer de ce composant pour basculer entre les versions.

# Les bases de données

Le cas des mises à jour de base de données rend le retour en arrière parfois plus complexe&nbsp;; en effet, ces mises à jour peuvent détruire des données, les déplacer ou les transformer. Là pas de miracle, revenir en arrière nécessitera forcément plus de travail.

Pour se simplifier la vie, on peut éviter le plus possible les modifications de bases de données (_sic_) ou au moins limiter le plus possible la portée des actions destructrices (supressions, renommages). Une solution peut être de conserver temporairement les informations concernées, tout en les marquant comme obsolètes et en planifiant leur suppression définitive lors d'une prochaine mise à jour. Ce n'est pas toujours possible et peut à long terme introduire de la dette technique, mais cela a l'autre avantage de faciliter, en général, l'exécution de deux versions du service en parallèle.

Je conseille également d'utiliser des outils de gestion de migrations de base de données (Flyway, Liquibase, Entity Framework...) qui permettent d'identifier rapidement la version courante du modèle de données et de faciliter l'écriture de procédures de retour en arrière.

Une dernière action indispensable selon moi est de faire des sauvegardes planifiées des données et, surtout, de tester régulièrement la procédure de restauration de ces sauvegardes et de s'exercer à la jouer.

# Identifier rapidement les erreurs

Prendre la décision de revenir en arrière nécessite de pouvoir détecter rapidement un éventuel problème dans la nouvelle version. Idéalement, on doit détecter le problème avant les utilisateurs. Pour cela un système de logs centralisé et fiable (Graylog, ElasticSearch + Kibana...) peut grandement faciliter le diagnostic.

Il doit être complémenté par des outils de monitoring (Pingdom, Alerta...) qui permettent d'être averti en temps réel d'une dégradation ou d'une interruption de service. Ces outils peuvent être branchés sur les mécanismes de health check disponibles dans la plupart des frameworks web modernes (Spring Actuator, ASP.NET..). Ils peuvent également être associés aux différentes sondes fournies par les plateformes et orchestrateurs (commande Docker HEALTH, readiness/liveness probes de Kubernetes...)

Enfin, même si ce n'est pas toujours possible, il faut avoir un accès à l'application en production, même avec un compte en lecture seule. En effet, un premier test de surface après la mise à jour permet de détecter rapidement les erreurs les plus communes.

# Par où commencer ?

Quelques actions rapides à mettre en &oelig;uvre&nbsp;:
- vérifier les accès en production (en lecture seule)
- configurer proprement les logs
- mettre en place un monitoring efficace de l'application et des dépendances

# Conclusion

Cela arrive de faire des erreurs, c'est le lot de tout programme informatique. Il vaut mieux anticiper et faciliter un retour en arrière rapide, que passer des heures à débugger le code directement en production. Tout comme la mise en production, le retour en arrière doit être une action indolore et dédramatisée pour l'équipe. Dans un dernier article, j'évoquerai quelques pistes pour qu'elles soient également indolores et transparentes pour les utilisateurs.

{% include "partials/series.njk" %}
