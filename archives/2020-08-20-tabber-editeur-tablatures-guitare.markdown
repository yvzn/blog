---
permalink: /2020/08/19/tabber-editeur-tablatures-guitare.html
title: "Mon éditeur de tablatures a 20 ans"
date: 2020-08-20T00:00+01:00
author: Yvan Razafindramanana
license: CC-BY-SA-4.0
tags: article
---


Tabber, mon éditeur de tablature de guitares (pour Windows) a 20 ans. Il fonctionne encore, sous Windows 10 - et il compile encore, enfin presque (avec un vieil IDE). Pour fêter cet honorable anniversaire, je l'ai à nouveau [mis en ligne](http://yvzn.github.io/tabber) et publié sur [GitHub](https://github.com/yvzn/tabber).

<!--more-->

# Une macro Excel

Au départ, je souhaitais développer rapidement un logiciel pour écrire des tablatures dans un format texte et non propriétaire. Tabber donc a commencé sous la forme d'une macro Excel en Visual Basic. Je l'ai ensuite transformé en application Delphi, un environnement de développement rapide pour Turbo Pascal, pour créer des formulaires avec des boutons dans tous les coins.

Je ne me posais pas les mêmes questions que maintenant sur la pertinence de tel ou tel choix technique&nbsp;; _ça faisait le job_ ét c'était facile à développer. Puis j'ai voulu en faire une _vraie_ application Windows, un éditeur de texte amélioré, une version spécialisée du _bloc-notes_. Cela m'a donné l'occasion d'apprendre à développer avec l'API _Win32_.

# Puis une application C++

La prise en main de l'API _Win32_ ne fut pas évidente&nbsp;: peu de consistence entre les différentes signatures, des types customisés partout, la notation hongroise... Au moins la documentation était à peu près claire et disponible hors ligne, sous la forme d'un fichier _winhelp_. A l'époque, il n'y avait pas _StackOverflow_ et l'accès à une documentation avec des exemples était indispensable.

J'avais moi-même écrit un manuel d'utilisation complet. Il faisait partie du [site internet](http://yvzn.github.io/tabber) lui aussi développé spécifiquement pour présenter le projet, avec le bon vieux duo HTML et CSS.

Les libertés permises par le langage m'amusent toujours aujourd'hui, même si je ne ferai probablement plus ce genre de choses désormais. Quelques exemples choisis&nbsp;:
- stocker l'adresse d'un pointeur dans une propriété d'un handle de fenêtre, pour pouvoir retrouver plus tard l'instance d'objet métier associée à cette fenêtre
- déclarer des fonctions _en ligne_ à la volée, en utilisant des macros du préprocesseur C++
- surcharger l'opérateur d'allocation de mémoire `new`, pour faire du comptage de référence et s'assurer que toute la mémoire était bien libérée à la sortie du programme.

# Lisibilité du code

Malgré cela, lorsque je parcours le code vingt ans plus tard, je suis soulagé de voir à quel point il reste lisible, même pour du C++. J'arrive encore à comprendre à peu près son organisation globale et pourquoi certaines décisions ont été prises. C'est vrai que les fonctionnalités sont plutôt basiques et simples à appréhender.

A l'inverse, je ne suis pas sûr de pouvoir me replonger aussi facilement dans le code de tel microservice que j'ai écrit il y a six mois. Programmer est devenu un tâche plus complexe, aussi parce que les logiciels font des choses plus complexes&nbsp;: de l'asynchrone, des calculs distribués, de la résilience.

Je suis d'autant plus convaincu de l'importance de privilégier désormais la maintenabilité à la performance - ou à l'efficacité du code. Si je dois retenir une chose de ces vingt ans à programmer des ordinateurs, c'est l'intérêt de fournir le code le plus explicite possible et le plus immédiatement compréhensible - pour la personne qui devra relire, recompiler ou débuger son programme plusieurs années après.
