---
permalink: /2021/07/20/tests-unitaires.html
title: "Développer plus rapidement avec des tests unitaires"
date: 2021-07-21T00:00+01:00
layout: post
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
---

<acronym title="En résumé... (Too long; Didn't Read)">TL;DR</acronym> Des tests unitiares bien conçus permettent de gagner du temps et de développer plus vite.

<!--more-->

# La boucle infinie

Parfois il faut lancer, relancer, re-relancer des dizaines de fois le même programme, pour comprendre le comportement de telle portion du code et vérifier que les modifications qu'on vient d'apporter à un composant fonctionnent comme il faut.

Parfois, avant d'arriver au composant en question, il faut réaliser un certain nombre d'étapes intermédiaires, de nombreux clics sur de nombreux menus et plusieurs saisies complexes. Eventuellement, il faut nettoyer l'environnement des valeurs précédement entrées ou redémarrer un autre service dont le programme a besoin. Et bien sûr il faut tout recommencer pour chaque nouvelle combinaison de paramètres ou après chaque modification du code source.

# Gagner du temps

Ecrire un test unitaire permet de manipuler directement le composant en cours de développement, sans avoir à reparcourir manuellement toute l'application pour arriver dans la bonne configuration. Cela permet de vérifier en quelques secondes le comportement avec différents paramètres choisis de manière triviale. Le feedback est immédiat, les détections de bugs plus rapides. Le composant est bien isolé et les effets de bord simples à détecter.

Effectivement, la première fois cela demande de mettre en place une configuration, des librairies, des répertoires. Mais il faut mettre en perspective ce temps initial avec le temps perdu à relancer la même application des dizaines de fois.

# Tester vite fait

Pour réllement gagner du temps et tester rapidement, il faut écrire des tests simples et vraiment unitaires&nbsp;: ils ne doivent vérifier qu'un seul comportement, ne tester qu'une partie du code à la fois.

Une bonne façon de savoir si le test est trop complexe est de compter le nombre d'étapes de paramétrage nécessaires avant d'appeler effectivement le composant à tester. Par exemple, une configuration du test avec de nombreuses lignes de mise en place est souvent un indice de test trop complexe.

De la même manière, le besoin de fonctions utilitaires pour générer des paramètres d'entrée peut être un indice qu'on teste à un trop haut niveau d'abstraction et qu'il faut probablement réduire l'étendue de ce qui est testé.

Ou peut-être que composant en question fait trop de choses. Dans ce cas une bonne idée serait de commencer par découper le code en plusieurs parties plus petites et plus faciles à tester.

# Ne pas tester le framework

Enfin, il arrive aussi qu'on essaie de tester des choses qu'on ne devrait pas. Faut-il tester unitairement le comportement du framework de développement&nbsp;? Faut-il tester une couche de présentation, qui fait uniquement passe plat vers les couches métier&nbsp;?

Tester efficacement implique aussi de faire confiance à la plateforme (qui est probablement déjà testée par ses propres développeurs) et d'éviter les tests qui servent uniquement à se rassurer par rapport au comportement du framework.

# Conclusion

Les tests unitaires sont un outil indispensable, pour de nombreuses autres raisons qui ne sont pas évoquées ici&nbsp;: non-régression, refactoring, meilleure conception, documentation, etc. Mais pour moi, une raison principale est la fluidification de la *boucle de développement*&nbsp;: lancer, tester, corriger &mdash; et le feedback rapide sur les modifications en cours.
